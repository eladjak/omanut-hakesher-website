import { CANONICAL_SITE_URL } from "@/lib/site-url";

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "אומנות הקשר",
    description:
      "תוכנית, ספר וליווי מעשי לרווקים ולרווקות שרוצים לפתח יכולת ליצור ולבנות קשר.",
    url: CANONICAL_SITE_URL,
    telephone: "+972512518025",
    email: "omanut-hakesher@eladjak.com",
    areaServed: {
      "@type": "Country",
      name: "Israel",
    },
    serviceType: [
      "ליווי אישי למציאת זוגיות",
      "קורס דייטינג",
      "מנטורינג זוגיות",
      "ייעוץ אונליין",
    ],
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
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
    alternateName: "אומנות הקשר - בית הספר למציאת זוגיות",
    url: CANONICAL_SITE_URL,
    inLanguage: "he-IL",
    description:
      "בית הספר למציאת זוגיות מאושרת עם אלעד יעקובוביץ׳. תוכנית ״הדרך״, ליווי אישי, הספר ״אומנות הקשר״ וקהילה תומכת.",
    publisher: {
      "@type": "Organization",
      name: "אומנות הקשר",
      url: CANONICAL_SITE_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${CANONICAL_SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
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
    jobTitle: "מנחה ומלווה אישי לזוגיות",
    description:
      "מייסד אומנות הקשר, מנחה ומלווה אישי בתהליכי היכרות, תקשורת ובניית קשר.",
    knowsAbout: [
      "מציאת זוגיות",
      "תקשורת מקרבת",
      "ליווי אישי לרווקים",
      "דייטינג",
      "אינטימיות ופגיעות",
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
      name: "מציאת זוגיות וליווי אישי",
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
    "@type": "LocalBusiness",
    name: "אומנות הקשר",
    description:
      "תוכנית, ספר וליווי מעשי לרווקים ולרווקות שרוצים לפתח יכולת ליצור ולבנות קשר.",
    url: CANONICAL_SITE_URL,
    telephone: "+972512518025",
    email: "omanut-hakesher@eladjak.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "מרכז הארץ",
      addressCountry: "IL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "32.0853",
      longitude: "34.7818",
    },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    // TODO: Replace with real social media profiles
    // sameAs: [
    //   "https://facebook.com/omanut-hakesher",
    //   "https://instagram.com/omanut_hakesher",
    // ],
    // TODO: Add real aggregate rating when reviews are collected
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "מהי הגישה של אומנות הקשר?",
    answer:
      "הגישה מחברת תרגול של הקשבה, צרכים, גבולות, היכרות ודייטים עם כלים מעולמות התקשורת וההתבוננות העצמית. היא מיועדת ללמידה ולתרגול ואינה תחליף לטיפול נפשי או רפואי.",
  },
  {
    question: "כמה זמן נמשך תהליך הליווי הזוגי?",
    answer:
      "משך התהליך משתנה לפי הצרכים והמטרות. תהליך ממוקד נמשך כ-6 עד 10 מפגשים, ותהליך עמוק יותר 3 עד 6 חודשים. כבר מהמפגשים הראשונים מקבלים כלים מעשיים שאפשר ליישם מיד.",
  },
  {
    question: "מה קורה בשיחת ההיכרות הראשונה?",
    answer:
      "שיחת ההיכרות היא הזדמנות להכיר, להבין את הצרכים שלך ולבדוק התאמה. משוחחים על מה שהביא אותך ועל המטרות, ואלעד מסביר על דרך העבודה. השיחה ללא התחייבות ובסיומה אתה מחליט אם ואיך להמשיך.",
  },
  {
    question: "אפשר להגיע לליווי לבד, בלי בן או בת זוג?",
    answer:
      "בהחלט. הליווי האישי מיועד בדיוק לזה - עבודה אישית על דפוסי תקשורת, הכנה לזוגיות והתמודדות עם מצבים אישיים. לעיתים העבודה האישית היא הצעד הראשון שמוביל לשינוי גם בזוגיות.",
  },
  {
    question: "מה ההבדל בין תוכנית ״הדרך״ לליווי האישי?",
    answer:
      "תוכנית ״הדרך״ היא מסלול מובנה של 12 שבועות עם שיעורים קצרים, תרגילים וקהילה. הליווי האישי הוא תהליך פרטני ומותאם עם מפגשים, תרגול ומשוב. אף מסלול אינו יכול להבטיח מועד שבו יתחיל קשר.",
  },
  {
    question: "האם המפגשים אונליין יעילים כמו מפגשים פרונטליים?",
    answer:
      "מחקרים מראים שליווי מקוון יעיל באותה מידה כמו פרונטלי. המפגשים אונליין מציעים נוחות, גמישות בזמנים וחיסכון בנסיעות, בסביבה מאובטחת ופרטית.",
  },
  {
    question: "האם יש סודיות מלאה בתהליך?",
    answer:
      "סודיות היא ערך עליון. כל מה שנאמר במפגשים נשאר חסוי לחלוטין בהתאם לכללי האתיקה המקצועיים, ולא משותף עם גורם שלישי ללא הסכמתך המפורשת.",
  },
  {
    question: "איך אדע שזה הזמן הנכון לפנות לליווי?",
    answer:
      "אין זמן ״מושלם״. בין אם אתה תקוע בדייטים שלא מובילים לכלום, מרגיש שמשהו חוסם אותך מזוגיות, או מתכונן לשלב חדש - זה תמיד זמן טוב להשקיע בעצמך ובקשרים שלך. הצעד הראשון הוא הקשה ביותר, אבל גם החשוב ביותר.",
  },
];

export function FaqJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
