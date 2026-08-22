import assert from "node:assert/strict";
import crypto from "node:crypto";
import { readFile } from "node:fs/promises";
import process from "node:process";
import {
  matchEventToPendingOrder,
  parseSumitWebhookEvent,
  verifySumitWebhookHmac,
} from "../src/lib/sumit-webhook-contract.ts";

const baseUrl = process.env.PAYMENT_CONTAINMENT_TEST_BASE_URL?.replace(/\/$/, "");
const httpWebhookSecret = process.env.PAYMENT_CONTAINMENT_TEST_WEBHOOK_SECRET;
const expectWebhookUnconfigured =
  process.env.PAYMENT_CONTAINMENT_EXPECT_WEBHOOK_UNCONFIGURED === "true";

const validPayload = {
  EventID: "evt-test-001",
  EventType: "payment.succeeded",
  PaymentID: "payment-test-001",
  ExternalIdentifier: "omanut:book-preorder:1723456789:abc123",
  SKU: "book-preorder-2026",
  Amount: 89,
  Currency: "ILS",
};
const rawPayload = JSON.stringify(validPayload);
const fixtureSecret = "offline-contract-test-secret";
const validSignature = crypto
  .createHmac("sha256", fixtureSecret)
  .update(rawPayload, "utf8")
  .digest("hex");

// Exact raw-body HMAC contract and negative controls.
assert.equal(verifySumitWebhookHmac(rawPayload, validSignature, fixtureSecret), true);
assert.equal(verifySumitWebhookHmac(rawPayload, validSignature.toUpperCase(), fixtureSecret), true);
assert.equal(verifySumitWebhookHmac(`${rawPayload} `, validSignature, fixtureSecret), false);
assert.equal(verifySumitWebhookHmac(rawPayload, validSignature, "wrong-secret"), false);
assert.equal(verifySumitWebhookHmac(rawPayload, null, fixtureSecret), false);
assert.equal(verifySumitWebhookHmac(rawPayload, validSignature, null), false);
assert.equal(verifySumitWebhookHmac(rawPayload, validSignature, "   "), false);
assert.equal(verifySumitWebhookHmac(rawPayload, `sha256=${validSignature}`, fixtureSecret), false);
assert.equal(verifySumitWebhookHmac(rawPayload, "z".repeat(64), fixtureSecret), false);

// Schema normalization covers payment lifecycle aliases without treating a
// receipt/document event as proof of a successful payment.
const parsedSuccess = parseSumitWebhookEvent(validPayload);
assert.equal(parsedSuccess.ok, true);
if (!parsedSuccess.ok) throw new Error("valid success fixture did not parse");
assert.deepEqual(parsedSuccess.event, {
  eventId: "evt-test-001",
  eventType: "payment.succeeded",
  lifecycle: "succeeded",
  paymentId: "payment-test-001",
  orderIdentifier: "omanut:book-preorder:1723456789:abc123",
  sku: "book-preorder-2026",
  amountMinor: 8900,
  currency: "ILS",
});

for (const [eventType, lifecycle] of [
  ["payment.failed", "failed"],
  ["payment.cancelled", "cancelled"],
  ["payment.refunded", "refunded"],
]) {
  const parsed = parseSumitWebhookEvent({ ...validPayload, EventType: eventType });
  assert.equal(parsed.ok, true, `${eventType} must be recognized as a lifecycle event`);
  if (parsed.ok) assert.equal(parsed.event.lifecycle, lifecycle);
}

for (const [mutation, reason] of [
  [{ EventType: "document.created" }, "unsupported-event"],
  [{ EventID: undefined }, "missing-event-id"],
  [{ PaymentID: undefined }, "missing-payment-id"],
  [{ ExternalIdentifier: undefined }, "missing-order-identifier"],
  [{ SKU: undefined }, "missing-sku"],
  [{ Amount: 0 }, "invalid-amount"],
  [{ Amount: 89.999 }, "invalid-amount"],
  [{ Currency: "USD" }, "unsupported-currency"],
]) {
  assert.deepEqual(parseSumitWebhookEvent({ ...validPayload, ...mutation }), {
    ok: false,
    reason,
  });
}
assert.deepEqual(parseSumitWebhookEvent(null), { ok: false, reason: "invalid-event" });

