import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import process from "node:process";
import {
  assertCommerceCatalogIntegrity,
  validateCommerceCatalogs,
} from "../src/lib/commerce-catalog-validator.ts";

const baseUrl = process.env.PURCHASE_TRUTH_TEST_BASE_URL?.replace(/\/$/, "");

const validCatalogFixture = {
  legacyProducts: {
    "the-way": {
      slug: "the-way",
      sku: "OHK-WAY-001",
      type: "one-time",
      price: { amount: 1850 },
    },
    "the-way-plus": {
      slug: "the-way-plus",
      sku: "OHK-WAY-PLUS-001",
      type: "one-time",
      price: { amount: 2970 },
    },
    "dating-card": {
      slug: "dating-card",
      sku: "OHK-CARD-001",
      type: "one-time",
      price: { amount: 97 },
    },
    "club-90d": {
      slug: "club-90d",
      sku: "OHK-CLUB-001",
      type: "recurring-monthly",
      price: { amount: 4 },
    },
    "vip-coaching": {
      slug: "vip-coaching",
      sku: "OHK-VIP-001",
      type: "booking-required",
      price: { amount: 0 },
    },
  },
  checkoutProducts: {
    "hadrech-full": { slug: "hadrech-full", sku: "hadrech-full-2026", amount: 2997 },
    "discovery-call": {
      slug: "discovery-call",
      sku: "discovery-call-2026",
      amount: 197,
    },
    "book-preorder": {
      slug: "book-preorder",
      sku: "book-preorder-2026",
      amount: 89,
    },
    "coaching-3pack": {
      slug: "coaching-3pack",
      sku: "coaching-3pack-2026",
      amount: 1497,
    },
  },
  legacyRoles: {
    "the-way": "retired-checkout",
    "the-way-plus": "retired-checkout",
    "dating-card": "retired-checkout",
    "club-90d": "retired-checkout",
    "vip-coaching": "booking-only",
  },
  checkoutRoles: {
    "hadrech-full": "contained-canonical",
    "discovery-call": "contained-canonical",
    "book-preorder": "contained-canonical",
    "coaching-3pack": "contained-canonical",
  },
  onlineCheckoutAvailable: false,
};

function cloneFixture() {
  return structuredClone(validCatalogFixture);
}

function issueCodes(input) {
  return validateCommerceCatalogs(input).map((issue) => issue.code);
}

assert.deepEqual(validateCommerceCatalogs(validCatalogFixture), []);
assert.doesNotThrow(() => assertCommerceCatalogIntegrity(validCatalogFixture));

const unclassifiedLegacy = cloneFixture();
unclassifiedLegacy.legacyProducts.extra = {
  slug: "extra",
  sku: "EXTRA-001",
  type: "one-time",
  price: { amount: 10 },
};
assert.ok(issueCodes(unclassifiedLegacy).includes("legacy-product-unclassified"));

const unclassifiedCheckout = cloneFixture();
unclassifiedCheckout.checkoutProducts.extra = {
  slug: "extra",
  sku: "CHECKOUT-EXTRA-001",
  amount: 10,
};
assert.ok(issueCodes(unclassifiedCheckout).includes("checkout-product-unclassified"));

const staleRole = cloneFixture();
delete staleRole.checkoutProducts["book-preorder"];
assert.ok(issueCodes(staleRole).includes("stale-checkout-role"));

const slugMismatch = cloneFixture();
slugMismatch.checkoutProducts["book-preorder"].slug = "forged-slug";
assert.ok(issueCodes(slugMismatch).includes("catalog-key-slug-mismatch"));

const bookingMismatch = cloneFixture();
bookingMismatch.legacyRoles["the-way"] = "booking-only";
assert.ok(issueCodes(bookingMismatch).includes("legacy-role-type-mismatch"));

const invalidAmount = cloneFixture();
invalidAmount.checkoutProducts["book-preorder"].amount = 0;
assert.ok(issueCodes(invalidAmount).includes("invalid-product-amount"));

const duplicateSku = cloneFixture();
duplicateSku.checkoutProducts["book-preorder"].sku = "hadrech-full-2026";
assert.ok(issueCodes(duplicateSku).includes("duplicate-sku"));

const crossCatalogSlug = cloneFixture();
crossCatalogSlug.checkoutProducts["the-way"] = {
  slug: "the-way",
  sku: "CHECKOUT-THE-WAY-001",
  amount: 1850,
};
crossCatalogSlug.checkoutRoles["the-way"] = "contained-canonical";
assert.ok(issueCodes(crossCatalogSlug).includes("cross-catalog-slug-overlap"));

const crossCatalogSku = cloneFixture();
crossCatalogSku.checkoutProducts["book-preorder"].sku = "OHK-CARD-001";
assert.ok(issueCodes(crossCatalogSku).includes("cross-catalog-sku-overlap"));

