import { defineQuery } from "next-sanity";

// Site Settings singleton
export const siteSettingsQuery = defineQuery(
  `*[_type == "siteSettings"][0]{
    siteName,
    tagline,
    description,
    heroTitle,
    heroSubtitle,
    heroDescription,
    heroBadge,
    heroCta1Text,
    heroCta2Text,
    stats,
    contactEmail,
    contactPhone,
    whatsappNumber,
    facebookUrl,
    instagramUrl,
    logo,
    ogImage
  }`,
);

// About singleton
export const aboutQuery = defineQuery(
  `*[_type == "about"][0]{
    name,
    title,
    photo,
    storyParagraphs,
    credentials
  }`,
);

// Blog Posts
export const blogPostsQuery = defineQuery(
  `*[_type == "blogPost"] | order(_createdAt desc){
    title,
    slug,
    excerpt,
    content,
    category,
    publishedAt,
    readTime,
    featuredImage,
    featured
  }`,
);

export const blogPostBySlugQuery = defineQuery(
  `*[_type == "blogPost" && slug.current == $slug][0]{
    title,
    slug,
    excerpt,
    content,
    category,
    publishedAt,
    readTime,
    featuredImage,
    featured
  }`,
);

export const blogPostSlugsQuery = defineQuery(
  `*[_type == "blogPost"].slug.current`,
);

// Services
export const servicesQuery = defineQuery(
  `*[_type == "service"] | order(order asc){
    serviceId,
    title,
    shortDescription,
    fullDescription,
    whoIsItFor,
    features,
    duration,
    format,
    pricing,
    iconName,
    color,
    order
  }`,
);

// Testimonials
export const testimonialsQuery = defineQuery(
  `*[_type == "testimonial"] | order(order asc){
    quote,
    author,
    context,
    rating,
    photo,
    featured,
    order
  }`,
);

// Courses
export const coursesQuery = defineQuery(
  `*[_type == "course"] | order(order asc){
    title,
    description,
    lessons,
    duration,
    level,
    order
  }`,
);

// Values
export const valuesQuery = defineQuery(
  `*[_type == "value"] | order(order asc){
    title,
    description,
    iconName,
    color,
    order
  }`,
);

// Methodology Steps
export const methodologyStepsQuery = defineQuery(
  `*[_type == "methodologyStep"] | order(step asc){
    step,
    title,
    description,
    iconName
  }`,
);

// FAQ Items
export const faqItemsQuery = defineQuery(
  `*[_type == "faqItem"] | order(order asc){
    question,
    answer,
    category,
    order
  }`,
);

// Credentials
export const credentialsQuery = defineQuery(
  `*[_type == "credential"] | order(order asc){
    year,
    title,
    description,
    order
  }`,
);
