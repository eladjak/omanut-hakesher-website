import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RETIRED_CHECKOUT_PATH = "/api/checkout";
const CANONICAL_CHECKOUT_PATH = "/api/sumit/checkout";

/**
 * This route used to implement a second checkout flow and once returned a
 * fabricated success when Sumit was not configured. Keep the URL as an
 * explicit fail-closed tombstone so stale clients can never create a local
 * "successful" order.
 */
export async function POST() {
  return NextResponse.json(
    {
      error: "checkout-endpoint-retired",
      endpoint: RETIRED_CHECKOUT_PATH,
      canonicalEndpoint: CANONICAL_CHECKOUT_PATH,
    },
    {
      status: 410,
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
        Deprecation: "true",
        Link: `<${CANONICAL_CHECKOUT_PATH}>; rel="successor-version"`,
      },
    },
  );
}
