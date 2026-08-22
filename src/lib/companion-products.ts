import registryData from "../../data/companion-products.json";
import {
  assertCompanionProductRegistry,
  type CompanionProduct,
  type CompanionProductStatus,
} from "@/lib/companion-product-registry-validator";

assertCompanionProductRegistry(registryData);

/**
 * Public-safe companion-product truth.
 *
 * This registry describes availability and ownership only. It is deliberately
 * separate from commerce, testimonials, customer data and entitlement grants.
 */
export const COMPANION_PRODUCTS: readonly CompanionProduct[] = registryData;

export function listCompanionProducts(status?: CompanionProductStatus): CompanionProduct[] {
  return COMPANION_PRODUCTS.filter((item) => !status || item.status === status);
}

export function getCompanionProduct(id: string): CompanionProduct | undefined {
  return COMPANION_PRODUCTS.find((item) => item.id === id);
}
