export type TestimonialCategory = "text" | "graphic" | "couple";

export interface TestimonialItem {
  slug: string;
  name: string;
  title: string;
  category: TestimonialCategory;
  image: string;
  assetSha256: string;
  aspect: "square" | "portrait";
  short_quote: string;
  full_text?: string;
  context: string;
  cta_target: string;
  source: string;
  featured: boolean;
}

export interface WhatsAppShot {
  id: string;
  image: string;
  assetSha256: string;
}

export interface EmailQuote {
  id: string;
  author: string;
  age?: number;
  occupation?: string;
  context: string;
  quote: string;
  source: string;
}

export interface TestimonialVideo {
  id: string;
  title: string;
  embed: string;
  assetSha256: string;
}

const categoryLabels: Record<TestimonialCategory, string> = {
  text: "עדות כתובה",
  graphic: "עדות מצולמת",
  couple: "סיפור זוגי",
};

export function categoryLabel(category: TestimonialCategory): string {
  return categoryLabels[category];
}
