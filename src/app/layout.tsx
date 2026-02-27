import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SkipToContent } from "@/components/SkipToContent";
import { OrganizationJsonLd } from "@/components/JsonLd";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "אומנות הקשר | מצא את הזוגיות שמגיעה לך - עם אלעד יעקובוביץ׳",
    template: "%s | אומנות הקשר",
  },
  description:
    "בית הספר למציאת זוגיות מאושרת. 461 זוגות כבר מצאו אהבה דרך תוכנית ״הדרך״ וליווי אישי עם אלעד יעקובוביץ׳. שיחת היכרות חינם.",
  keywords: [
    "מציאת זוגיות",
    "ליווי אישי לזוגיות",
    "אלעד יעקובוביץ",
    "אומנות הקשר",
    "קורס זוגיות",
    "איך למצוא זוגיות",
    "מנטור זוגיות",
    "שיחת ייעוץ חינם",
    "רווקים",
    "דייטינג",
  ],
  metadataBase: new URL("https://omanut-hakesher.co.il"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "אומנות הקשר | מצא את הזוגיות שמגיעה לך - אלעד יעקובוביץ׳",
    description:
      "461 זוגות כבר מצאו אהבה. תוכנית ״הדרך״ + ליווי אישי עם התחייבות לתוצאה. שיחת היכרות חינם.",
    locale: "he_IL",
    type: "website",
    siteName: "אומנות הקשר",
    url: "https://omanut-hakesher.co.il",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "אומנות הקשר - זוגיות, תקשורת וצמיחה אישית",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "אומנות הקשר | מצא את הזוגיות שמגיעה לך",
    description:
      "461 זוגות כבר מצאו אהבה. שיחת היכרות חינם עם אלעד יעקובוביץ׳.",
    images: ["/opengraph-image"],
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
            <ScrollToTop />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
