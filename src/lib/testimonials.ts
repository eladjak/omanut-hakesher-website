import data from "@/data/testimonials.json";

export type TestimonialCategory = "text" | "graphic" | "couple";

export interface TestimonialItem {
  slug: string;
  name: string;
  title: string;
  category: TestimonialCategory;
  image: string;
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
}

/**
 * Image-less authentic quotes salvaged from Elad's email sequences
 * (folded 2026-07-09 from the legacy /testimonials page — the only
 * quotes there with a verified source; see content-library §5).
 */
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
}

export const testimonials = data.items as TestimonialItem[];
export const emailQuotes = data.quotes as EmailQuote[];
export const whatsappShots = data.whatsapp_screenshots as WhatsAppShot[];
export const videos = data.videos as TestimonialVideo[];

export function getTestimonial(slug: string): TestimonialItem | undefined {
  return testimonials.find((t) => t.slug === slug);
}

export function getAllSlugs(): string[] {
  return testimonials.map((t) => t.slug);
}

const categoryLabels: Record<TestimonialCategory, string> = {
  text: "עדות תלמיד",
  graphic: "עדות מצולמת",
  couple: "זוג שמצא",
};

export function categoryLabel(c: TestimonialCategory): string {
  return categoryLabels[c];
}
