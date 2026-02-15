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
    sameAs: [
      "https://facebook.com",
      "https://instagram.com",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
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
