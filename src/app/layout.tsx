import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SkipToContent } from "@/components/SkipToContent";
import { OrganizationJsonLd } from "@/components/JsonLd";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "אומנות הקשר | זוגיות, תקשורת וצמיחה אישית",
    template: "%s | אומנות הקשר",
  },
  description:
    "ליווי זוגות ויחידים בדרך לתקשורת עמוקה ומשמעותית. סדנאות, ייעוץ זוגי, וכלים מעשיים לבניית קשרים בריאים.",
  keywords: [
    "ייעוץ זוגי",
    "תקשורת זוגית",
    "טיפול זוגי",
    "סדנאות זוגיות",
    "שיפור תקשורת",
    "ליווי אישי",
    "אומנות הקשר",
  ],
  metadataBase: new URL("https://omanut-hakesher.co.il"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "אומנות הקשר | זוגיות, תקשורת וצמיחה אישית",
    description:
      "ליווי זוגות ויחידים בדרך לתקשורת עמוקה ומשמעותית. סדנאות, ייעוץ זוגי, וכלים מעשיים לבניית קשרים בריאים.",
    locale: "he_IL",
    type: "website",
    siteName: "אומנות הקשר",
    url: "https://omanut-hakesher.co.il",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "אומנות הקשר - זוגיות, תקשורת וצמיחה אישית",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "אומנות הקשר | זוגיות, תקשורת וצמיחה אישית",
    description:
      "ליווי זוגות ויחידים בדרך לתקשורת עמוקה ומשמעותית",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Preconnect to external origins for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Prevent dark mode flash - runs before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
        <OrganizationJsonLd />
      </head>
      <body className={`${heebo.variable} font-sans antialiased`}>
        <ThemeProvider>
          <TooltipProvider>
            <SkipToContent />
            <GoogleAnalytics />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            <WhatsAppButton />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
