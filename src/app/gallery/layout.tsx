import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "גלריה",
  description:
    "גלריה של תמונות מסדנאות, אירועים ורגעים מיוחדים של זוגות בתהליך עם אומנות הקשר",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "גלריה | אומנות הקשר",
    description:
      "גלריה של תמונות מסדנאות, אירועים ורגעים מיוחדים של זוגות בתהליך עם אומנות הקשר",
    url: "/gallery",
    locale: "he_IL",
    type: "website",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
