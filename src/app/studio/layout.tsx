import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio | אומנות הקשר",
  description: "Sanity Studio (internal CMS)",
  // Hide the CMS from search engines and AI crawlers.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