const pendingOrder = {
  orderIdentifier: parsedSuccess.event.orderIdentifier,
  sku: parsedSuccess.event.sku,
  amountMinor: parsedSuccess.event.amountMinor,
  currency: "ILS",
  status: "pending",
};
assert.deepEqual(matchEventToPendingOrder(parsedSuccess.event, pendingOrder), { ok: true });
assert.deepEqual(matchEventToPendingOrder(parsedSuccess.event, null), {
  ok: false,
  reason: "order-not-pending",
});
assert.deepEqual(matchEventToPendingOrder(parsedSuccess.event, { ...pendingOrder, status: "paid" }), {
  ok: false,
  reason: "order-not-pending",
});
assert.deepEqual(
  matchEventToPendingOrder(parsedSuccess.event, {
    ...pendingOrder,
    orderIdentifier: "omanut:other:1723456789:def456",
  }),
  { ok: false, reason: "order-identifier-mismatch" },
);
assert.deepEqual(
  matchEventToPendingOrder(parsedSuccess.event, { ...pendingOrder, sku: "forged-sku" }),
  { ok: false, reason: "sku-mismatch" },
);
assert.deepEqual(
  matchEventToPendingOrder(parsedSuccess.event, { ...pendingOrder, amountMinor: 1 }),
  { ok: false, reason: "amount-mismatch" },
);
assert.deepEqual(
  matchEventToPendingOrder(parsedSuccess.event, { ...pendingOrder, currency: "USD" }),
  { ok: false, reason: "currency-mismatch" },
);

const legacyRoute = await readFile(
  new URL("../src/app/api/checkout/route.ts", import.meta.url),
  "utf8",
);
const canonicalRoute = await readFile(
  new URL("../src/app/api/sumit/checkout/route.ts", import.meta.url),
  "utf8",
);
const webhookRoute = await readFile(
  new URL("../src/app/api/sumit/webhook/route.ts", import.meta.url),
  "utf8",
);
const sumitSource = await readFile(new URL("../src/lib/sumit.ts", import.meta.url), "utf8");
const envExample = await readFile(new URL("../.env.example", import.meta.url), "utf8");
const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

function legacyRouteIsRetired(source) {
  return (
    /status:\s*410/.test(source) &&
    /checkout-endpoint-retired/.test(source) &&
    /\/api\/sumit\/checkout/.test(source) &&
    !/createCheckout|request\.json|dev-fallback/.test(source)
  );
}

function checkoutGatePrecedesInspection(source) {
  const paymentGateIndex = source.indexOf("if (!isPaymentsEnabled())");
  const catalogGuardIndex = source.indexOf("if (!isCommerceCatalogValid())");
  const requestParsingIndex = source.indexOf("await request.json()");
  const productLookupIndex = source.indexOf("getCanonicalCheckoutProduct(productSlug)");
  return (
    paymentGateIndex >= 0 &&
    catalogGuardIndex > paymentGateIndex &&
    requestParsingIndex > paymentGateIndex &&
    productLookupIndex > paymentGateIndex
  );
}

