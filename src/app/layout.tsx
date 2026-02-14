import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "אומנות הקשר | זוגיות, תקשורת וצמיחה אישית",
  description:
    "ליווי זוגות ויחידים בדרך לתקשורת עמוקה ומשמעותית. סדנאות, ייעוץ זוגי, וכלים מעשיים לבניית קשרים בריאים.",
  keywords: [
    "ייעוץ זוגי",
    "תקשורת זוגית",
    "טיפול זוגי",
    "סדנאות זוגיות",
    "שיפור תקשורת",
  ],
  openGraph: {
    title: "אומנות הקשר | זוגיות, תקשורת וצמיחה אישית",
    description:
      "ליווי זוגות ויחידים בדרך לתקשורת עמוקה ומשמעותית",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className={`${heebo.variable} font-sans antialiased`}>
        <ThemeProvider>
          <TooltipProvider>
            <GoogleAnalytics />
            <Header />
            <main>{children}</main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
