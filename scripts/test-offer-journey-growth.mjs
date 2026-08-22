import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (relativePath) =>
  readFile(new URL(`../${relativePath}`, import.meta.url), "utf8");

const [
  journey,
  resources,
  products,
  programs,
  services,
  book,
  contentReview,
  header,
  footer,
  facts,
  lead,
  homeTrust,
] = await Promise.all([
  read("src/components/OfferJourney.tsx"),
  read("src/app/resources/page.tsx"),
  read("src/app/products/page.tsx"),
  read("src/app/programs/page.tsx"),
  read("src/app/services/page.tsx"),
  read("src/app/book/page.tsx"),
  read("src/app/content/page.tsx"),
  read("src/components/Header.tsx"),
  read("src/components/Footer.tsx"),
  read("src/lib/product-facts.ts"),
  read("src/app/lead/page.tsx"),
  read("src/components/HomeTestimonials.tsx"),
]);

function validateOfferJourney(sources) {
  const issues = [];
  const add = (condition, message) => {
    if (!condition) issues.push(message);
  };

  const journeyIds = [...sources.journey.matchAll(/id:\s*"(resources|book|program|guidance)"\s+as const/g)]
    .map((match) => match[1]);
  add(
    JSON.stringify(journeyIds) === JSON.stringify(["resources", "book", "program", "guidance"]),
    "journey-must-have-four-ordered-commitment-levels",
  );
  for (const href of ["/resources", "/book", "/programs/the-way", "/services"]) {
    add(sources.journey.includes(`href: "${href}"`), `journey-missing-link:${href}`);
  }
  for (const availability of [
    "זמין עכשיו — בלי הרשמה",
    "הרכישה אינה פתוחה באתר",
    "ההצטרפות אינה פתוחה באתר",
    "פנייה אינה הרשמה או חיוב",
  ]) {
    add(sources.journey.includes(availability), `journey-missing-availability:${availability}`);
  }
  for (const fact of [
    "PRODUCT_FACTS.book.parts",
    "PRODUCT_FACTS.book.chapters",
    "PRODUCT_FACTS.book.numberedExercises",
    "PRODUCT_FACTS.course.weeks",
    "PRODUCT_FACTS.course.phases",
    "PRODUCT_FACTS.course.lmsMappedLessons",
    "PRODUCT_FACTS.course.practicePdfs",
  ]) {
    add(sources.journey.includes(fact), `journey-missing-canonical-fact:${fact}`);
  }

  add(!/redirect\(/.test(sources.resources), "resources-must-be-a-public-hub-not-a-redirect");
  add(/href="\/blog"/.test(sources.resources), "resources-must-link-to-blog");
  add(/href="\/podcast"/.test(sources.resources), "resources-must-link-to-podcast");
  add(/href="\/lead"/.test(sources.resources), "resources-must-link-to-open-guides");
  add(/href:\s*"\/book"/.test(sources.resources), "resources-must-link-to-book");
  add(/current="resources"/.test(sources.resources), "resources-must-mark-first-journey-step");

  add(!/redirect\(/.test(sources.products), "products-must-be-a-choice-page-not-a-redirect");
  add(/productChoices/.test(sources.products), "products-must-render-decision-support");
  add(/getProduct\("dating-card"\)/.test(sources.products), "products-must-link-the-focused-profile-service");
  add(!/formatILS|anchorAmount|displayPrice/.test(sources.products), "products-hub-must-not-publish-unverified-pricing");

  const phaseNumbers = [...sources.programs.matchAll(/number:\s*"(0[1-6])"/g)].map((match) => match[1]);
  add(
    JSON.stringify(phaseNumbers) === JSON.stringify(["01", "02", "03", "04", "05", "06"]),
    "programs-must-show-six-canonical-phases",
  );
  add(/current="program"/.test(sources.programs), "programs-must-mark-structured-program-step");
  add(
    !/love-event|club-90d|formatILS|VIP ·|חינמי הראשון/.test(sources.programs),
    "programs-index-must-not-mix-unverified-offers-or-price-framing",
  );

  add(!/redirect\(/.test(sources.services), "services-must-be-a-choice-page-not-a-redirect");
  for (const href of ["/programs/the-way", "/coaching", "/contact"]) {
    add(sources.services.includes(href), `services-missing-route:${href}`);
  }
  add(
    /getProduct\("dating-card"\)/.test(sources.services) && /href:\s*datingCard\.path/.test(sources.services),
    "services-missing-route:/products/dating-card",
  );
  add(/current="guidance"/.test(sources.services), "services-must-mark-guidance-step");

  add(/current="book"/.test(sources.book), "book-must-mark-independent-learning-step");
  add(
    /PRODUCT_FACTS\.commerce\.onlineCheckoutAvailable/.test(sources.book),
    "book-must-render-truthful-checkout-status",
  );
  add(!/SumitCheckoutButton|book-preorder|displayPrice|₪89/.test(sources.book), "book-must-not-offer-disabled-preorder");
  add(!/href=\{`\/book\/\$\{chapter\.slug\}`\}/.test(sources.book), "book-outline-must-not-link-into-protected-chapters");
  add(!/מאות אנשים|שעובדת\s*-|מצאו את הזוגיות|סיפורי חיים אמיתיים/.test(sources.book), "book-must-not-use-unverified-proof-or-outcome-copy");

  add(/כניסה לצוות התוכן/.test(sources.contentReview), "content-review-must-explain-private-entry");
  add(/אין כרגע טיוטות בתור/.test(sources.contentReview), "content-review-must-have-empty-queue-state");
  add(/הצגת כל הטיוטות/.test(sources.contentReview), "content-review-filter-empty-state-must-be-recoverable");

  const headerSequence = ["/resources", "/book", "/programs", "/products", "/services"]
    .map((href) => sources.header.indexOf(`href: "${href}"`));
  add(headerSequence.every((index) => index >= 0), "header-must-link-all-offer-hubs");
  add(headerSequence.every((index, position) => position === 0 || index > headerSequence[position - 1]), "header-must-follow-offer-journey-order");
  add(/<Link href="\/resources">מאיפה מתחילים\?/.test(sources.header), "header-cta-must-start-with-resources");
  for (const href of ["/resources", "/book", "/programs", "/products", "/services"]) {
    add(sources.footer.includes(`href: "${href}"`), `footer-missing-offer-hub:${href}`);
  }

  const publicSources = [sources.journey, sources.resources, sources.products, sources.programs, sources.services, sources.book].join("\n");
  add(!/href="\/content"/.test(publicSources), "public-offer-pages-must-not-link-to-private-content-review");
  add(/phases:\s*6/.test(sources.facts), "canonical-course-phase-count-must-remain-six");
  add(/שלושת המדריכים בעמוד הזה זמינים לקריאה ישירה/.test(sources.lead), "lead-hub-must-promise-only-directly-open-guides");
  add(!/NewsletterForm|type="email"|\/api\/lead\/subscribe/.test(sources.lead), "lead-hub-must-not-collect-contact-data");
  add(/data-proof-substitute="verification-path"/.test(sources.homeTrust), "homepage-must-offer-inspectable-trust-path");
  add(/href:\s*"\/lead"/.test(sources.homeTrust), "homepage-trust-path-must-link-open-guides");

  return issues;
}

const sources = { journey, resources, products, programs, services, book, contentReview, header, footer, facts, lead, homeTrust };
assert.deepEqual(validateOfferJourney(sources), []);

assert.ok(
  validateOfferJourney({
    ...sources,
    journey: journey.replace('id: "guidance" as const', 'id: "program" as const'),
  }).includes("journey-must-have-four-ordered-commitment-levels"),
);
assert.ok(
  validateOfferJourney({ ...sources, resources: 'import { redirect } from "next/navigation"; redirect("/blog");' })
    .includes("resources-must-be-a-public-hub-not-a-redirect"),
);
assert.ok(
  validateOfferJourney({ ...sources, book: `${book}\n<SumitCheckoutButton displayPrice="₪89" />` })
    .includes("book-must-not-offer-disabled-preorder"),
);
assert.ok(
  validateOfferJourney({ ...sources, lead: `${lead}\n<input type="email" />` })
    .includes("lead-hub-must-not-collect-contact-data"),
);

console.log("Website offer journey source contracts: PASS");
