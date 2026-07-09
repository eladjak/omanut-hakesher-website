// Lead-magnet PDF renderer — omanut-hakesher.
//
// Adapted (reuse-first) from the proven pdf-empire-il pipeline
// (~/projects/pdf-empire-il/src/pdf-design/{template,build,fonts}.ts):
// HTML → puppeteer → A4 PDF, Hebrew RTL, Heebo embedded as base64 so the
// render never depends on the network (the "gibberish trap").
//
// Restyled to THIS site's brand (src/app/globals.css): cream #FFFAF7,
// pink-red #E85D75, deep blue #1E3A5F, gold #D4A853, Heebo.
//
// Usage:  node scripts/lead-pdfs/render.mjs [slug ...]
// Output: public/downloads/<slug>.pdf  (+ debug HTML in scripts/lead-pdfs/out/)
//
// puppeteer + the Heebo variable TTF are resolved from the sibling
// pdf-empire-il project so this repo stays dependency-light. Override with
// env PDF_EMPIRE_DIR if the sibling lives elsewhere.

import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import courage from "./content/courage.mjs";
import vision from "./content/vision.mjs";
import datingTalks from "./content/dating-talks.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, "..", "..");
const PDF_EMPIRE = process.env.PDF_EMPIRE_DIR ?? resolve(REPO, "..", "pdf-empire-il");

const BRAND = {
  name: "אומנות הקשר",
  author: "אלעד יעקובוביץ׳",
  authorTitle: "מאמן זוגיות ותקשורת · מייסד אומנות הקשר",
  site: "omanut-hakesher.co.il",
  ctaUrl: "https://omanut-hakesher.co.il/coaching",
  palette: {
    background: "#FFFAF7",
    text: "#1a1a2e",
    primary: "#E85D75",
    primaryDark: "#C94A62",
    secondary: "#1E3A5F",
    secondaryLight: "#2C5280",
    accent: "#D4A853",
    muted: "#F5EDE8",
    border: "#E8DDD5",
    subtle: "#5a5a6e",
  },
};

const GUIDES = { courage, vision, "dating-talks": datingTalks };

// --- Fonts: embed Heebo variable TTF as base64 (offline-safe, deterministic) ---
function fontCss() {
  const ttf = join(PDF_EMPIRE, "assets", "fonts", "Heebo-Regular.ttf");
  if (!existsSync(ttf)) {
    console.warn(`WARN: ${ttf} not found — falling back to Google Fonts CDN (network-dependent).`);
    return `@import url('https://fonts.googleapis.com/css2?family=Heebo&display=swap');`;
  }
  const b64 = readFileSync(ttf).toString("base64");
  return `@font-face {
    font-family: 'Heebo';
    src: url(data:font/ttf;base64,${b64}) format('truetype');
    font-weight: 100 900;
    font-style: normal;
  }`;
}

function css(p) {
  return `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    direction: rtl;
    font-family: 'Heebo', sans-serif;
    color: ${p.text};
    background: ${p.background};
    line-height: 1.7;
    font-size: 13.5px;
    -webkit-font-smoothing: antialiased;
    font-variant-numeric: tabular-nums;
  }
  h1, h2, h3 { color: ${p.secondary}; line-height: 1.3; font-weight: 700; }
  h1 { font-size: 34px; margin-bottom: 16px; }
  h2 { font-size: 25px; margin-bottom: 14px; }
  h3 { font-size: 16.5px; margin: 16px 0 6px; color: ${p.primaryDark}; }
  p { margin-bottom: 11px; }
  strong { color: ${p.secondary}; font-weight: 700; }
  ul { margin: 0 18px 12px 0; }
  li { margin-bottom: 7px; }
  ul.topics { list-style: none; margin-right: 0; }
  ul.topics li { padding: 6px 12px; background: #fff; border: 1px solid ${p.border}; border-radius: 8px; margin-bottom: 6px; }
  p.note { font-size: 11px; color: ${p.subtle}; margin-top: 18px; }

  .page {
    page-break-after: always;
    width: 210mm;
    min-height: 297mm;
    padding: 20mm 20mm 28mm;
    position: relative;
    background: ${p.background};
  }
  .page:last-child { page-break-after: auto; }
  .page .rule { height: 3px; width: 46px; background: ${p.accent}; border-radius: 2px; margin: 0 0 18px; }

  .cover {
    background: linear-gradient(150deg, ${p.secondary} 0%, ${p.secondaryLight} 52%, ${p.primaryDark} 100%);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 26mm 22mm;
  }
  .cover .badge {
    display: inline-block; align-self: flex-start;
    border: 1px solid rgba(255,255,255,0.45);
    border-radius: 999px; padding: 6px 18px;
    font-size: 13px; letter-spacing: 0.5px; margin-bottom: 34px;
  }
  .cover h1 { color: #fff; font-size: 46px; line-height: 1.2; margin-bottom: 22px; }
  .cover .subtitle { font-size: 19px; opacity: 0.92; line-height: 1.6; max-width: 140mm; margin-bottom: 54px; }
  .cover .gold { height: 4px; width: 70px; background: ${p.accent}; border-radius: 2px; margin-bottom: 26px; }
  .cover .author { font-size: 14px; opacity: 0.9; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 14px; max-width: 140mm; }
  .cover .author strong { color: #fff; font-size: 16px; display: block; margin-bottom: 2px; }
  .cover .site { position: absolute; bottom: 14mm; right: 22mm; font-size: 12px; opacity: 0.75; }

  .toc-list { list-style: none; margin: 8px 0 0; }
  .toc-list li {
    display: flex; justify-content: space-between; align-items: baseline;
    padding: 9px 2px;
    border-bottom: 1px dashed ${p.border};
    font-size: 14.5px;
  }
  .toc-list li .num { font-weight: 700; color: ${p.accent}; }

  .exercise {
    background: ${p.muted};
    border-right: 4px solid ${p.accent};
    border-radius: 10px;
    padding: 14px 16px;
    margin: 16px 0;
  }
  .exercise > strong { display: block; color: ${p.secondary}; margin-bottom: 6px; }
  .exercise p { margin-bottom: 0; font-size: 13px; }

  .footer {
    position: absolute;
    bottom: 11mm; left: 20mm; right: 20mm;
    display: flex; justify-content: space-between; align-items: baseline;
    font-size: 10px; color: ${p.subtle};
    padding-top: 8px;
    border-top: 1px solid ${p.border};
  }
  .footer .site { direction: ltr; }
  .page-num { font-weight: 700; color: ${p.primaryDark}; }

  .cta-box {
    text-align: center;
    background: linear-gradient(150deg, ${p.secondary}, ${p.secondaryLight});
    color: #fff;
    border-radius: 16px;
    padding: 30px 26px;
    margin: 26px 0 0;
  }
  .cta-box h3 { color: ${p.accent}; font-size: 20px; margin: 0 0 10px; }
  .cta-box p { color: rgba(255,255,255,0.94); margin-bottom: 16px; }
  .cta-box a {
    display: inline-block;
    background: ${p.primary};
    color: #fff; text-decoration: none;
    padding: 12px 34px; border-radius: 999px; font-weight: 700; font-size: 15px;
  }
  .cta-box .url { display: block; margin-top: 12px; font-size: 11.5px; color: rgba(255,255,255,0.75); direction: ltr; }
  `;
}

