import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const files = {
  leadTemplate: "src/components/lead/LeadMagnetTemplate.tsx",
  reasons: "src/app/lead/23-reasons/page.tsx",
  questions: "src/app/lead/36-questions/page.tsx",
  principles: "src/app/lead/7-principles/page.tsx",
  courage: "src/app/lead/courage/page.tsx",
  datingTalks: "src/app/lead/dating-talks/page.tsx",
  vision: "src/app/lead/vision/page.tsx",
  coaching: "src/app/coaching/page.tsx",
  coachingFaq: "src/app/coaching/CoachingFAQ.tsx",
  coachingBook: "src/app/coaching/book/page.tsx",
  coachingVip: "src/app/coaching/vip/page.tsx",
  datingCard: "src/app/products/dating-card/page.tsx",
  podcast: "src/app/podcast/page.tsx",
  club: "src/app/club/page.tsx",
  plus: "src/app/programs/the-way-plus/page.tsx",
  leadRegistry: "src/lib/lead-magnets.ts",
  publicTestimonials: "src/generated/public-testimonials.json",
};

const baseline = Object.fromEntries(
  Object.entries(files).map(([key, relativePath]) => [
    key,
    fs.readFileSync(path.join(root, relativePath), "utf8"),
  ]),
);

function requireText(source, needle, label) {
  if (!source.includes(needle)) throw new Error(`${label}: missing ${JSON.stringify(needle)}`);
}

function forbidText(source, needle, label) {
  if (source.includes(needle)) throw new Error(`${label}: forbidden ${JSON.stringify(needle)}`);
}

function validate(source = baseline) {
  requireText(source.leadTemplate, "שלושה צעדים שהופכים קריאה לתרגול", "lead use loop");
  requireText(source.leadTemplate, "תרגיל שאפשר לנסות עכשיו", "lead immediate value");
  requireText(source.leadTemplate, "מה מתאים אחרי המדריך?", "lead next-step choice");
  requireText(source.leadTemplate, "!isDeliverable", "lead delivery fail-closed");
  requireText(source.leadTemplate, "אין צורך להשאיר אימייל או להצטרף לרשימת דיוור", "direct guide access");
  requireText(source.leadTemplate, "href={assetUrl}", "direct guide asset link");
  forbidText(source.leadTemplate, 'fetch("/api/lead/subscribe"', "lead pages collect no contact data");
  forbidText(source.leadTemplate, 'name="email"', "lead pages render no email field");
  forbidText(source.leadTemplate, "blurTeaser", "lead no gated teaser API");
  forbidText(source.leadTemplate, "blur-sm", "lead no blurred bait");

  for (const key of ["reasons", "questions", "principles", "courage", "datingTalks", "vision"]) {
    requireText(source[key], "practicePrompt", `${key} has an immediate exercise`);
    requireText(source[key], "LeadMagnetTemplate", `${key} uses the shared accessible delivery flow`);
  }
  for (const key of ["reasons", "questions", "principles"]) {
    forbidText(source[key], "fetch(\"/api/lead/subscribe\"", `${key} has no duplicate delivery code`);
  }
  requireText(source.leadRegistry, "'23-reasons':", "lead registry reasons");
  requireText(source.leadRegistry, "'36-questions':", "lead registry questions");
  requireText(source.leadRegistry, "'7-principles':", "lead registry principles");

  requireText(source.coaching, "לא חייבים להתחיל בליווי", "coaching choice support");
  requireText(source.coaching, "ארבע עדשות", "coaching learning loop");
  requireText(source.coaching, 'getPublishedVideos("coaching")', "coaching verified video source");
  const publicTestimonials = JSON.parse(source.publicTestimonials);
  if (!Array.isArray(publicTestimonials.videos)) {
    throw new Error("public testimonial DTO: videos must be an array");
  }
  for (const video of publicTestimonials.videos) {
    if (
      typeof video.embed !== "string" ||
      !/^https:\/\/www\.youtube-nocookie\.com\/embed\/[A-Za-z0-9_-]{11}$/.test(video.embed)
    ) {
      throw new Error(`coaching privacy-enhanced video: invalid embed ${JSON.stringify(video.embed)}`);
    }
  }
  requireText(source.coachingFaq, "אין מחיר מאושר שמוצג בעמוד", "coaching price truth");
  requireText(source.coachingBook, "מה כדאי לברר בשיחה", "booking agenda");
  requireText(source.coachingVip, "ארבעה דברים שצריכים להופיע בהצעה", "VIP proposal checklist");
  requireText(source.club, "בדיקת התאמה בשתי דקות", "club fit guide");
  requireText(source.datingCard, "תרגיל של דקה", "dating card immediate exercise");
  requireText(source.datingCard, "בתכנון · עדיין לא נמסר", "dating card planned resources truth label");
  requireText(source.datingCard, "עדיין אינם חלק זמין מן השירות", "dating card resources are not promised");
  if ((source.datingCard.match(/<Badge variant="secondary" className="mb-4">מתוכנן<\/Badge>/g) ?? []).length !== 1) {
    throw new Error("dating card planned resources: every rendered resource card must inherit the planned badge");
  }
  requireText(source.plus, "התוכנית הבסיסית או המסלול המשולב?", "plus comparison");
  requireText(source.podcast, "איך להפיק יותר", "podcast listening method");
  requireText(source.podcast, "אלה מסלולי הקשבה, לא רשימת פרקים מאומתת", "podcast truth label");

  for (const key of ["club", "datingCard", "plus"]) {
    forbidText(source[key], "CheckoutForm", `${key} checkout remains off`);
    forbidText(source[key], "formatILS", `${key} has no stale price presentation`);
  }

  const combined = Object.values(source).join("\n");
  for (const phrase of [
    "blur-sm",
    "מוריד 80%",
    "הטעות שכל גבר/אישה",
    "הזוגיות שמגיעה לך לא תדפוק בדלת",
    "₪6,000",
    "₪50,000",
  ]) {
    forbidText(combined, phrase, "detail-page guardrail");
  }
}

