/**
 * /content/[slug] — Draft pack detail.
 *
 * Tabbed view: each platform on its own tab. Inline editing is available
 * for linkedin/facebook/instagram/sanity. Bottom action bar: APPROVE / EDIT /
 * DISCARD. Voice-QA results render inline per tab.
 *
 * Mobile-first, RTL, dark.
 */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type ManifestOutput = {
  file?: string;
  words?: number;
  hashtags?: number;
  voice_qa?: {
    confidence?: number;
    passes?: string[];
    failures?: string[];
  };
  voice_qa_inline?: {
    word_band?: { min?: number; max?: number; in_band?: boolean };
    hashtag_band?: { min?: number; max?: number; in_band?: boolean };
    exclamation_count?: number;
  };
};

type Pack = {
  slug: string;
  pack_dir?: string;
  "manifest.json"?: {
    status?: string;
    title?: string;
    created?: string;
    packed_at?: string;
    outputs?: Record<string, ManifestOutput>;
  };
  "brief.md"?: string;
  "linkedin.txt"?: string;
  "facebook.txt"?: string;
  "instagram.txt"?: string;
  "sanity.md"?: string;
  "rav-messer.html"?: string;
  "rav-messer.meta.json"?: { subject?: string; preheader?: string; cta?: string };
};

const PLATFORMS: { key: string; label: string; file: string; editable: boolean }[] = [
  { key: "linkedin", label: "לינקדאין", file: "linkedin.txt", editable: true },
  { key: "facebook", label: "פייסבוק", file: "facebook.txt", editable: true },
  { key: "instagram", label: "אינסטגרם", file: "instagram.txt", editable: true },
  { key: "sanity", label: "בלוג", file: "sanity.md", editable: true },
  { key: "rav-messer", label: "ניוזלטר", file: "rav-messer.html", editable: false },
];

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

