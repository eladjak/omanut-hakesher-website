import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const requireFromLms = createRequire(
  new URL("../../haderech-next/package.json", import.meta.url),
);
const { chromium } = requireFromLms("playwright");

const baseUrl = (process.env.WEBSITE_GROWTH_BASE_URL ?? "http://127.0.0.1:3333").replace(
  /\/$/,
  "",
);
const evidenceDir = process.env.WEBSITE_GROWTH_EVIDENCE;

if (evidenceDir) await mkdir(evidenceDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function dismissFirstVisitDialog(page) {
  const dismiss = page.getByRole("button", { name: "ניסוח ניטרלי" });
  if (await dismiss.isVisible().catch(() => false)) {
    const dialog = page.getByRole("dialog", { name: "ברוכים הבאים לאומנות הקשר" });
    assert.equal(await dialog.isVisible(), true);
    assert.equal(await dialog.getByText(/איך נוח לך שהאתר יפנה אליך\?/).isVisible(), true);
    assert.equal(await dialog.getByRole("button", { name: /לשון נקבה/ }).isVisible(), true);
    assert.equal(await dialog.getByRole("button", { name: /לשון זכר/ }).isVisible(), true);
    await dismiss.click();
  }
}

async function prepareEvidenceView(page) {
  // A full-page screenshot has no scrolling viewport to trigger reveal motion.
  // Reduced-motion is also an important supported mode and makes every section
  // visible at once, producing useful visual evidence instead of blank bands.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
}

try {
  const desktop = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    locale: "he-IL",
  });

  await desktop.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await dismissFirstVisitDialog(desktop);
  assert.match(
    await desktop.locator("h1").innerText(),
    /לבנות דרך לקשר[\s\S]*בלי לאבד את עצמך/,
  );
  assert.equal(
    await desktop.locator('a[href="/programs/the-way"]').first().isVisible(),
    true,
  );
  assert.equal(await desktop.locator('a[href="/book"]').first().isVisible(), true);

  for (const phase of [
    "גישה",
    "תקשורת",
    "משיכה ותנועה",
    "חיבור",
    "אינטימיות",
    "מחויבות",
  ]) {
    assert.equal(
      (await desktop.getByRole("heading", { name: phase, exact: true }).count()) >= 1,
      true,
      `missing homepage phase: ${phase}`,
    );
  }

  assert.deepEqual(
    await desktop
      .locator('[data-proof-substitute="verification-path"] li span')
      .allTextContents(),
    ["בדיקה א׳", "בדיקה ב׳", "בדיקה ג׳"],
  );

  const jsonLd = await desktop
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const parsedJsonLd = jsonLd.map((value) => JSON.parse(value));
  assert.equal(
    parsedJsonLd.some((item) => item["@type"] === "Organization" && item.hasOfferCatalog),
    true,
  );
  assert.equal(parsedJsonLd.some((item) => item["@type"] === "FAQPage"), false);
  assert.equal(
    await desktop.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
    true,
  );

  if (evidenceDir) {
    await prepareEvidenceView(desktop);
    await desktop.screenshot({
      path: path.join(evidenceDir, "homepage-desktop.png"),
      fullPage: true,
    });
    await desktop.locator('[data-proof-substitute="verification-path"]').screenshot({
      path: path.join(evidenceDir, "homepage-verification-path.png"),
    });
  }

  await desktop.goto(`${baseUrl}/programs/the-way`, { waitUntil: "networkidle" });
  assert.match(await desktop.locator("h1").innerText(), /12 שבועות של עבודה על זוגיות/);
  assert.equal(
    await desktop
      .getByRole("heading", {
        name: "לולאה פשוטה: ללמוד, לנסות, להתבונן, לבחור",
      })
      .isVisible(),
    true,
  );

  for (const phase of [
    "גישה",
    "תקשורת",
    "מעבר ומשיכה",
    "חיבור וכימיה",
    "אינטימיות",
    "מחויבות",
  ]) {
    assert.equal(
      (await desktop.getByRole("heading", { name: phase, exact: true }).count()) >= 1,
      true,
      `missing program phase: ${phase}`,
    );
  }

  const phaseImages = desktop.locator("#program-structure img");
  assert.equal(await phaseImages.count(), 6, "program must render one image per phase");
  for (let index = 0; index < 6; index += 1) {
    assert.equal(
      await phaseImages.nth(index).evaluate(
        (image) => image.complete && image.naturalWidth > 0 && image.alt.trim().length >= 20,
      ),
      true,
      `phase image ${index + 1} must load and expose human alt text`,
    );
  }

  for (const rhythm of [
    "לומדים רעיון אחד",
    "בוחרים תרגול",
    "עוצרים להתבונן",
    "ממשיכים בצעד קטן",
  ]) {
    assert.equal(
      await desktop.getByRole("heading", { name: rhythm }).isVisible(),
      true,
      `missing weekly rhythm: ${rhythm}`,
    );
  }

  await desktop
    .getByRole("button", { name: "מתי נפתחת ההצטרפות ומה המחיר?" })
    .click();
  assert.equal(
    await desktop
      .getByText("הצטרפות מקוונת אינה פתוחה כרגע", { exact: false })
      .isVisible(),
    true,
  );
  assert.equal(
    await desktop.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
    true,
  );

  if (evidenceDir) {
    await prepareEvidenceView(desktop);
    await desktop.screenshot({
      path: path.join(evidenceDir, "program-desktop.png"),
      fullPage: true,
    });
    await desktop.locator('#checkout [role="status"]').screenshot({
      path: path.join(evidenceDir, "program-availability-card.png"),
    });
  }

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    locale: "he-IL",
  });
  await mobile.goto(`${baseUrl}/programs/the-way`, { waitUntil: "networkidle" });
  await dismissFirstVisitDialog(mobile);
  assert.equal(
    await mobile.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
    true,
  );
  const structureLink = mobile.getByRole("link", { name: "לראות איך התוכנית בנויה" });
  assert.equal(await structureLink.isVisible(), true);
  await structureLink.click();
  assert.equal(await mobile.locator("#program-structure").isVisible(), true);

  if (evidenceDir) {
    await prepareEvidenceView(mobile);
    await mobile.screenshot({
      path: path.join(evidenceDir, "program-mobile.png"),
      fullPage: true,
    });
  }

  console.log("Website growth Playwright smoke: PASS");
} finally {
  await browser.close();
}
