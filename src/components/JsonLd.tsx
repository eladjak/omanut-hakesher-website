import { CANONICAL_SITE_URL } from "@/lib/site-url";

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "אומנות הקשר",
    description:
      "ספר, תוכנית למידה וליווי לתרגול תקשורת, גבולות, היכרות וקבלת החלטות בקשרים.",
    url: CANONICAL_SITE_URL,
    telephone: "+972512518025",
    email: "omanut-hakesher@eladjak.com",
    areaServed: {
      "@type": "Country",
      name: "Israel",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "דרכים ללמוד ולתרגל",
      itemListElement: [
        {
          "@type": "Course",
          name: "תוכנית הדרך",
          url: `${CANONICAL_SITE_URL}/programs/the-way`,
          description: "מסלול למידה ותרגול בן 12 שבועות ושישה שלבים.",
        },
        {
          "@type": "Book",
          name: "אומנות הקשר",
          url: `${CANONICAL_SITE_URL}/book`,
          inLanguage: "he-IL",
        },
        {
          "@type": "Service",
          name: "ליווי אישי",
          url: `${CANONICAL_SITE_URL}/coaching`,
          description: "ליווי פרטני המבוסס על שיחה, תרגול ומשוב.",
        },
      ],
    },
    founder: {
      "@type": "Person",
      name: "אלעד יעקובוביץ׳",
      url: `${CANONICAL_SITE_URL}/about`,
    },
    sameAs: [
      "https://ohlove.co.il",
      "https://www.facebook.com/groups/mateemlizugiut",
      "https://t.me/MatimLiZugiut",
      "https://open.spotify.com/show/2mXzv3AS0rZw7eTCVjEbyZ",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "אומנות הקשר",
    alternateName: "Omanut HaKesher",
    url: CANONICAL_SITE_URL,
    inLanguage: "he-IL",
    description:
      "ספר, תוכנית למידה, תוכן וליווי לתרגול תקשורת, גבולות, היכרות וקבלת החלטות בקשרים.",
    publisher: {
      "@type": "Organization",
      name: "אומנות הקשר",
      url: CANONICAL_SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "אלעד יעקובוביץ׳",
    url: `${CANONICAL_SITE_URL}/about`,
    jobTitle: "מנחה ויוצר תוכן",
    description:
      "מייסד אומנות הקשר, מנחה ומלווה אישי בתהליכי היכרות, תקשורת ובניית קשר.",
    knowsAbout: [
      "תקשורת בין־אישית",
      "גבולות והסכמה",
      "היכרות ודייטינג",
      "למידה ותרגול בקשרים",
    ],
    worksFor: {
      "@type": "Organization",
      name: "אומנות הקשר",
      url: CANONICAL_SITE_URL,
    },
    sameAs: [
      "https://www.facebook.com/groups/mateemlizugiut",
      "https://t.me/MatimLiZugiut",
      "https://open.spotify.com/show/2mXzv3AS0rZw7eTCVjEbyZ",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebPageJsonLd({
  name,
  description,
  url,
  datePublished = "2026-02-24",
  dateModified,
}: {
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    inLanguage: "he-IL",
    datePublished,
    dateModified: dateModified ?? new Date().toISOString().slice(0, 10),
    isPartOf: {
      "@type": "WebSite",
      name: "אומנות הקשר",
      url: CANONICAL_SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: "תקשורת, היכרות וקבלת החלטות בקשרים",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  category,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  category: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Person",
      name: "אומנות הקשר",
      url: `${CANONICAL_SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "אומנות הקשר",
      url: CANONICAL_SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: category,
    inLanguage: "he",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    // No verified walk-in location or opening hours are published. Keep the
    // contact-page entity accurate instead of inventing LocalBusiness fields.
    "@type": "ProfessionalService",
    name: "אומנות הקשר",
    description:
      "תוכנית למידה, ספר וליווי לתרגול תקשורת, גבולות, היכרות וקבלת החלטות בקשרים.",
    url: CANONICAL_SITE_URL,
    telephone: "+972512518025",
    email: "omanut-hakesher@eladjak.com",
    areaServed: {
      "@type": "Country",
      name: "Israel",
    },
    serviceType: ["תוכנית למידה ותרגול", "ליווי אישי"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function CourseJsonLd({
  courses,
}: {
  courses: {
    title: string;
    description: string;
    lessons: number;
    duration: string;
    level: string;
  }[];
}) {
  const jsonLdItems = courses.map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: "אומנות הקשר",
      url: CANONICAL_SITE_URL,
    },
    educationalLevel: course.level,
    numberOfLessons: course.lessons,
    timeRequired: course.duration,
    inLanguage: "he",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: course.duration,
    },
  }));

  return (
    <>
      {jsonLdItems.map((jsonLd, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}
    </>
  );
}
