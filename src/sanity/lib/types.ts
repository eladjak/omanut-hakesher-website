// Type adapters: convert Sanity query results to component-friendly interfaces

export interface SiteSettingsData {
  siteName: string | null;
  tagline: string | null;
  description: string | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroDescription: string | null;
  heroBadge: string | null;
  heroCta1Text: string | null;
  heroCta2Text: string | null;
  stats: Array<{ number: string; label: string }> | null;
  contactEmail: string | null;
  contactPhone: string | null;
  whatsappNumber: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
}

export interface AboutData {
  name: string | null;
  title: string | null;
  storyParagraphs: string[] | null;
  credentials: string[] | null;
}

export interface BlogPostData {
  title: string;
  slug: { current: string };
  excerpt: string | null;
  content: string | null;
  category: string | null;
  publishedAt: string | null;
  readTime: string | null;
  featured: boolean | null;
}

export interface TestimonialData {
  quote: string;
  author: string;
  context: string | null;
  rating: number | null;
  featured: boolean | null;
  order: number | null;
}

export interface ServiceData {
  serviceId: string;
  title: string;
  shortDescription: string | null;
  fullDescription: string | null;
  whoIsItFor: string | null;
  features: string[] | null;
  duration: string | null;
  format: string | null;
  pricing: string | null;
  iconName: string | null;
  color: string | null;
  order: number | null;
}

export interface CourseData {
  title: string;
  description: string | null;
  lessons: number | null;
  duration: string | null;
  level: string | null;
  order: number | null;
}

export interface ValueData {
  title: string;
  description: string | null;
  iconName: string | null;
  color: string | null;
  order: number | null;
}

export interface MethodologyStepData {
  step: number;
  title: string;
  description: string | null;
  iconName: string | null;
}

export interface FaqItemData {
  question: string;
  answer: string;
  category: string | null;
  order: number | null;
}

export interface CredentialData {
  year: string;
  title: string;
  description: string | null;
  order: number | null;
}
