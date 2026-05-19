/**
 * GET /api/content/[slug]
 *
 * Returns a single pipeline pack:
 *   - manifest.json (parsed)
 *   - per-platform file contents (linkedin.txt, facebook.txt, instagram.txt,
 *     sanity.md, rav-messer.html, rav-messer.meta.json, brief.md)
 *
 * Modes mirror /api/content (live FS in dev, snapshot in prod).
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

async function readLocalPack(slug: string) {
  const draftsDir = path.join(os.homedir(), "Documents", "drafts");
  let entries: string[];
  try {
    entries = await fs.readdir(draftsDir);
  } catch {
    return null;
  }
  // Match by slug — directory name format is pipeline-YYYY-MM-DD-slug
  const match = entries.find(
    (e) => e.startsWith("pipeline-") && e.endsWith(`-${slug}`),
  );
  if (!match) return null;
  const packDir = path.join(draftsDir, match);
  const out: Record<string, unknown> = { slug, pack_dir: packDir };
  const files = [
    "manifest.json",
    "spine.json",
    "brief.md",
    "linkedin.txt",
    "facebook.txt",
    "instagram.txt",
    "sanity.md",
    "sanity.json",
    "rav-messer.html",
    "rav-messer.meta.json",
  ];
  for (const f of files) {
    try {
      const raw = await fs.readFile(path.join(packDir, f), "utf8");
      if (f.endsWith(".json")) {
        try {
          out[f] = JSON.parse(raw);
        } catch {
          out[f] = raw;
        }
      } else {
        out[f] = raw;
      }
    } catch {
      // missing file is fine
    }
  }
  return out;
}

async function readSnapshotPack(slug: string) {
  try {
    const p = path.join(process.cwd(), "public", "content-drafts.json");
    const raw = await fs.readFile(p, "utf8");
    const snap = JSON.parse(raw);
    return (snap.packs || {})[slug] || null;
  } catch {
    return null;
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }
  const { slug } = await params;
  let pack = null;
  let source = "snapshot";
  if (process.env.NODE_ENV !== "production") {
    pack = await readLocalPack(slug);
    source = "local-filesystem";
  }
  if (!pack) {
    pack = await readSnapshotPack(slug);
    source = "snapshot";
  }
  if (!pack) {
    return NextResponse.json(
      { ok: false, error: `Pack not found: ${slug}` },
      { status: 404 },
    );
  }
  return NextResponse.json({ ok: true, source, pack });
}
