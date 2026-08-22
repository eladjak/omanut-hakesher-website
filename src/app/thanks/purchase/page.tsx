import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "סטטוס רכישה | אומנות הקשר",
  description: "בדיקת סטטוס לרכישה מקוונת.",
  alternates: { canonical: "/checkout/success" },
  robots: { index: false, follow: false },
};

/**
 * Legacy Sumit return URL. A query string or a direct visit is never proof of
 * payment, so this route discards every parameter and redirects to the neutral
 * status page. A future verified flow must use a server-controlled order
 * session rather than reviving this page-level claim.
 */
export default function ThanksPurchasePage() {
  redirect("/checkout/success");
}