const footer = (num) => `
  <div class="footer">
    <span>${BRAND.name} · ${BRAND.author}</span>
    <span class="site">${BRAND.site}</span>
    <span class="page-num">${num}</span>
  </div>`;

function renderGuideHtml(guide) {
  const p = BRAND.palette;
  const chapters = [guide.intro, ...guide.sections, guide.closing];
  const toc = chapters
    .map((c, i) => `<li><span>${c.title}</span><span class="num">${i + 3}</span></li>`)
    .join("");

  const pages = chapters
    .map((c, i) => {
      const num = i + 3;
      const isClosing = c === guide.closing;
      const cta = isClosing
        ? `<div class="cta-box">
             <h3>רוצה ללכת על זה ברצינות?</h3>
             <p>ליווי אישי למציאת זוגיות, צעד אחר צעד. שיחת ההיכרות הראשונה, בחינם וללא התחייבות.</p>
             <a href="${BRAND.ctaUrl}">לתיאום שיחת היכרות</a>
             <span class="url">${BRAND.ctaUrl}</span>
           </div>`
        : "";
      return `
      <section class="page">
        <div class="rule"></div>
        <h2>${c.title}</h2>
        ${c.html}
        ${cta}
        ${footer(num)}
      </section>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8" />
<title>${guide.title}</title>
<style>${fontCss()}</style>
<style>${css(p)}</style>
</head>
<body>
  <section class="page cover">
    <span class="badge">מדריך חינמי מבית ${BRAND.name}</span>
    <h1>${guide.title}</h1>
    <div class="gold"></div>
    <p class="subtitle">${guide.subtitle}</p>
    <p class="author"><strong>${BRAND.author}</strong>${BRAND.authorTitle}</p>
    <span class="site">${BRAND.site}</span>
  </section>
  <section class="page">
    <div class="rule"></div>
    <h1>מה מחכה לך בפנים</h1>
    <ul class="toc-list">${toc}</ul>
    ${footer(2)}
  </section>
  ${pages}
</body>
</html>`;
}

async function main() {
  const requested = process.argv.slice(2);
  const slugs = requested.length > 0 ? requested : Object.keys(GUIDES);

  const requireFromEmpire = createRequire(join(PDF_EMPIRE, "package.json"));
  const puppeteer = requireFromEmpire("puppeteer");

  const outDir = join(REPO, "public", "downloads");
  const debugDir = join(HERE, "out");
  mkdirSync(outDir, { recursive: true });
  mkdirSync(debugDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--lang=he-IL"],
  });
  try {
    for (const slug of slugs) {
      const guide = GUIDES[slug];
      if (!guide) {
        console.error(`unknown slug: ${slug} (known: ${Object.keys(GUIDES).join(", ")})`);
        process.exitCode = 1;
        continue;
      }
      const html = renderGuideHtml(guide);
      const htmlPath = join(debugDir, `${slug}.html`);
      const pdfPath = join(outDir, `${slug}.pdf`);
      writeFileSync(htmlPath, html);

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0", timeout: 60_000 });
      await page.evaluateHandle("document.fonts.ready");
      await page.pdf({
        path: pdfPath,
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
      });
      await page.close();
      console.log(`OK ${slug}: ${pdfPath} (${guide.sections.length + 4} pages)`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
