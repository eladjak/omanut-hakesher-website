import "server-only";

import { createHash } from "node:crypto";
import data from "@/generated/public-testimonials.json";
import {
  isApprovedForPublication,
  type ProofPublicationSurface,
} from "@/lib/testimonial-publication-policy";
import type {
  EmailQuote,
  TestimonialItem,
  TestimonialVideo,
  WhatsAppShot,
} from "@/lib/testimonial-types";

export type {
  EmailQuote,
  TestimonialCategory,
  TestimonialItem,
  TestimonialVideo,
  WhatsAppShot,
} from "@/lib/testimonial-types";

// This module imports only a generated public DTO. The historical archive is
// outside `src/`, excluded from deployment, and must never be imported by app
// code. A future approval pipeline may add a fingerprinted record to this DTO
// only after the item-level publication ledger is complete.
const testimonialArchive = data.items as TestimonialItem[];
const emailQuoteArchive = data.quotes as EmailQuote[];
const whatsappArchive = data.whatsapp_screenshots as WhatsAppShot[];
const videoArchive = data.videos as TestimonialVideo[];

function contentSha256(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value), "utf8").digest("hex");
}

export function getPublishedTestimonials(
  surface: ProofPublicationSurface,
): TestimonialItem[] {
  return testimonialArchive.filter((item) =>
    isApprovedForPublication(
      "testimonial",
      item.slug,
      surface,
      contentSha256(item),
      item.assetSha256,
    ),
  );
}

export function getPublishedEmailQuotes(
  surface: ProofPublicationSurface,
): EmailQuote[] {
  return emailQuoteArchive.filter((item) =>
    isApprovedForPublication(
      "email-quote",
      item.id,
      surface,
      contentSha256(item),
    ),
  );
}

export function getPublishedWhatsAppShots(
  surface: ProofPublicationSurface,
): WhatsAppShot[] {
  return whatsappArchive.filter((item) =>
    isApprovedForPublication(
      "whatsapp-screenshot",
      item.id,
      surface,
      contentSha256(item),
      item.assetSha256,
    ),
  );
}

export function getPublishedVideos(
  surface: ProofPublicationSurface,
): TestimonialVideo[] {
  return videoArchive.filter((item) =>
    isApprovedForPublication(
      "video",
      item.id,
      surface,
      contentSha256(item),
      item.assetSha256,
    ),
  );
}

export function getTestimonial(slug: string): TestimonialItem | undefined {
  return getPublishedTestimonials("story-detail").find((item) => item.slug === slug);
}

export function getAllSlugs(): string[] {
  return getPublishedTestimonials("story-detail").map((item) => item.slug);
}
