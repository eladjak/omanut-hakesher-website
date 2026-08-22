import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateCompanionProductRegistry } from "../src/lib/companion-product-registry-validator.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = path.join(repoRoot, "data", "companion-products.json");
const registry = JSON.parse(await readFile(registryPath, "utf8"));
const issues = validateCompanionProductRegistry(registry);

const expectedPublicAssets = new Set([
  "/downloads/courage.pdf",
  "/downloads/vision.pdf",
  "/downloads/dating-talks.pdf",
]);
const actualAssets = new Set(registry.flatMap((item) => item.assets ?? []));

for (const asset of actualAssets) {
  if (!expectedPublicAssets.has(asset)) {
    issues.push({ code: "unexpected-public-asset", item: "registry", field: asset });
  }
}
for (const asset of expectedPublicAssets) {
  if (!actualAssets.has(asset)) {
    issues.push({ code: "missing-public-asset", item: "registry", field: asset });
  }
}

for (const item of registry) {
  if (item.access === "protected" && ((item.routes?.length ?? 0) > 0 || (item.assets?.length ?? 0) > 0)) {
    issues.push({ code: "protected-target-exposed", item: item.id });
  }
  for (const route of item.routes ?? []) {
    const pagePath = path.join(repoRoot, "src", "app", ...route.slice(1).split("/"), "page.tsx");
    try {
      await access(pagePath);
    } catch {
      issues.push({ code: "route-source-missing", item: item.id, field: route });
    }
  }
  for (const asset of item.assets ?? []) {
    const assetPath = path.join(repoRoot, "public", ...asset.slice(1).split("/"));
    try {
      await access(assetPath);
    } catch {
      issues.push({ code: "asset-file-missing", item: item.id, field: asset });
    }
  }
}

if (registry.length !== 31) {
  issues.push({ code: "registry-count-mismatch", item: `expected:31,actual:${registry.length}` });
}

if (issues.length > 0) {
  const summary = issues
    .map((issue) => `${issue.code}${issue.item ? `:${issue.item}` : ""}${issue.field ? `:${issue.field}` : ""}`)
    .join("\n");
  throw new Error(`Companion registry validation failed:\n${summary}`);
}

console.log(
  `Companion registry: PASS (${registry.length} products, ${actualAssets.size} public assets, ${registry.flatMap((item) => item.routes ?? []).length} existing public routes)`,
);