export default function ContentDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug || "";
  const [pack, setPack] = useState<Pack | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [tab, setTab] = useState("linkedin");
  const [editing, setEditing] = useState(false);
  const [editBuffer, setEditBuffer] = useState("");
  const [authKey, setAuthKey] = useState("");
  const [actionInFlight, setActionInFlight] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  useEffect(() => {
    const k = getKey();
    setAuthKey(k);
    if (!k || !slug) {
      setErr(k ? "חסר slug" : "חסר מפתח אימות.");
      setLoading(false);
      return;
    }
    fetch(`/api/content/${slug}?key=${encodeURIComponent(k)}`)
      .then((r) => r.json())
      .then((d) => {
        if (!d.ok) {
          setErr(d.error || "שגיאה");
        } else {
          setPack(d.pack);
        }
        setLoading(false);
      })
      .catch((e) => {
        setErr(String(e));
        setLoading(false);
      });
  }, [slug]);

  const manifest = pack?.["manifest.json"];
  const outputs = manifest?.outputs || {};

  const currentBody = useMemo(() => {
    const p = PLATFORMS.find((x) => x.key === tab);
    if (!p || !pack) return "";
    return (pack[p.file as keyof Pack] as string) || "";
  }, [tab, pack]);

  const currentPlatformInfo = PLATFORMS.find((x) => x.key === tab);
  const currentQA = outputs[tab] || {};

  // When tab changes, reset edit buffer to disk body
  useEffect(() => {
    setEditing(false);
    setEditBuffer(currentBody);
  }, [tab, currentBody]);

  const performAction = useCallback(
    async (action: "approve" | "discard" | "edit") => {
      if (!slug || !authKey) return;
      setActionInFlight(action);
      setActionMsg(null);
      try {
        const body: Record<string, string> = { action };
        if (action === "edit") {
          body.platform = tab;
          body.body = editBuffer;
        }
        const r = await fetch(`/api/content/${slug}/action?key=${encodeURIComponent(authKey)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await r.json();
        if (!data.ok) {
          setActionMsg(`שגיאה: ${data.error || "?"}`);
        } else if (action === "approve") {
          setActionMsg("הטיוטה אושרה. ניתן להריץ הפצה מהמסוף.");
        } else if (action === "discard") {
          setActionMsg("הטיוטה סומנה כנזרקת.");
        } else if (action === "edit") {
          setActionMsg(
            `נשמר. ${data.words} מילים${data.in_band ? " · בתחום הנדרש ✓" : " · מחוץ לתחום הנדרש ⚠"}`,
          );
          setEditing(false);
          // Refresh pack
          fetch(`/api/content/${slug}?key=${encodeURIComponent(authKey)}`)
            .then((r) => r.json())
            .then((d) => d.ok && setPack(d.pack));
        }
      } catch (e) {
        setActionMsg(`שגיאת רשת: ${String(e)}`);
      } finally {
        setActionInFlight(null);
      }
    },
    [slug, authKey, tab, editBuffer],
  );

  if (loading) {
    return (
      <div className="px-4 py-8 max-w-3xl mx-auto" aria-busy="true">
        <div className="h-6 bg-zinc-800 rounded w-2/3 animate-pulse mb-3" />
        <div className="h-4 bg-zinc-800 rounded w-1/3 animate-pulse mb-6" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 bg-zinc-900 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="px-4 py-8 max-w-3xl mx-auto">
        <Link
          href={`/content${authKey ? `?key=${encodeURIComponent(authKey)}` : ""}`}
          className="text-sm text-rose-400 hover:underline"
        >
          ← חזרה לרשימה
        </Link>
        <div className="bg-red-950 border border-red-900 rounded-lg p-4 mt-6 text-red-200">
          {err}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-32 pt-4 max-w-3xl mx-auto">
      <Link
        href={`/content${authKey ? `?key=${encodeURIComponent(authKey)}` : ""}`}
        className="text-sm text-rose-400 hover:underline inline-flex items-center gap-1"
      >
        <span aria-hidden style={{ transform: "scaleX(-1)" }}>←</span>
        <span>חזרה לרשימה</span>
      </Link>

      <h1 className="text-xl font-bold mt-3 text-balance leading-tight">
        {manifest?.title || slug}
      </h1>
      <p className="text-xs text-zinc-500 mt-1 tabular-nums">
        {manifest?.created?.slice(0, 10) || "—"}
        {manifest?.status ? ` · סטטוס: ${manifest.status}` : ""}
      </p>

      {/* Platform tabs */}
      <div
        role="tablist"
        aria-label="פלטפורמות"
        className="flex gap-1 overflow-x-auto -mx-1 px-1 my-4 scrollbar-none"
      >
        {PLATFORMS.map((p) => {
          const has = Boolean(pack?.[p.file as keyof Pack]);
          if (!has) return null;
          const qa = outputs[p.key];
          const okay = qa?.voice_qa?.failures?.length === 0;
          return (
            <button
              key={p.key}
              type="button"
              role="tab"
              aria-selected={tab === p.key}
              onClick={() => setTab(p.key)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                tab === p.key
                  ? "bg-rose-700 text-white border-rose-700"
                  : okay
                    ? "bg-emerald-950 text-emerald-300 border-emerald-900"
                    : "bg-zinc-900 text-zinc-300 border-zinc-800"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Voice-QA mini card */}
      {currentQA?.voice_qa && (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 mb-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-zinc-300">בקרת קול</span>
            <span className="tabular-nums">
              ביטחון:{" "}
              <strong className="text-amber-300">{currentQA.voice_qa.confidence ?? "?"}</strong>
              /10
            </span>
          </div>
          {currentQA.voice_qa.passes && currentQA.voice_qa.passes.length > 0 && (
            <ul className="space-y-0.5">
              {currentQA.voice_qa.passes.map((p, i) => (
                <li key={`p${i}`} className="text-emerald-400">
                  ✓ {p}
                </li>
              ))}
            </ul>
          )}
          {currentQA.voice_qa.failures && currentQA.voice_qa.failures.length > 0 && (
            <ul className="space-y-0.5 mt-1">
              {currentQA.voice_qa.failures.map((f, i) => (
                <li key={`f${i}`} className="text-amber-400">
                  ⚠ {f}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Body */}
      {editing && currentPlatformInfo?.editable ? (
        <textarea
          value={editBuffer}
          onChange={(e) => setEditBuffer(e.target.value)}
          aria-label="עריכת טיוטה"
          className="w-full min-h-[40dvh] rounded-lg bg-zinc-900 border border-zinc-800 p-3 text-sm leading-7 focus:outline-none focus:ring-2 focus:ring-rose-700 font-mono text-zinc-100"
          dir="rtl"
        />
      ) : (
        <pre
          className="whitespace-pre-wrap rounded-lg bg-zinc-900/40 border border-zinc-800 p-3 text-sm leading-7 text-zinc-200 font-sans"
          dir="rtl"
        >
          {currentBody || "אין תוכן עבור פלטפורמה זו."}
        </pre>
      )}

      {actionMsg && (
        <div
          className="mt-3 rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-sm"
          role="status"
        >
          {actionMsg}
        </div>
      )}

      {/* Bottom action bar — sticky for mobile */}
      <div
        className="fixed bottom-0 inset-x-0 bg-[#0f0a08]/95 backdrop-blur border-t border-zinc-800 px-4 py-3 z-10"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <div className="max-w-3xl mx-auto flex gap-2">
          {editing ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setEditBuffer(currentBody);
                }}
                disabled={Boolean(actionInFlight)}
                className="flex-1 py-2.5 rounded-lg bg-zinc-800 text-zinc-200 text-sm font-medium hover:bg-zinc-700 disabled:opacity-50"
              >
                ביטול
              </button>
              <button
                type="button"
                onClick={() => performAction("edit")}
                disabled={Boolean(actionInFlight)}
                className="flex-1 py-2.5 rounded-lg bg-rose-700 text-white text-sm font-medium hover:bg-rose-600 disabled:opacity-50"
              >
                {actionInFlight === "edit" ? "שומר…" : "שמור עריכה"}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => performAction("discard")}
                disabled={Boolean(actionInFlight)}
                aria-label="זרוק טיוטה"
                className="min-w-[44px] min-h-[44px] py-2.5 px-3 rounded-lg bg-zinc-800 text-zinc-300 text-sm font-medium hover:bg-zinc-700 disabled:opacity-50"
              >
                {actionInFlight === "discard" ? "…" : "זרוק"}
              </button>
              {currentPlatformInfo?.editable && (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  disabled={Boolean(actionInFlight)}
                  className="flex-1 py-2.5 rounded-lg bg-zinc-800 text-zinc-200 text-sm font-medium hover:bg-zinc-700 disabled:opacity-50"
                >
                  ערוך
                </button>
              )}
              <button
                type="button"
                onClick={() => performAction("approve")}
                disabled={Boolean(actionInFlight)}
                className="flex-1 py-2.5 rounded-lg bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-600 disabled:opacity-50"
              >
                {actionInFlight === "approve" ? "מאשר…" : "אשר"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
