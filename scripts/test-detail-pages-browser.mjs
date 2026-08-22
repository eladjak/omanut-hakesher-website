import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const requireFromLms = createRequire(new URL("../../haderech-next/package.json", import.meta.url));
const { chromium } = requireFromLms("playwright");

const baseUrl = (process.env.WEBSITE_DETAIL_BASE_URL ?? "http://127.0.0.1:3333").replace(/\/$/, "");
const evidenceDir = process.env.WEBSITE_DETAIL_EVIDENCE;
if (evidenceDir) await mkdir(evidenceDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const pageErrors = [];

async function dismissFirstVisitDialog(page) {
  const dismiss = page.getByRole("button", { name: "ניסוח ניטרלי" });
  const appeared = await dismiss.waitFor({ state: "visible", timeout: 1500 }).then(() => true).catch(() => false);
  if (appeared) {
    await dismiss.click();
    await dismiss.waitFor({ state: "hidden", timeout: 1500 });
  }
}

async function open(page, route) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
  await page.locator("h1").waitFor({ state: "visible" });
  await dismissFirstVisitDialog(page);
  assert.equal(await page.locator("html").getAttribute("lang"), "he");
  assert.equal(await page.locator("html").getAttribute("dir"), "rtl");
  assert.equal(
    await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
    true,
    `${route} has horizontal overflow`,
  );
}

