export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "אומנות הקשר",
    description:
      "ליווי מקצועי לזוגות ויחידים בדרך לתקשורת עמוקה ומשמעותית. סדנאות, ייעוץ זוגי, וכלים מעשיים לבניית קשרים בריאים.",
    url: "https://omanut-hakesher.co.il",
    telephone: "+972501234567",
    email: "hello@omanut-hakesher.co.il",
    areaServed: {
      "@type": "Country",
      name: "Israel",
    },
    serviceType: [
      "ייעוץ זוגי",
      "סדנאות תקשורת",
      "ליווי אישי",
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
      url: "https://omanut-hakesher.co.il/about",
    },
    publisher: {
      "@type": "Organization",
      name: "אומנות הקשר",
      url: "https://omanut-hakesher.co.il",
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
      "ליווי מקצועי לזוגות ויחידים בדרך לתקשורת עמוקה ומשמעותית. סדנאות, ייעוץ זוגי, וכלים מעשיים לבניית קשרים בריאים.",
    url: "https://omanut-hakesher.co.il",
    telephone: "+972501234567",
    email: "hello@omanut-hakesher.co.il",
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
      url: "https://omanut-hakesher.co.il",
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
