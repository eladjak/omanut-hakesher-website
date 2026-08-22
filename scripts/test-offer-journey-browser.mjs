import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const requireFromLms = createRequire(
  new URL("../../haderech-next/package.json", import.meta.url),
);
const { chromium } = requireFromLms("playwright");

const baseUrl = (process.env.WEBSITE_OFFER_BASE_URL ?? "http://127.0.0.1:3333").replace(
  /\/$/,
  "",
);
const evidenceDir = process.env.WEBSITE_OFFER_EVIDENCE;

if (evidenceDir) await mkdir(evidenceDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function dismissFirstVisitDialog(page) {
  const dismiss = page.getByRole("button", { name: "ניסוח ניטרלי" });
  if (await dismiss.isVisible().catch(() => false)) await dismiss.click();
}

async function expectNoHorizontalOverflow(page, label) {
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
    true,
    `${label} has horizontal overflow`,
  );
}

async function expectFourStepJourney(page, current) {
  const steps = page.locator("[data-journey-step]");
  assert.equal(await steps.count(), 4);
  for (const id of ["resources", "book", "program", "guidance"]) {
    assert.equal(await page.locator(`[data-journey-step="${id}"]`).isVisible(), true);
  }
  if (current) {
    assert.equal(
      await page.locator(`[data-journey-step="${current}"] a[aria-current="page"]`).isVisible(),
      true,
    );
  }
}

const pageErrors = [];

try {
  const desktop = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    locale: "he-IL",
  });
  desktop.on("pageerror", (error) => pageErrors.push(String(error)));

  await desktop.goto(`${baseUrl}/resources`, { waitUntil: "networkidle" });
  await dismissFirstVisitDialog(desktop);
  assert.match(await desktop.locator("h1").innerText(), /לבחור נושא אחד/);
  assert.equal(await desktop.getByRole("link", { name: "לכל המאמרים" }).isVisible(), true);
  assert.equal(await desktop.getByRole("link", { name: "לעמוד הפודקאסט" }).isVisible(), true);
  assert.equal(await desktop.getByRole("link", { name: "מאיפה מתחילים?" }).isVisible(), true);
  await expectFourStepJourney(desktop, "resources");
  await expectNoHorizontalOverflow(desktop, "resources desktop");

  if (evidenceDir) {
    await desktop.emulateMedia({ reducedMotion: "reduce" });
    await desktop.screenshot({
      path: path.join(evidenceDir, "resources-desktop.png"),
      fullPage: true,
    });
  }

  await desktop.locator('[data-journey-step="book"] a').click();
  await desktop.waitForURL(`${baseUrl}/book`);
  assert.equal(await desktop.getByRole("heading", { name: "אומנות הקשר", level: 1 }).isVisible(), true);
  assert.equal(
    await desktop.getByText("הרכישה המקוונת אינה זמינה כרגע.", { exact: false }).isVisible(),
    true,
  );
  assert.equal(await desktop.getByRole("button", { name: /רכישה|הזמנה/ }).count(), 0);
  assert.equal(await desktop.getByText("54", { exact: true }).first().isVisible(), true);
  await expectFourStepJourney(desktop, "book");
  await expectNoHorizontalOverflow(desktop, "book desktop");

  await desktop.goto(`${baseUrl}/products`, { waitUntil: "networkidle" });
  assert.match(await desktop.locator("h1").innerText(), /לבחור לפי סוג העבודה/);
  for (const heading of ["הספר ״אומנות הקשר״", "כרטיס היכרויות מנצח", "תוכנית הדרך"]) {
    assert.equal(await desktop.getByRole("heading", { name: heading, exact: true }).first().isVisible(), true);
  }
  assert.equal(await desktop.getByText("איך עובדים", { exact: true }).count(), 3);
  await expectFourStepJourney(desktop);
  await expectNoHorizontalOverflow(desktop, "products desktop");

  await desktop.goto(`${baseUrl}/programs`, { waitUntil: "networkidle" });
  assert.match(await desktop.locator("h1").innerText(), /מסלול טוב מתחיל/);
  await expectFourStepJourney(desktop, "program");
  for (const phase of ["גישה", "תקשורת", "משיכה ותנועה", "חיבור", "אינטימיות", "מחויבות"]) {
    assert.equal(
      await desktop.getByRole("heading", { name: phase, exact: true }).isVisible(),
      true,
      `missing programs phase: ${phase}`,
    );
  }
  await desktop.locator('[data-journey-step="guidance"] a').click();
  await desktop.waitForURL(`${baseUrl}/services`);
  assert.match(await desktop.locator("h1").innerText(), /איזה סוג תמיכה/);
  for (const heading of ["כרטיס היכרויות מנצח", "תוכנית הדרך", "ליווי אישי"]) {
    assert.equal(await desktop.getByRole("heading", { name: heading, exact: true }).first().isVisible(), true);
  }
  await expectFourStepJourney(desktop, "guidance");
  await expectNoHorizontalOverflow(desktop, "services desktop");

  await desktop.goto(`${baseUrl}/content`, { waitUntil: "networkidle" });
  assert.equal(await desktop.getByRole("heading", { name: "סקירת תכנים" }).isVisible(), true);
  assert.equal(await desktop.getByRole("heading", { name: "כניסה לצוות התוכן" }).isVisible(), true);
  assert.equal(await desktop.getByText("כלי פנימי לצוות התוכן", { exact: true }).isVisible(), true);

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    locale: "he-IL",
  });
  mobile.on("pageerror", (error) => pageErrors.push(String(error)));
  await mobile.goto(`${baseUrl}/resources`, { waitUntil: "networkidle" });
  await dismissFirstVisitDialog(mobile);
  await expectFourStepJourney(mobile, "resources");
  await expectNoHorizontalOverflow(mobile, "resources mobile");

  const menuButton = mobile.getByRole("button", { name: "פתח תפריט" });
  await menuButton.click();
  const mobileMenu = mobile.locator("#mobile-menu");
  assert.equal(await mobileMenu.getByRole("link", { name: "תוכן פתוח", exact: true }).isVisible(), true);
  assert.equal(await mobileMenu.getByRole("link", { name: "תוכניות", exact: true }).isVisible(), true);
  assert.equal(await mobileMenu.getByRole("link", { name: "שירותים וליווי", exact: true }).isVisible(), true);

  if (evidenceDir) {
    await mobile.emulateMedia({ reducedMotion: "reduce" });
    await mobile.screenshot({
      path: path.join(evidenceDir, "resources-mobile.png"),
      fullPage: true,
    });
  }

  assert.deepEqual(pageErrors, []);
  console.log("Website offer journey Playwright smoke: PASS");
} finally {
  await browser.close();
}
