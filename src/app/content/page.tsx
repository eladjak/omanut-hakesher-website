/**
 * /content — Content Review PWA index page.
 *
 * Lists pending pipeline draft packs as cards. Tap a card → detail page.
 * Filter by platform (LinkedIn/Facebook/Instagram/Sanity/Rav-Messer).
 * Mobile-first, RTL Hebrew, dark.
 */
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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

const PLATFORM_LABELS: Record<string, string> = {
  linkedin: "לינקדאין",
  facebook: "פייסבוק",
  instagram: "אינסטגרם",
  sanity: "בלוג",
  "rav-messer": "ניוזלטר",
};

const PLATFORM_FILTERS = ["all", "linkedin", "facebook", "instagram", "sanity", "rav-messer"];

const STATUS_COLORS: Record<string, string> = {
  packed: "bg-amber-700/40 text-amber-200 border-amber-700/60",
  approved: "bg-emerald-700/40 text-emerald-200 border-emerald-700/60",
  edited: "bg-blue-700/40 text-blue-200 border-blue-700/60",
  discarded: "bg-zinc-700/40 text-zinc-400 border-zinc-700/60 line-through",
  planned: "bg-zinc-700/40 text-zinc-300 border-zinc-700/60",
};

function getKey(): string {
  if (typeof window === "undefined") return "";
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("key");
    if (fromUrl) {
      window.localStorage.setItem("content-review-key", fromUrl);
      return fromUrl;
    }
    return window.localStorage.getItem("content-review-key") || "";
  } catch {
    return "";
  }
}

export default function ContentIndex() {
  const [drafts, setDrafts] = useState<DraftCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [authKey, setAuthKey] = useState("");

  useEffect(() => {
    const k = getKey();
    setAuthKey(k);
    if (!k) {
      setErr("חסר מפתח אימות — הוסף ?key=… לכתובת.");
      setLoading(false);
      return;
    }
    fetch(`/api/content?key=${encodeURIComponent(k)}`)
      .then((r) => r.json())
      .then((d) => {
        if (!d.ok) {
          setErr(d.error || "שגיאה לא ידועה");
        } else {
          setDrafts(d.drafts || []);
        }
        setLoading(false);
      })
      .catch((e) => {
        setErr(String(e));
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return drafts;
    return drafts.filter((d) => d.outputs.includes(filter));
  }, [drafts, filter]);

  return (
    <div className="px-4 pb-24 pt-6 max-w-3xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-balance">סקירת תכנים</h1>
        <p className="text-sm text-zinc-400 mt-1 text-pretty">
          {loading ? "טוען…" : `${filtered.length} טיוטות ממתינות${filter === "all" ? "" : ` בפילטר ${PLATFORM_LABELS[filter] || filter}`}`}
        </p>
      </header>

      {/* Platform filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-1 px-1 scrollbar-none">
        {PLATFORM_FILTERS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setFilter(p)}
            aria-pressed={filter === p}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              filter === p
                ? "bg-rose-700 text-white border-rose-700"
                : "bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800"
            }`}
          >
            {p === "all" ? "הכל" : PLATFORM_LABELS[p] || p}
          </button>
        ))}
      </div>

      {err && (
        <div className="bg-red-950 border border-red-900 rounded-lg p-3 mb-4 text-red-200 text-sm">
          {err}
        </div>
      )}

      {loading ? (
        <div className="space-y-3" aria-busy="true">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 h-28 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/content/${d.slug}${authKey ? `?key=${encodeURIComponent(authKey)}` : ""}`}
                className="block rounded-lg border border-zinc-800 bg-zinc-900/60 p-4 hover:bg-zinc-900 transition-colors active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-semibold text-base text-balance leading-snug flex-1">
                    {d.title}
                  </h2>
                  <span
                    className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full border ${
                      STATUS_COLORS[d.status] ||
                      "bg-zinc-800 text-zinc-300 border-zinc-700"
                    }`}
                  >
                    {d.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-1 tabular-nums">
                  {d.created ? d.created.slice(0, 10) : "—"} · {d.outputs.length} פלטפורמות
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {d.outputs.map((o) => {
                    const s = d.platforms_summary[o];
                    const ok = s && s.failures_count === 0;
                    return (
                      <span
                        key={o}
                        className={`text-[10px] px-2 py-0.5 rounded-full border ${
                          ok
                            ? "bg-emerald-950 text-emerald-300 border-emerald-900"
                            : "bg-amber-950 text-amber-300 border-amber-900"
                        }`}
                      >
                        {PLATFORM_LABELS[o] || o} · {s?.words ?? "?"} מילים
                      </span>
                    );
                  })}
                </div>
              </Link>
            </li>
          ))}
          {filtered.length === 0 && !err && (
            <li className="text-center text-zinc-500 py-12 text-sm">
              אין טיוטות תואמות לפילטר.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
