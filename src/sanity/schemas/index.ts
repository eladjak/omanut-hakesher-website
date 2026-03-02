import { siteSettings } from "./siteSettings";
import { about } from "./about";
import { blogPost } from "./blogPost";
import { testimonial } from "./testimonial";
import { service } from "./service";
import { course } from "./course";
import { value } from "./value";
import { methodologyStep } from "./methodologyStep";
import { faqItem } from "./faqItem";
import { credential } from "./credential";

export const schemaTypes = [
  // Singletons
  siteSettings,
  about,
  // Documents
  blogPost,
  testimonial,
  service,
  course,
  value,
  methodologyStep,
  faqItem,
  credential,
];
