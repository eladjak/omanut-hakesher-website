import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LocalBusinessJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "צרו קשר לקביעת פגישת היכרות או לכל שאלה - אומנות הקשר",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "צור קשר | אומנות הקשר",
    description:
      "צרו קשר לקביעת פגישת היכרות או לכל שאלה - אומנות הקשר",
    url: "/contact",
    locale: "he_IL",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <LocalBusinessJsonLd />

      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "צור קשר" }]} />
      </div>

      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            בואו נדבר
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            צור <span className="text-primary">קשר</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            שאלות, התלבטויות, או פשוט רוצה להתחיל - אני כאן.
            שיחת היכרות של 30 דקות, בחינם, בלי התחייבות.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="border-border/50">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-2">השאר פרטים</h2>
                  <p className="text-muted-foreground mb-8">מלא את הטופס ואחזור אליך בהקדם</p>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Contact */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-5">דרכים ליצירת קשר</h3>
                  <div className="space-y-5">
                    {/* Phone */}
                    <a href="tel:+972512518025" className="flex items-center gap-4 group">
                      <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">טלפון</p>
                        <p className="font-medium group-hover:text-primary transition-colors" dir="ltr">051-251-8025</p>
                      </div>
                    </a>

                    <Separator />

                    {/* WhatsApp */}
                    <a href="https://wa.me/972512518025" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                      <div className="w-11 h-11 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                        <svg className="w-5 h-5 text-secondary-dark" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">וואטסאפ</p>
                        <p className="font-medium group-hover:text-primary transition-colors">שלח הודעה</p>
                      </div>
                    </a>

                    <Separator />

                    {/* Email */}
                    <a href="mailto:hello@omanut-hakesher.co.il" className="flex items-center gap-4 group">
                      <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                        <svg className="w-5 h-5 text-accent-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">אימייל</p>
                        <p className="font-medium group-hover:text-primary transition-colors" dir="ltr">hello@omanut-hakesher.co.il</p>
                      </div>
                    </a>

                    <Separator />

                    {/* Response Time */}
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-primary-light/20 rounded-xl flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">זמן תגובה</p>
                        <p className="font-medium">אחזור אליך תוך 24 שעות</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Availability */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">שעות פעילות</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between text-sm">
                      <span className="text-muted-foreground">ראשון - חמישי</span>
                      <span className="font-medium">9:00 - 20:00</span>
                    </li>
                    <Separator />
                    <li className="flex justify-between text-sm">
                      <span className="text-muted-foreground">שישי</span>
                      <span className="font-medium">9:00 - 13:00</span>
                    </li>
                    <Separator />
                    <li className="flex justify-between text-sm">
                      <span className="text-muted-foreground">שבת</span>
                      <span className="font-medium text-muted-foreground">סגור</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Quick WhatsApp CTA */}
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-background">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <h3 className="font-bold mb-2">מעדיף וואטסאפ?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    שלח הודעה ואחזור אליך במהירות
                  </p>
                  <a
                    href="https://wa.me/972512518025?text=%D7%94%D7%99%D7%99%20%D7%90%D7%9C%D7%A2%D7%93%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%9C%20%D7%94%D7%9C%D7%99%D7%95%D7%95%D7%99"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full font-medium text-sm hover:bg-primary-dark transition-colors"
                  >
                    שלח הודעה בוואטסאפ
                  </a>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="border-border/50 overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <div className="text-center text-muted-foreground/50">
                    <svg className="w-12 h-12 mx-auto mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm">מפה</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground text-center">
                    מרכז הארץ - כתובת מדויקת בתיאום מראש
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