const publicCheckoutEnabled = cloneFixture();
publicCheckoutEnabled.onlineCheckoutAvailable = true;
assert.ok(
  issueCodes(publicCheckoutEnabled).includes("public-checkout-enabled-during-containment"),
);
assert.throws(
  () => assertCommerceCatalogIntegrity(publicCheckoutEnabled),
  /public-checkout-enabled-during-containment/,
);

const unresolvedRelationship = cloneFixture();
unresolvedRelationship.unresolvedRelationships = [
  {
    id: "the-way-program-family",
    legacyKeys: ["the-way", "the-way-plus"],
    checkoutKeys: ["hadrech-full"],
  },
];
assert.ok(issueCodes(unresolvedRelationship).includes("unresolved-catalog-relationship"));
assert.throws(
  () => assertCommerceCatalogIntegrity(unresolvedRelationship),
  /unresolved-catalog-relationship:the-way-program-family/,
);

const staleRelationship = cloneFixture();
staleRelationship.unresolvedRelationships = [
  {
    id: "missing-family",
    legacyKeys: ["not-a-legacy-product"],
    checkoutKeys: ["not-a-checkout-product"],
  },
];
assert.ok(issueCodes(staleRelationship).includes("stale-catalog-relationship-reference"));

const legacyThanksSource = await readFile(
  new URL("../src/app/thanks/purchase/page.tsx", import.meta.url),
  "utf8",
);
const neutralStatusSource = await readFile(
  new URL("../src/app/checkout/success/page.tsx", import.meta.url),
  "utf8",
);
const checkoutRouteSource = await readFile(
  new URL("../src/app/api/sumit/checkout/route.ts", import.meta.url),
  "utf8",
);
const commerceCatalogSource = await readFile(
  new URL("../src/lib/commerce-catalog.ts", import.meta.url),
  "utf8",
);
const sumitProductsSource = await readFile(
  new URL("../src/lib/sumit-products.ts", import.meta.url),
  "utf8",
);
const productFactsSource = await readFile(
  new URL("../src/lib/product-facts.ts", import.meta.url),
  "utf8",
);
const checkoutFormSource = await readFile(
  new URL("../src/components/CheckoutForm.tsx", import.meta.url),
  "utf8",
);
const sumitButtonSource = await readFile(
  new URL("../src/components/SumitCheckoutButton.tsx", import.meta.url),
  "utf8",
);

assert.match(legacyThanksSource, /redirect\("\/checkout\/success"\)/);
assert.doesNotMatch(legacyThanksSource, /searchParams|SUMIT_PRODUCTS|הרכישה הושלמה|הקבלה תישלח|פרטי הגישה/);
assert.match(neutralStatusSource, /אין כאן אישור תשלום/);
assert.doesNotMatch(neutralStatusSource, /הרכישה הושלמה|הקבלה תישלח|פרטי הגישה/);
assert.match(productFactsSource, /onlineCheckoutAvailable:\s*false/);

for (const productSlug of [
  "the-way",
  "the-way-plus",
  "dating-card",
  "club-90d",
  "vip-coaching",
  "hadrech-full",
  "discovery-call",
  "book-preorder",
  "coaching-3pack",
]) {
  assert.match(commerceCatalogSource, new RegExp(`"${productSlug}"`));
}
assert.match(commerceCatalogSource, /id: "the-way-program-family"/);

const catalogGuardIndex = checkoutRouteSource.indexOf("if (!isCommerceCatalogValid())");
const requestParsingIndex = checkoutRouteSource.indexOf("await request.json()");
const paymentGateIndex = checkoutRouteSource.indexOf("if (!isPaymentsEnabled())");
const providerCallIndex = checkoutRouteSource.indexOf("await createCheckout(");
assert.ok(paymentGateIndex >= 0 && catalogGuardIndex > paymentGateIndex);
assert.ok(requestParsingIndex > paymentGateIndex && providerCallIndex > paymentGateIndex);
assert.match(checkoutRouteSource, /getCanonicalCheckoutProduct\(productSlug\)/);
assert.doesNotMatch(checkoutRouteSource, /getSumitProduct|SUMIT_PRODUCTS|product\.successPath/);
assert.doesNotMatch(
  sumitProductsSource,
  /successPath|\/thanks\/purchase|getSumitProduct|findProductBySku|isValidProductSlug/,
);