validate();

const negativeControls = [
  () => ({ ...baseline, leadTemplate: baseline.leadTemplate.replace("תרגיל שאפשר לנסות עכשיו", "תרגיל") }),
  () => ({ ...baseline, leadTemplate: `${baseline.leadTemplate}\n// blur-sm` }),
  () => ({ ...baseline, leadTemplate: `${baseline.leadTemplate}\n<input name="email" />` }),
  () => ({ ...baseline, club: `${baseline.club}\n// CheckoutForm` }),
  () => ({ ...baseline, coaching: baseline.coaching.replace("לא חייבים להתחיל בליווי", "ליווי") }),
  () => ({
    ...baseline,
    datingCard: baseline.datingCard.replace("בתכנון · עדיין לא נמסר", "משאבים נלווים"),
  }),
  () => ({
    ...baseline,
    datingCard: baseline.datingCard.replace("עדיין אינם חלק זמין מן השירות", "כלולים בשירות"),
  }),
  () => ({
    ...baseline,
    publicTestimonials: JSON.stringify({
      ...JSON.parse(baseline.publicTestimonials),
      videos: [{ embed: "https://www.youtube.com/embed/Kbd7BRJ25TM" }],
    }),
  }),
  () => ({
    ...baseline,
    publicTestimonials: JSON.stringify({
      ...JSON.parse(baseline.publicTestimonials),
      videos: [{ embed: "https://video.example/embed/Kbd7BRJ25TM" }],
    }),
  }),
  () => ({
    ...baseline,
    publicTestimonials: JSON.stringify({
      ...JSON.parse(baseline.publicTestimonials),
      videos: [
        {
          embed:
            "https://www.youtube-nocookie.com/embed/Kbd7BRJ25TM/preview?autoplay=1",
        },
      ],
    }),
  }),
];

for (const [index, makeBrokenSource] of negativeControls.entries()) {
  let failed = false;
  try {
    validate(makeBrokenSource());
  } catch {
    failed = true;
  }
  if (!failed) throw new Error(`negative control ${index + 1} did not fail`);
}

console.log(`Detail pages growth contract: PASS (${Object.keys(files).length - 2} implementation files)`);
console.log(`Negative controls: PASS (${negativeControls.length})`);
