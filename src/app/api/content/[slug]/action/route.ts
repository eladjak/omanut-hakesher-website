/**
 * POST /api/content/[slug]/action
 *
 * Body: { action: "approve" | "discard" | "edit", platform?: string, body?: string }
 *
 * APPROVE: marks manifest.status="approved" and writes approved_at timestamp.
 *          The actual distribution (Postiz/Rav-Messer/Sanity push) still needs
 *          to be triggered separately — this endpoint only flips the gate.
 *
 * DISCARD: marks manifest.status="discarded".
 *
 * EDIT:    accepts replacement body for a single platform file (linkedin.txt,
 *          facebook.txt, instagram.txt, sanity.md). Writes the new body to disk
 *          and re-runs voice-QA inline. (Inline QA mirrors content-pipeline.mjs
 *          counter — we re-implement the minimal voice-QA here so the PWA
 *          doesn't have to shell out.)
 *
 * NOTE: this only works in DEV mode where the filesystem is writable.
 *       In production the response will say "not supported — please run pipeline
 *       locally". Live editing on the deployed PWA requires a VPS API; that's a
 *       follow-up.
 */
import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EXPECTED_KEY =
  process.env.CONTENT_REVIEW_KEY ||
  (process.env.NODE_ENV !== "production" ? "dev" : null);

function isAuthorized(req: Request): boolean {
  if (!EXPECTED_KEY) return false;
  const url = new URL(req.url);
  const k = url.searchParams.get("key");
  if (k && k === EXPECTED_KEY) return true;
  const h = req.headers.get("authorization");
  if (h && h.startsWith("Bearer ") && h.slice(7) === EXPECTED_KEY) return true;
  return false;
}

// Hebrew-aware word counter — mirrors content-pipeline.mjs.
function countWords(s: string): number {
  if (!s) return 0;
  const text = s.trim();
  if (!text) return 0;
  const tokens = text
    .split(/[\s.,;:!?()\[\]{}"'׳״‐-―…«»“”‘’\/\\|<>\-]+/u)
    .filter((t) => t.length > 0);
  const prefixRe = /^[בלכמשוה][א-ת]{2,}$/;
  let extra = 0;
  for (const t of tokens) {
    if (prefixRe.test(t)) extra += 1;
  }
  return tokens.length + extra;
}

const REGISTER_THRESHOLDS: Record<
  string,
  { min: number; max: number; hashtags: { min: number; max: number } }
> = {
  linkedin: { min: 300, max: 600, hashtags: { min: 3, max: 5 } },
  facebook: { min: 200, max: 400, hashtags: { min: 2, max: 4 } },
  instagram: { min: 100, max: 220, hashtags: { min: 8, max: 15 } },
  "rav-messer": { min: 500, max: 1200, hashtags: { min: 0, max: 0 } },
  sanity: { min: 800, max: 1500, hashtags: { min: 0, max: 0 } },
};

function findPackDir(slug: string): Promise<string | null> {
  const draftsDir = path.join(os.homedir(), "Documents", "drafts");
  return fs.readdir(draftsDir).then(
    (entries) => {
      const match = entries.find(
        (e) => e.startsWith("pipeline-") && e.endsWith(`-${slug}`),
      );
      return match ? path.join(draftsDir, match) : null;
    },
    () => null,
  );
}

const FILE_FOR_PLATFORM: Record<string, string> = {
  linkedin: "linkedin.txt",
  facebook: "facebook.txt",
  instagram: "instagram.txt",
  sanity: "sanity.md",
};

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Action endpoints require local-filesystem write access. On the deployed PWA " +
          "this is intentionally disabled (read-only review). To approve/edit/discard, " +
          "open the PWA on Elad's workstation at http://localhost:3333/content.",
      },
      { status: 501 },
    );
  }
  const { slug } = await params;
  let body: {
    action?: string;
    platform?: string;
    body?: string;
  } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Body must be JSON" },
      { status: 400 },
    );
  }
  const action = body.action;
  if (!action || !["approve", "discard", "edit"].includes(action)) {
    return NextResponse.json(
      { ok: false, error: "action must be one of: approve, discard, edit" },
      { status: 400 },
    );
  }
  const packDir = await findPackDir(slug);
  if (!packDir) {
    return NextResponse.json(
      { ok: false, error: `Pack not found: ${slug}` },
      { status: 404 },
    );
  }
  const manifestPath = path.join(packDir, "manifest.json");
  let manifest: Record<string, unknown>;
  try {
    manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: `Cannot read manifest: ${(e as Error).message}` },
      { status: 500 },
    );
  }
  const now = new Date().toISOString();

  if (action === "approve") {
    manifest.status = "approved";
    manifest.approved_at = now;
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
    return NextResponse.json({ ok: true, action, slug, status: "approved" });
  }
  if (action === "discard") {
    manifest.status = "discarded";
    manifest.discarded_at = now;
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
    return NextResponse.json({ ok: true, action, slug, status: "discarded" });
  }
  if (action === "edit") {
    const platform = body.platform || "";
    const newBody = body.body || "";
    if (!FILE_FOR_PLATFORM[platform]) {
      return NextResponse.json(
        {
          ok: false,
          error: `edit requires platform in: ${Object.keys(FILE_FOR_PLATFORM).join(", ")}`,
        },
        { status: 400 },
      );
    }
    if (!newBody) {
      return NextResponse.json(
        { ok: false, error: "edit requires body" },
        { status: 400 },
      );
    }
    const filePath = path.join(packDir, FILE_FOR_PLATFORM[platform]);
    await fs.writeFile(filePath, newBody, "utf8");
    // Re-run minimal voice-QA inline
    const words = countWords(newBody);
    const thresh = REGISTER_THRESHOLDS[platform];
    const hashtags = (newBody.match(/#[\p{L}\p{N}_]+/gu) || []).length;
    const inBand = thresh && words >= thresh.min && words <= thresh.max;
    const hashtagsOk =
      thresh && hashtags >= thresh.hashtags.min && hashtags <= thresh.hashtags.max;
    const exCount = (newBody.match(/!/g) || []).length;
    // Update manifest outputs inline
    const outputs = (manifest.outputs as Record<string, unknown>) || {};
    outputs[platform] = {
      ...(outputs[platform] as Record<string, unknown> | undefined),
      file: FILE_FOR_PLATFORM[platform],
      words,
      hashtags,
      edited_at: now,
      voice_qa_inline: {
        word_band: { min: thresh?.min, max: thresh?.max, in_band: inBand },
        hashtag_band: {
          min: thresh?.hashtags.min,
          max: thresh?.hashtags.max,
          in_band: hashtagsOk,
        },
        exclamation_count: exCount,
        note: "Inline QA — full elad-voice REGISTER GATE still required before publication.",
      },
    };
    manifest.outputs = outputs;
    manifest.status = "edited";
    manifest.last_edit_at = now;
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
    return NextResponse.json({
      ok: true,
      action,
      slug,
      platform,
      words,
      hashtags,
      in_band: inBand,
      hashtags_ok: hashtagsOk,
    });
  }

  return NextResponse.json(
    { ok: false, error: "Unreachable" },
    { status: 500 },
  );
}