function publicProgramFormIsContained(source) {
  return (
    /אין כאן טופס הזמנה פעיל/.test(source) &&
    /פנייה אינה הרשמה ואינה יוצרת חיוב/.test(source) &&
    /href="\/lead"/.test(source) &&
    !/["']use client["']|fetch\(["']\/api\/checkout["']\)|EnabledCheckoutForm|formatILS|type="(?:email|tel)"|product\.price/.test(source)
  );
}

assert.equal(publicProgramFormIsContained(checkoutFormSource), true);
assert.equal(
  publicProgramFormIsContained(`${checkoutFormSource}\nfetch("/api/checkout")`),
  false,
  "negative control: the retired checkout endpoint must not return to the public form",
);

const sumitPublicGuardIndex = sumitButtonSource.indexOf(
  "if (!PRODUCT_FACTS.commerce.onlineCheckoutAvailable)",
);
const sumitEnabledRenderIndex = sumitButtonSource.indexOf("return <Enabled");
assert.ok(sumitPublicGuardIndex >= 0 && sumitEnabledRenderIndex > sumitPublicGuardIndex);

async function request(path, init = {}) {
  return fetch(`${baseUrl}${path}`, { redirect: "manual", ...init });
}

if (baseUrl) {
  const legacyStatus = await request("/thanks/purchase?product=book-preorder&paid=true");
  assert.equal(legacyStatus.status, 307);
  const redirectLocation = legacyStatus.headers.get("location") ?? "";
  assert.match(redirectLocation, /\/checkout\/success$/);
  assert.doesNotMatch(redirectLocation, /product=|paid=/);
  const legacyBody = await legacyStatus.text();
  assert.doesNotMatch(legacyBody, /הרכישה הושלמה|הקבלה תישלח|פרטי הגישה|מכירה מוקדמת/);

  const rscStatus = await request("/thanks/purchase?product=book-preorder", {
    headers: {
      RSC: "1",
      Accept: "text/x-component",
    },
  });
  assert.equal(rscStatus.status, 307);
  const rscLocation = rscStatus.headers.get("location") ?? "";
  const rscBody = await rscStatus.text();
  assert.doesNotMatch(rscBody, /הרכישה הושלמה|הקבלה תישלח|פרטי הגישה|מכירה מוקדמת/);

  if (/\/checkout\/success$/.test(rscLocation)) {
    assert.doesNotMatch(rscLocation, /product=|paid=/);
  } else {
    // Next's production RSC transport first canonicalizes the same URL with an
    // internal `_rsc` key. The second response must contain only a framework
    // redirect instruction to the neutral target, never purchase-success data.
    assert.match(rscLocation, /^\/thanks\/purchase\?product=book-preorder&_rsc/);
    const canonicalizedRsc = await request(rscLocation, {
      headers: {
        RSC: "1",
        Accept: "text/x-component",
      },
    });
    assert.equal(canonicalizedRsc.status, 200);
    const canonicalizedBody = await canonicalizedRsc.text();
    assert.match(canonicalizedBody, /NEXT_REDIRECT/);
    assert.match(canonicalizedBody, /\/checkout\/success/);
    assert.doesNotMatch(
      canonicalizedBody,
      /הרכישה הושלמה|הקבלה תישלח|פרטי הגישה|מכירה מוקדמת/,
    );
  }

  const neutralStatus = await request("/checkout/success?product=book-preorder&paid=true");
  assert.equal(neutralStatus.status, 200);
  const neutralBody = await neutralStatus.text();
  assert.match(neutralBody, /אין כאן אישור תשלום/);
  assert.doesNotMatch(neutralBody, /הרכישה הושלמה|הקבלה תישלח|פרטי הגישה/);

  const containedPurchaseSurfaces = new Map([
    ["/book", /הרכישה המקוונת אינה זמינה/],
    ["/programs/the-way", /ההרשמה המקוונת אינה פתוחה כרגע/],
    ["/programs/the-way-plus", /ההרשמה המקוונת אינה פעילה כרגע/],
    ["/products/dating-card", /הרכישה המקוונת אינה פעילה כרגע/],
    ["/club", /המועדון עדיין אינו פתוח לרכישה באתר/],
  ]);

  for (const [path, unavailableCopy] of containedPurchaseSurfaces) {
    const publicSurface = await request(path);
    assert.equal(publicSurface.status, 200, `${path} must remain public`);
    const publicBody = await publicSurface.text();
    assert.match(publicBody, unavailableCopy);
    assert.doesNotMatch(
      publicBody,
      /הרכישה הושלמה|המשך\/י לתשלום מאובטח|המשך לתשלום מאובטח|קבלה תישלח אוטומטית|התשלום מעובד באמצעות Sumit/,
    );
    if (path === "/programs/the-way") {
      assert.doesNotMatch(
        publicBody,
        /₪|1,850|1850|2,997|2997|\/api\/checkout/,
        "the program page must not serialize draft prices or the retired checkout path",
      );
    }
  }

  const checkoutResponse = await request("/api/sumit/checkout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      productSlug: "book-preorder",
      name: "Test Buyer",
      email: "buyer@example.test",
    }),
  });
  assert.equal(checkoutResponse.status, 503);
  assert.equal((await checkoutResponse.json()).error, "payments-disabled");

  console.log(
    "Purchase-truth contract and raw HTTP checks passed; checkout stayed contained and no provider call was attempted.",
  );
} else {
  console.log(
    "Purchase-truth contract checks passed offline. Set PURCHASE_TRUTH_TEST_BASE_URL for raw HTTP checks.",
  );
}
