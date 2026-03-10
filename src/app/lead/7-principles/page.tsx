"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const principles = [
  {
    num: 1,
    title: "קודם כל — מסע פנימי",
    desc: "לפני שמחפשים מישהו אחר, צריך להכיר את עצמך לעומק. מי אתה, מה אתה צריך, מה מפחיד אותך.",
  },
  {
    num: 2,
    title: "אמונות שמגבילות",
    desc: "כולנו נושאים עמנו סיפורים ישנים על אהבה וזוגיות. זיהוי האמונות המגבילות הוא שלב קריטי.",
  },
  {
    num: 3,
    title: "תקשורת שיוצרת חיבור",
    desc: "לא מה שאומרים אלא איך אומרים. מיומנויות תקשורת שמביאות אנשים קרוב אחד לשני.",
  },
  {
    num: 4,
    title: "פגיעות כחוזק",
    desc: "הפחד הגדול ביותר הוא להיראות. אבל דווקא הפגיעות האמיתית היא מה שיוצר קשר עמוק.",
  },
  {
    num: 5,
    title: "גבולות בריאים",
    desc: "גבולות לא מרחיקים אנשים — הם מגדירים מי אתה ומה חשוב לך. זה מה שמושך.",
  },
  {
    num: 6,
    title: "נוכחות מלאה",
    desc: "להיות נוכח באמת בכל אינטראקציה, בלי סחות, בלי ביצוע — פשוט אתה.",
  },
  {
    num: 7,
    title: "מחויבות כהחלטה",
    desc: "אהבה היא לא רק תחושה — היא גם בחירה יומיומית. ורק מי שמבין זה יכול לבנות קשר אמיתי.",
  },
];

type FormStatus = "idle" | "submitting" | "success";

export default function SevenPrinciplesPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim() || name.trim().length < 2) newErrors.name = "נא להזין שם (לפחות 2 תווים)";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) newErrors.email = "נא להזין כתובת אימייל תקינה";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
  };

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "מדריכים חינמיים", href: "/lead/7-principles" }, { label: "7 עקרונות הזהב" }]} />
      </div>

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/blog-confidence.jpg"
            alt="7 עקרונות הזהב לזוגיות"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/68" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <Badge variant="outline" className="mb-5 text-white border-white/30 text-sm px-4 py-1.5">
              מדריך חינמי
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              7 עקרונות הזהב{" "}
              <span className="text-accent-light">למציאת זוגיות</span>
            </h1>
            <p className="text-xl text-white/85 max-w-xl mx-auto leading-relaxed">
              העקרונות שמנחים את כל תוכנית ״הדרך״ — עכשיו בחינם
            </p>
          </div>
        </div>
      </section>

      {/* Benefits + Form */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">

            {/* Left: Benefits */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                מה תקבל/י במדריך?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    text: "הבנה עמוקה של מה באמת יוצר חיבור",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    ),
                    color: "bg-primary/10 text-primary",
                  },
                  {
                    text: "כלים מתוכנית שליוותה 461 זוגות",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    ),
                    color: "bg-accent/10 text-accent-dark",
                  },
                  {
                    text: "גישה שעובדת גם לגברים וגם לנשים",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    color: "bg-secondary/10 text-secondary-dark",
                  },
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`inline-flex p-2.5 rounded-xl shrink-0 mt-0.5 ${benefit.color}`}>
                      {benefit.icon}
                    </div>
                    <p className="text-lg font-medium leading-relaxed">{benefit.text}</p>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="mt-10 p-5 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-4">
                  <div className="inline-flex p-3 rounded-full bg-primary/10">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">461 זוגות</p>
                    <p className="text-muted-foreground text-sm">כבר מצאו את הדרך עם אלעד</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <Card className="border-border/50 shadow-xl shadow-primary/5">
                <CardContent className="p-8">
                  {status === "success" ? (
                    <div className="text-center py-8">
                      <div className="inline-flex p-4 rounded-full bg-secondary/15 mb-5">
                        <svg className="w-10 h-10 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">7 העקרונות בדרך אליך!</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        שלחנו לך את המדריך לאימייל. בדוק/י את תיבת הדואר שלך (וגם את תיקיית הספאם).
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold mb-2">קבל/י את המדריך עכשיו — חינם</h2>
                      <p className="text-muted-foreground text-sm mb-7">
                        ממש כאן, ממש עכשיו. בלי תשלום, בלי התחייבות.
                      </p>
                      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        <div>
                          <label htmlFor="name-7p" className="block text-sm font-medium mb-2">
                            שם <span className="text-destructive">*</span>
                          </label>
                          <Input
                            id="name-7p"
                            type="text"
                            value={name}
                            onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
                            placeholder="השם שלך"
                            className={`rounded-xl ${errors.name ? "border-destructive" : ""}`}
                            aria-invalid={!!errors.name}
                          />
                          {errors.name && <p className="text-destructive text-sm mt-1.5" role="alert">{errors.name}</p>}
                        </div>

                        <div>
                          <label htmlFor="email-7p" className="block text-sm font-medium mb-2">
                            אימייל <span className="text-destructive">*</span>
                          </label>
                          <Input
                            id="email-7p"
                            type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                            placeholder="your@email.com"
                            dir="ltr"
                            className={`rounded-xl ${errors.email ? "border-destructive" : ""}`}
                            aria-invalid={!!errors.email}
                          />
                          {errors.email && <p className="text-destructive text-sm mt-1.5" role="alert">{errors.email}</p>}
                        </div>

                        <Button
                          type="submit"
                          disabled={status === "submitting"}
                          className="w-full rounded-full bg-primary hover:bg-primary-dark text-white text-lg py-6 font-semibold"
                        >
                          {status === "submitting" ? (
                            <span className="flex items-center gap-2 justify-center">
                              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              שולח...
                            </span>
                          ) : (
                            "שלחו לי את 7 העקרונות"
                          )}
                        </Button>

                        <p className="text-xs text-muted-foreground text-center leading-relaxed">
                          לא ספאם, מעולם. אפשר להסיר בכל עת.
                        </p>
                      </form>

                      {/* WhatsApp alternative */}
                      <div className="mt-6 pt-6 border-t border-border/50 text-center">
                        <p className="text-sm text-muted-foreground mb-3">מעדיפים וואטסאפ?</p>
                        <Link
                          href="https://wa.me/972512518025"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-secondary-dark hover:opacity-80 transition-opacity"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          שלח/י לי הודעה בוואטסאפ
                        </Link>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Preview: The 7 Principles */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              הצצה פנימה
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              7 העקרונות — מבט ראשון
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              כל עיקרון מגיע עם הסבר מעמיק ותרגיל מעשי במדריך המלא
            </p>
          </div>

          <div className="space-y-4">
            {principles.map((principle) => (
              <Card key={principle.num} className="border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-sm">{principle.num}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base mb-1.5">{principle.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{principle.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            רוצה ליישם את העקרונות עם ליווי אישי?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
            7 עקרונות בידיים שלך זה התחלה. יישום עם מנטור — זה מה שמביא תוצאות.
          </p>
          <Link
            href="/coaching"
            className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
          >
            לשיחת היכרות חינם
          </Link>
        </div>
      </section>
    </>
  );
}
