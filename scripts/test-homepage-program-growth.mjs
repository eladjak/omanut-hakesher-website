import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (relativePath) =>
  readFile(new URL(`../${relativePath}`, import.meta.url), "utf8");

const [
  homeSource,
  programSource,
  factsSource,
  faqSource,
  testimonialsSource,
  workshopSource,
  jsonLdSource,
  layoutSource,
  welcomeSource,
  phaseVisualsSource,
] = await Promise.all([
  read("src/app/page.tsx"),
  read("src/app/programs/the-way/page.tsx"),
  read("src/lib/product-facts.ts"),
  read("src/components/CourseFAQ.tsx"),
  read("src/components/HomeTestimonials.tsx"),
  read("src/components/FreeWorkshopBanner.tsx"),
  read("src/components/JsonLd.tsx"),
  read("src/app/layout.tsx"),
  read("src/components/WelcomeModal.tsx"),
  read("src/generated/course-phase-illustrations.ts"),
]);

function validateGrowthContracts(sources) {
  const issues = [];
  const add = (condition, message) => {
    if (!condition) issues.push(message);
  };
  const expectedPhaseNumbers = ["01", "02", "03", "04", "05", "06"];
  const homePhaseNumbers = [...sources.home.matchAll(/step:\s*"(0[1-6])"/g)].map(
    (match) => match[1],
  );
  const programPhaseNumbers = [...sources.program.matchAll(/num:\s*"(0[1-6])"/g)].map(
    (match) => match[1],
  );
  const legacyGuardedTestimonials =
    /VERIFIED_HOMEPAGE_PUBLICATION_APPROVAL(?:\s*:\s*boolean)?\s*=\s*false/.test(
      sources.testimonials,
    ) &&
    /if \(!VERIFIED_HOMEPAGE_PUBLICATION_APPROVAL[^)]*\)\s*(?:\{\s*)?return null;/.test(
      sources.testimonials,
    );
  const unconditionalFailClosedTestimonials =
    /export function HomeTestimonials\(\)\s*\{\s*return null;\s*\}/.test(
      sources.testimonials,
    ) &&
    !/@\/lib\/testimonials|public-testimonials|getPublishedTestimonials|getPublishedVideos|TestimonialCard/.test(
      sources.testimonials,
    );
  const inspectableProofSubstitute =
    /data-proof-substitute="verification-path"/.test(sources.testimonials) &&
    /עדויות אינם מוצגים בלי אימות מקור והסכמה לפרסום/.test(sources.testimonials) &&
    /number:\s*"בדיקה א׳"/.test(sources.testimonials) &&
    !/@\/lib\/testimonials|testimonial-proof-archive|\b(?:quote|author|short_quote|full_text)\s*:/.test(
      sources.testimonials,
    );

  add(/phases:\s*6/.test(sources.facts), "course-phases-must-be-six");
  add(/practicePdfs:\s*8/.test(sources.facts), "practice-pdfs-must-be-eight");
  add(
    JSON.stringify(homePhaseNumbers) === JSON.stringify(expectedPhaseNumbers),
    "homepage-must-render-six-canonical-phases",
  );
  add(
    /href="\/resources"[\s\S]{0,400}להתחיל ממשאב פתוח/.test(sources.home),
    "homepage-primary-cta-must-lead-to-open-value",
  );
  add(
    /href="\/book"[\s\S]{0,400}להכיר את הספר/.test(sources.home),
    "homepage-secondary-cta-must-offer-book",
  );
  const journeyOrder = [
    'href: "/resources"',
    'href: "/book"',
    'href: "/products/dating-card"',
    'href: "/programs/the-way"',
    'href: "/coaching"',
    'href: "/community"',
  ].map((needle) => sources.home.indexOf(needle));
  add(
    journeyOrder.every((index) => index >= 0) &&
      journeyOrder.every((index, position) => position === 0 || index > journeyOrder[position - 1]),
    "homepage-journey-must-progress-from-free-value-to-continuation",
  );
  add(
    /הספר ״אומנות הקשר״ \+ Book Companion/.test(sources.home) &&
      /קהילה וסימולטור כהמשך/.test(sources.home),
    "homepage-journey-must-connect-companion-and-continuation",
  );
  add(
    !/הדרך\s*<span[^>]*>שלך<\/span>\s*לזוגיות/.test(sources.home),
    "homepage-must-not-frame-a-deterministic-personal-path-to-relationship",
  );
  add(
    /Aron[\s\S]{0,260}לא הוכיח/.test(sources.home) &&
      /התוכנית עצמה אינה טיפול EFT/.test(sources.home) &&
      /אינה מאפשרת לאבחן קשר או לנבא/.test(sources.home),
    "research-cards-must-state-their-scope",
  );
  add(
    legacyGuardedTestimonials || unconditionalFailClosedTestimonials || inspectableProofSubstitute,
    "unapproved-homepage-testimonials-must-stay-hidden-or-be-replaced-with-inspectable-evidence",
  );
  add(
    JSON.stringify(programPhaseNumbers) === JSON.stringify(expectedPhaseNumbers),
    "program-page-must-render-six-canonical-phases",
  );
  add(
    /COURSE_PHASE_ILLUSTRATIONS/.test(sources.program) &&
      (sources.phaseVisuals.match(/"phase": [1-6]/g) ?? []).length === 6 &&
      /stage-5-intimacy\.jpg/.test(sources.phaseVisuals) &&
      /stage-6-commitment\.jpg/.test(sources.phaseVisuals),
    "program-page-must-use-six-generated-phase-visuals",
  );
  add(
    /weeklyRhythm[\s\S]*לומדים רעיון אחד[\s\S]*בוחרים תרגול[\s\S]*עוצרים להתבונן[\s\S]*ממשיכים בצעד קטן/.test(
      sources.program,
    ),
    "program-page-must-explain-the-weekly-learning-loop",
  );
  add(
    (sources.program.match(/href="\/resources"/g) ?? []).length >= 2 &&
      !/href="\/content"/.test(sources.program),
    "program-sampling-ctas-must-use-the-public-resources-hub",
  );
  add(
    /PRODUCT_FACTS\.course\.lmsMappedLessons/.test(sources.program) &&
      /PRODUCT_FACTS\.course\.practicePdfs/.test(sources.program),
    "program-page-must-use-central-product-facts",
  );
  add(
    /הצטרפות מקוונת אינה פתוחה כרגע/.test(sources.faq),
    "faq-must-state-current-enrollment-status",
  );
  add(
    /המועד הבא עדיין לא נקבע/.test(sources.workshop) &&
      /תאריך, שעה, מחיר, מתכונת/.test(sources.workshop),
    "workshop-banner-must-set-useful-expectations",
  );
  add(
    /hasOfferCatalog/.test(sources.jsonLd) &&
      /מסלול למידה ותרגול בן 12 שבועות ושישה שלבים/.test(sources.jsonLd),
    "structured-data-must-describe-the-real-product-ladder",
  );
  add(
    !/FaqJsonLd/.test(sources.layout) && !/FAQPage/.test(sources.jsonLd),
    "global-pages-must-not-emit-invisible-faq-schema",
  );
  add(
    !/openingHoursSpecification|GeoCoordinates|priceRange/.test(sources.jsonLd),
    "structured-data-must-not-invent-location-hours-or-price-range",
  );
  add(
    /איך נוח לך שהאתר יפנה אליך/.test(sources.welcome) &&
      /הבחירה משנה רק את לשון הפנייה/.test(sources.welcome) &&
      /ניסוח ניטרלי/.test(sources.welcome),
    "first-visit-dialog-must-explain-the-choice-and-offer-neutral-language",
  );
  add(
    !/מחפש(?:ת)? זוגיות/.test(sources.welcome),
    "first-visit-dialog-must-not-assume-relationship-status-or-goal",
  );

  const forbidden = [
    /בחמישה שלבים/,
    /מבנה הקורס — 5 שלבים/,
    /בין 3-6 חודשים/,
    /בין 3–6 חודשים/,
    /תוצאות מיטביות/,
    /הזוגיות שמגיעה לך/,
    /בית הספר למציאת זוגיות/,
    /לא עוד.*פסיכולוג/,
  ];
  const combined = [sources.home, sources.program, sources.faq].join("\n");
  for (const pattern of forbidden) {
    add(!pattern.test(combined), `forbidden-growth-copy:${pattern.source}`);
  }

  return issues;
}

