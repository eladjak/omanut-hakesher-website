const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://omanut-hakesher-website.vercel.app";

const SAME_AS = [
  "https://www.facebook.com/groups/mateemlizugiut",
  "https://t.me/MatimLiZugiut",
  "https://open.spotify.com/show/2mXzv3AS0rZw7eTCVjEbyZ",
  "https://soundcloud.com/ohlovelive",
];

function jsonScript(data: unknown) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return jsonScript({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "אומנות הקשר",
    alternateName: "Omanut HaKesher",
    description:
      "ליווי מקצועי לרווקים ורווקות בדרך לזוגיות מאושרת. 461 זוגות כבר מצאו אהבה עם אלעד יעקובוביץ׳.",
    url: SITE_URL,
    image: `${SITE_URL}/assets/brand/facebook-profile.jpg`,
    logo: `${SITE_URL}/assets/brand/facebook-profile.jpg`,
    telephone: "+972512518025",
    email: "hello@eladjak.com",
    founder: {
      "@type": "Person",
      name: "אלעד יעקובוביץ׳",
      url: `${SITE_URL}/about`,
    },
    areaServed: { "@type": "Country", name: "Israel" },
    serviceType: [
      "ליווי אישי למציאת זוגיות",
      "קורס דייטינג",
      "מנטורינג זוגיות",
      "ייעוץ אונליין",
    ],
    priceRange: "₪₪",
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
    sameAs: SAME_AS,
  });
}

export function PersonJsonLd() {
  return jsonScript({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "אלעד יעקובוביץ׳",
    alternateName: "Elad Yaakobovitz",
    jobTitle: "מנטור זוגיות",
    description:
      "מנטור זוגיות, NLP מוסמך, CBT, קואצ׳ יהודי. ~20 שנות רקע בתחום הבמה. ליווה 461 זוגות בדרך לזוגיות מאושרת.",
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/assets/brand/facebook-profile.jpg`,
    worksFor: {
      "@type": "Organization",
      name: "אומנות הקשר",
      url: SITE_URL,
    },
    knowsAbout: [
      "זוגיות",
      "דייטינג",
      "תקשורת בין-אישית",
      "NLP",
      "CBT",
      "דמיון מודרך",
    ],
    sameAs: SAME_AS,
  });
}

export function WebSiteJsonLd() {
  return jsonScript({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "אומנות הקשר",
    alternateName: "Omanut HaKesher",
    url: SITE_URL,
    inLanguage: "he-IL",
    publisher: {
      "@type": "Organization",
      name: "אומנות הקשר",
      url: SITE_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  });
}

export function FAQPageJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return jsonScript({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  });
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return jsonScript({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
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
  return jsonScript({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Person",
      name: "אלעד יעקובוביץ׳",
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "אומנות הקשר",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/brand/facebook-profile.jpg`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: category,
    inLanguage: "he",
  });
}

export function LocalBusinessJsonLd() {
  return jsonScript({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "אומנות הקשר",
    description:
      "ליווי מקצועי לרווקים ורווקות בדרך לזוגיות מאושרת. 461 זוגות כבר מצאו אהבה עם אלעד יעקובוביץ׳.",
    url: SITE_URL,
    image: `${SITE_URL}/assets/brand/facebook-profile.jpg`,
    telephone: "+972512518025",
    email: "hello@eladjak.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "מרכז הארץ",
      addressCountry: "IL",
    },
    geo: { "@type": "GeoCoordinates", latitude: "32.0853", longitude: "34.7818" },
    priceRange: "₪₪",
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
    sameAs: SAME_AS,
  });
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
  return (
    <>
      {courses.map((course, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              name: course.title,
              description: course.description,
              provider: {
                "@type": "Organization",
                name: "אומנות הקשר",
                url: SITE_URL,
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
            }),
          }}
        />
      ))}
    </>
  );
}
