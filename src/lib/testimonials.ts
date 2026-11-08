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

export interface TestimonialVideo {
  id: string;
  title: string;
  embed: string;
}

export const testimonials = data.items as TestimonialItem[];
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
