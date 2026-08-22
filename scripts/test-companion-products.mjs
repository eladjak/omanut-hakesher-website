import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateCompanionProductRegistry } from "../src/lib/companion-product-registry-validator.ts";

const registry = JSON.parse(
  await readFile(new URL("../data/companion-products.json", import.meta.url), "utf8"),
);
const resourcesPage = await readFile(
  new URL("../src/app/resources/page.tsx", import.meta.url),
  "utf8",
);

function cloneRegistry() {
  return structuredClone(registry);
}

function codes(input) {
  return validateCompanionProductRegistry(input).map((issue) => issue.code);
}

assert.deepEqual(validateCompanionProductRegistry(registry), []);

for (const id of ["CP-02", "CP-22", "CP-24"]) {
  const item = registry.find((entry) => entry.id === id);
  assert.equal(item?.status, "available", `${id} must be available`);
  assert.equal(item?.access, "public", `${id} must be public`);
  assert.equal(item?.entitlement, "none", `${id} must not require entitlement`);
  assert.ok(item?.routes?.length > 0, `${id} must have a public route`);
  assert.ok(resourcesPage.includes(`publicCompanion("${id}")`), `${id} must be consumed by /resources`);
}
assert.ok(!resourcesPage.includes("listCompanionProducts("), "resources must not render the full inventory");
assert.ok(!resourcesPage.includes("COMPANION_PRODUCTS.map"), "resources must not map protected inventory");

const negativeControls = [
  {
    name: "duplicate id",
    expected: "duplicate-id",
    mutate(items) {
      items[1].id = items[0].id;
    },
  },
  {
    name: "duplicate route",
    expected: "duplicate-route",
    mutate(items) {
      items[1].routes.push(items[0].routes[0]);
    },
  },
  {
    name: "available without route or asset",
    expected: "available-without-public-target",
    mutate(items) {
      delete items[0].routes;
      delete items[0].assets;
    },
  },
  {
    name: "protected without entitlement",
    expected: "protected-without-entitlement",
    mutate(items) {
      items[6].entitlement = "none";
    },
  },
  {
    name: "internal field",
    expected: "forbidden-field",
    mutate(items) {
      items[0].internalNotes = "not public";
    },
  },
  {
    name: "client PII field",
    expected: "forbidden-field",
    mutate(items) {
      items[0].clientEmail = "person@example.invalid";
    },
  },
  {
    name: "price field",
    expected: "forbidden-field",
    mutate(items) {
      items[0].price = 1;
    },
  },
  {
    name: "local home path",
    expected: "sensitive-value",
    mutate(items) {
      items[0].summary = "C:/Users/PrivatePerson/file.txt";
    },
  },
];

for (const control of negativeControls) {
  const fixture = cloneRegistry();
  control.mutate(fixture);
  assert.ok(codes(fixture).includes(control.expected), `${control.name} should fail with ${control.expected}`);
}

console.log(
  `Companion registry negative controls: PASS (${negativeControls.length}/${negativeControls.length})`,
);