function webhookGetIsNonOracle(source) {
  return (
    !/export\s+(?:async\s+)?function\s+GET\b/.test(source) &&
    !/configured\s*:\s*Boolean\s*\(/.test(source)
  );
}

assert.equal(legacyRouteIsRetired(legacyRoute), true);
assert.equal(legacyRouteIsRetired(legacyRoute.replace("status: 410", "status: 200")), false);

assert.equal(checkoutGatePrecedesInspection(canonicalRoute), true);
const lateGateFixture = canonicalRoute.replace(
  "if (!isPaymentsEnabled())",
  "if (false)",
).replace(
  "let body: CheckoutBody;",
  "if (!isPaymentsEnabled()) { /* negative fixture: gate moved after catalog access */ }\n\n  let body: CheckoutBody;",
);
assert.equal(checkoutGatePrecedesInspection(lateGateFixture), false);

const paymentGateIndex = canonicalRoute.indexOf("if (!isPaymentsEnabled())");
const providerCallIndex = canonicalRoute.indexOf("await createCheckout(");
assert.ok(paymentGateIndex >= 0 && providerCallIndex > paymentGateIndex);
assert.doesNotMatch(canonicalRoute, /detail:\s*result\.detail/);
assert.match(canonicalRoute, /const successUrl = `\$\{baseUrl\}\/checkout\/success`/);
assert.doesNotMatch(canonicalRoute, /product\.successPath/);

const webhookConfigurationIndex = webhookRoute.indexOf("if (!isWebhookConfigured())");
const signatureIndex = webhookRoute.indexOf("verifyWebhookSignature(rawBody, signature)");
const storeIndex = webhookRoute.indexOf("if (!hasDurablePaymentStore())");
assert.ok(webhookConfigurationIndex >= 0 && signatureIndex > webhookConfigurationIndex);
assert.ok(storeIndex > signatureIndex);
assert.doesNotMatch(
  webhookRoute,
  /new\s+Set\s*(?:<|\()|seenPayment|subscribeToList|from ['"]@\/lib\/ravmesser|event\.Customer|console\./i,
);
assert.doesNotMatch(webhookRoute, /status:\s*20\d|ok:\s*true/);
assert.equal(webhookGetIsNonOracle(webhookRoute), true);
assert.equal(
  webhookGetIsNonOracle(
    `${webhookRoute}\nexport async function GET() { return Response.json({ configured: Boolean(process.env.SUMIT_WEBHOOK_SECRET) }); }`,
  ),
  false,
);
assert.match(sumitSource, /const PAYMENT_FULFILLMENT_IMPLEMENTED = false;/);
assert.match(sumitSource, /const DURABLE_PAYMENT_STORE_IMPLEMENTED = false;/);
assert.match(sumitSource, /verifySumitWebhookHmac\(rawBody, signature, readWebhookSecret\(\)\)/);
assert.doesNotMatch(envExample, /accepts unsigned requests/i);

const dependencyNames = Object.keys({
  ...(packageJson.dependencies ?? {}),
  ...(packageJson.devDependencies ?? {}),
});
assert.equal(
  dependencyNames.some((name) =>
    /(?:prisma|redis|upstash|supabase|convex|dynamodb|firestore|postgres|sqlite)/i.test(name),
  ),
  false,
  "No durable payment-store dependency exists; production fulfillment must remain blocked",
);

async function post(path, body, signature) {
  const headers = { "content-type": "application/json" };
  if (signature) headers["x-sumit-signature"] = signature;
  return fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers,
    body,
    redirect: "manual",
  });
}

if (baseUrl) {
  const retired = await post(
    "/api/checkout",
    JSON.stringify({ slug: "the-way", name: "Test Buyer", email: "buyer@example.test" }),
  );
  assert.equal(retired.status, 410);
  assert.match(retired.headers.get("cache-control") ?? "", /no-store/);
  assert.equal((await retired.json()).error, "checkout-endpoint-retired");

  const checkoutBodies = [
    JSON.stringify({
      productSlug: "book-preorder",
      name: "Test Buyer",
      email: "buyer@example.test",
    }),
    JSON.stringify({
      productSlug: "not-a-real-product",
      name: "Test Buyer",
      email: "buyer@example.test",
    }),
    "{not-json",
  ];
  const checkoutResults = [];
  for (const body of checkoutBodies) {
    const checkout = await post("/api/sumit/checkout", body);
    checkoutResults.push({
      status: checkout.status,
      cacheControl: checkout.headers.get("cache-control"),
      body: await checkout.text(),
    });
  }
  assert.equal(checkoutResults[0].status, 503);
  assert.match(checkoutResults[0].cacheControl ?? "", /no-store/);
  assert.equal(JSON.parse(checkoutResults[0].body).error, "payments-disabled");
  assert.deepEqual(checkoutResults[1], checkoutResults[0]);
  assert.deepEqual(checkoutResults[2], checkoutResults[0]);

  const webhookGet = await fetch(`${baseUrl}/api/sumit/webhook`, {
    method: "GET",
    redirect: "manual",
  });
  const webhookGetBody = await webhookGet.text();
  assert.equal(webhookGet.status, 405);
  assert.doesNotMatch(webhookGetBody, /configured|secret|fulfillment/i);

  if (expectWebhookUnconfigured) {
    const unconfigured = await post("/api/sumit/webhook", rawPayload);
    assert.equal(unconfigured.status, 503);
    assert.equal((await unconfigured.json()).error, "webhook-not-configured");
    console.log(
      "Payment containment contract and missing-secret HTTP checks passed; no provider transaction was attempted.",
    );
  } else {
    if (!httpWebhookSecret) {
      throw new Error(
        "PAYMENT_CONTAINMENT_TEST_WEBHOOK_SECRET is required with PAYMENT_CONTAINMENT_TEST_BASE_URL",
      );
    }

    const invalidSignature = await post("/api/sumit/webhook", rawPayload, "0".repeat(64));
    assert.equal(invalidSignature.status, 401);
    assert.equal((await invalidSignature.json()).error, "invalid-signature");

    const malformedBody = "{not-json";
    const malformedSignature = crypto
      .createHmac("sha256", httpWebhookSecret)
      .update(malformedBody, "utf8")
      .digest("hex");
    const malformed = await post("/api/sumit/webhook", malformedBody, malformedSignature);
    assert.equal(malformed.status, 400);

    const unsupportedBody = JSON.stringify({ ...validPayload, EventType: "document.created" });
    const unsupportedSignature = crypto
      .createHmac("sha256", httpWebhookSecret)
      .update(unsupportedBody, "utf8")
      .digest("hex");
    const unsupported = await post(
      "/api/sumit/webhook",
      unsupportedBody,
      unsupportedSignature,
    );
    assert.equal(unsupported.status, 422);

    const signedPayload = crypto
      .createHmac("sha256", httpWebhookSecret)
      .update(rawPayload, "utf8")
      .digest("hex");
    for (let attempt = 0; attempt < 2; attempt += 1) {
      const contained = await post("/api/sumit/webhook", rawPayload, signedPayload);
      assert.equal(contained.status, 503);
      assert.equal((await contained.json()).error, "payment-store-not-configured");
    }

    for (const eventType of ["payment.failed", "payment.cancelled"]) {
      const lifecycleBody = JSON.stringify({ ...validPayload, EventType: eventType });
      const lifecycleSignature = crypto
        .createHmac("sha256", httpWebhookSecret)
        .update(lifecycleBody, "utf8")
        .digest("hex");
      const lifecycleResponse = await post(
        "/api/sumit/webhook",
        lifecycleBody,
        lifecycleSignature,
      );
      assert.equal(lifecycleResponse.status, 503);
      assert.equal((await lifecycleResponse.json()).error, "payment-store-not-configured");
    }

    console.log(
      "Payment containment contract and local HTTP checks passed; no provider transaction was attempted.",
    );
  }
} else {
  console.log(
    "Payment containment contract checks passed offline. Set PAYMENT_CONTAINMENT_TEST_BASE_URL and PAYMENT_CONTAINMENT_TEST_WEBHOOK_SECRET for local HTTP checks.",
  );
}
