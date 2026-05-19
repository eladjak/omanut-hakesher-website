/**
 * GET /api/content
 *
 * Lists pending content-pipeline drafts.
 *
 * Modes:
 *  1. DEV (NODE_ENV=development): reads from ~/Documents/drafts/pipeline-*
 *     directly. Lets Elad iterate on the PWA against live drafts on his
 *     workstation.
 *  2. PROD (NODE_ENV=production / Vercel): reads from a snapshot at
 *     /public/content-drafts.json that is committed alongside the build.
 *     The snapshot is updated by a separate sync script (TODO follow-up:
 *     wire `~/.claude/scripts/sync-content-snapshot.mjs` → push to repo).
 *
 * Auth: bearer-style ?key=<CONTENT_REVIEW_KEY> OR `Authorization: Bearer …`
 *     The key is independent of the main hub HMAC. Set CONTENT_REVIEW_KEY
 *     in Vercel env. Defaults to "dev" in local development.
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

type DraftCard = {
  slug: string;
  title: string;
  status: string;
  created: string;
  packed_at?: string;
  outputs: string[];
  platforms_summary: Record<
    string,
    { words: number; confidence: number; failures_count: number }
  >;
};

async function readLocalManifests(): Promise<DraftCard[]> {
  const draftsDir = path.join(os.homedir(), "Documents", "drafts");
  let entries: string[];
  try {
    entries = await fs.readdir(draftsDir);
  } catch {
    return [];
  }
  const out: DraftCard[] = [];
  for (const e of entries) {
    if (!e.startsWith("pipeline-")) continue;
    const mp = path.join(draftsDir, e, "manifest.json");
    try {
      const raw = await fs.readFile(mp, "utf8");
      const m = JSON.parse(raw);
      const outputs = Object.keys(m.outputs || {});
      const platforms_summary: DraftCard["platforms_summary"] = {};
      for (const [k, v] of Object.entries(m.outputs || {}) as [
        string,
        { words?: number; voice_qa?: { confidence?: number; failures?: string[] } },
      ][]) {
        platforms_summary[k] = {
          words: v.words ?? 0,
          confidence: v.voice_qa?.confidence ?? 0,
          failures_count: v.voice_qa?.failures?.length ?? 0,
        };
      }
      out.push({
        slug: m.slug || e,
        title: m.title || "ללא כותרת",
        status: m.status || "unknown",
        created: m.created || "",
        packed_at: m.packed_at,
        outputs,
        platforms_summary,
      });
    } catch {
      // Skip unreadable manifests
    }
  }
  // Newest first
  out.sort((a, b) => (b.created || "").localeCompare(a.created || ""));
  return out;
}

async function readSnapshot(): Promise<DraftCard[]> {
  try {
    const p = path.join(process.cwd(), "public", "content-drafts.json");
    const raw = await fs.readFile(p, "utf8");
    const snap = JSON.parse(raw);
    return snap.drafts || [];
  } catch {
    return [];
  }
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized — pass ?key=<CONTENT_REVIEW_KEY>" },
      { status: 401 },
    );
  }
  let drafts: DraftCard[] = [];
  let source = "snapshot";
  if (process.env.NODE_ENV !== "production") {
    drafts = await readLocalManifests();
    source = "local-filesystem";
  }
  if (drafts.length === 0) {
    drafts = await readSnapshot();
    source = "snapshot";
  }
  return NextResponse.json({
    ok: true,
    source,
    count: drafts.length,
    drafts,
    generated_at: new Date().toISOString(),
  });
}
