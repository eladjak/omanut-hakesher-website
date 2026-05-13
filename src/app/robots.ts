import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://omanut-hakesher-website.vercel.app";

// AI / LLM crawlers we explicitly welcome so the brand is discoverable
// inside ChatGPT, Claude, Perplexity, Gemini and others.
const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "CCBot",
  "Applebot-Extended",
  "cohere-ai",
  "Bytespider",
  "Amazonbot",
  "Meta-ExternalAgent",
  "FacebookBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio/"],
      },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/studio/"],
      })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