const sources = {
  home: homeSource,
  program: programSource,
  facts: factsSource,
  faq: faqSource,
  testimonials: testimonialsSource,
  workshop: workshopSource,
  jsonLd: jsonLdSource,
  layout: layoutSource,
  welcome: welcomeSource,
  phaseVisuals: phaseVisualsSource,
};

assert.deepEqual(validateGrowthContracts(sources), []);

// Negative controls prove that the checker rejects the two highest-drift
// product contracts instead of merely passing the current source by accident.
assert.ok(
  validateGrowthContracts({
    ...sources,
    facts: factsSource.replace(/phases:\s*6/, "phases: 5"),
  }).includes("course-phases-must-be-six"),
);
assert.ok(
  validateGrowthContracts({
    ...sources,
    home: homeSource.replace('href: "/resources"', 'href: "/community"'),
  }).includes("homepage-journey-must-progress-from-free-value-to-continuation"),
);
assert.ok(
  validateGrowthContracts({
    ...sources,
    home: homeSource.replace(
      'מסע שאפשר להיכנס אליו <span className="text-primary">מהמקום שלך</span>',
      'הדרך <span className="text-primary">שלך</span> לזוגיות',
    ),
  }).includes("homepage-must-not-frame-a-deterministic-personal-path-to-relationship"),
);
assert.ok(
  validateGrowthContracts({
    ...sources,
    program: programSource.replace(/num:\s*"06"/, 'num: "05"'),
  }).includes("program-page-must-render-six-canonical-phases"),
);
assert.ok(
  validateGrowthContracts({
    ...sources,
    testimonials:
      'import { getPublishedTestimonials } from "@/lib/testimonials";\nexport function HomeTestimonials() { return <section>Published proof</section>; }',
  }).includes("unapproved-homepage-testimonials-must-stay-hidden-or-be-replaced-with-inspectable-evidence"),
);

console.log("Homepage and program growth contracts: PASS");