async function screenshot(page, name) {
  if (!evidenceDir) return;
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.screenshot({ path: path.join(evidenceDir, name), fullPage: true });
}

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 }, locale: "he-IL" });
  desktop.on("pageerror", (error) => pageErrors.push(`desktop: ${String(error)}`));

  await open(desktop, "/coaching");
  assert.match(await desktop.locator("h1").innerText(), /ליווי אישי/);
  assert.equal(await desktop.getByRole("heading", { name: "לבחור את רמת התמיכה שמתאימה עכשיו" }).isVisible(), true);
  assert.equal(await desktop.getByText("לא חייבים להתחיל בליווי", { exact: true }).isVisible(), true);
  assert.equal(await desktop.getByRole("heading", { name: /ארבע עדשות/ }).isVisible(), true);
  await screenshot(desktop, "coaching-desktop.png");

  await open(desktop, "/coaching/book");
  assert.equal(await desktop.getByRole("heading", { name: "מה כדאי לברר בשיחה" }).isVisible(), true);
  assert.equal(await desktop.getByText("פרטיות בשיחה הראשונה:", { exact: true }).isVisible(), true);

  await open(desktop, "/coaching/vip");
  assert.equal(await desktop.getByRole("heading", { name: "ארבעה דברים שצריכים להופיע בהצעה" }).isVisible(), true);
  assert.equal((await desktop.locator("body").innerText()).includes("₪"), false);
  const vipHero = desktop.getByAltText("איור מסלול עבודה עם נקודות בחירה ותרגול");
  assert.equal(await vipHero.isVisible(), true);
  assert.match((await vipHero.getAttribute("src")) ?? "", /coaching-program/);
  await screenshot(desktop, "coaching-vip-desktop.png");

  await open(desktop, "/products/dating-card");
  assert.equal(await desktop.getByText("תרגיל של דקה", { exact: true }).isVisible(), true);
  assert.equal(await desktop.getByText("הרכישה המקוונת אינה פעילה כרגע.", { exact: false }).isVisible(), true);
  assert.equal((await desktop.locator("body").innerText()).includes("₪"), false);

  await open(desktop, "/programs/the-way-plus");
  assert.equal(await desktop.getByRole("heading", { name: "התוכנית הבסיסית או המסלול המשולב?" }).isVisible(), true);
  assert.equal(await desktop.locator("table").isVisible(), true);
  assert.equal((await desktop.locator("body").innerText()).includes("₪"), false);
  await screenshot(desktop, "the-way-plus-desktop.png");

  await open(desktop, "/club");
  assert.equal(await desktop.getByRole("heading", { name: "בדיקת התאמה בשתי דקות" }).isVisible(), true);
  assert.equal(await desktop.getByRole("heading", { name: "ארבע שאלות שחייבות לקבל תשובה" }).isVisible(), true);

  await open(desktop, "/podcast");
  assert.equal(await desktop.getByRole("heading", { name: /איך להפיק יותר/ }).isVisible(), true);
  assert.equal(await desktop.getByText("אלה מסלולי הקשבה, לא רשימת פרקים מאומתת.", { exact: false }).isVisible(), true);
  assert.equal(await desktop.getByRole("link", { name: "האזן ב-Spotify" }).isVisible(), true);

  await open(desktop, "/lead/courage");
  assert.equal(await desktop.getByRole("heading", { name: "שלושה צעדים שהופכים קריאה לתרגול" }).isVisible(), true);
  assert.equal(await desktop.getByRole("heading", { name: "המדריך פתוח עכשיו" }).isVisible(), true);
  assert.equal(await desktop.getByText("אין צורך להשאיר אימייל או להצטרף לרשימת דיוור", { exact: false }).isVisible(), true);
  assert.equal(await desktop.getByRole("link", { name: "לפתיחת ה־PDF" }).first().isVisible(), true);
  assert.equal(await desktop.locator('input[type="email"]').count(), 0);
  assert.equal(await desktop.getByRole("heading", { name: "סולם של שלושה צעדים" }).isVisible(), true);
  await screenshot(desktop, "lead-courage-desktop.png");

  await open(desktop, "/lead");
  assert.equal(await desktop.getByRole("heading", { name: "לבחור כלי אחד — ולפתוח אותו מיד" }).isVisible(), true);
  assert.equal(await desktop.getByRole("link", { name: "לפתיחת ה־PDF" }).count(), 3);
  assert.equal(await desktop.locator('input[type="email"]').count(), 0);
  await desktop.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    window.scrollTo(0, 0);
  });
  await desktop.keyboard.press("Tab");
  const skipLink = desktop.locator('a[href="#main-content"]');
  assert.equal(await skipLink.evaluate((element) => element === document.activeElement), true);
  assert.equal(await skipLink.isVisible(), true);
  await desktop.keyboard.press("Enter");
  assert.equal(await desktop.locator("#main-content").evaluate((element) => element === document.activeElement), true);
  await screenshot(desktop, "lead-index-desktop.png");

  await open(desktop, "/lead/36-questions");
  assert.equal(await desktop.getByRole("heading", { name: "המדריך בהכנה" }).isVisible(), true);
  assert.equal(await desktop.getByText("מה המחקר בדק — ומה לא", { exact: true }).isVisible(), true);
  assert.equal(await desktop.getByRole("heading", { name: "הזמנה לפני שאלה" }).isVisible(), true);
  assert.equal(await desktop.getByRole("button", { name: /שלחו לי/ }).count(), 0);

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, locale: "he-IL" });
  mobile.on("pageerror", (error) => pageErrors.push(`mobile: ${String(error)}`));

  for (const route of ["/coaching", "/programs/the-way-plus", "/lead", "/lead/courage", "/podcast"]) {
    await open(mobile, route);
  }
  await open(mobile, "/programs/the-way-plus");
  assert.equal(await mobile.locator("table").isVisible(), true);
  await screenshot(mobile, "the-way-plus-mobile.png");

  await open(mobile, "/lead/courage");
  assert.equal(await mobile.getByRole("heading", { name: "סולם של שלושה צעדים" }).isVisible(), true);
  await screenshot(mobile, "lead-courage-mobile.png");

  await open(mobile, "/coaching/vip");
  assert.equal(await mobile.getByAltText("איור מסלול עבודה עם נקודות בחירה ותרגול").isVisible(), true);
  await screenshot(mobile, "coaching-vip-mobile.png");

  assert.deepEqual(pageErrors, []);
  console.log("Website detail pages Playwright smoke: PASS (10 desktop routes, 6 mobile routes)");
} finally {
  await browser.close();
}
