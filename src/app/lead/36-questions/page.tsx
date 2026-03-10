"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const sampleQuestions = [
  {
    level: "רמה 1 — פתיחות ראשונית",
    levelColor: "bg-secondary/10 text-secondary-dark border-secondary/20",
    questions: [
      { num: 3, text: "לפני שאתה מתקשר, תמיד מתכנן מה תגיד?" },
      { num: 5, text: "מה היה ה׳יום המושלם׳ שלך?" },
    ],
  },
  {
    level: "רמה 2 — העמקה",
    levelColor: "bg-primary/10 text-primary border-primary/20",
    questions: [
      { num: 14, text: "איזה הישג בחייך גורם לך הכי הרבה גאווה?" },
      { num: 17, text: "מה הזיכרון האהוב עליך ביותר?" },
    ],
  },
  {
    level: "רמה 3 — פגיעות ועומק",
    levelColor: "bg-accent/10 text-accent-dark border-accent/20",
    questions: [
      { num: 30, text: "מתי בפעם האחרונה בכית מול אדם אחר? לבד?" },
      { num: 36, text: "שתפו בעיה אישית ובקשו מהאחר לייעץ כיצד להתמודד איתה." },
    ],
  },
];

type FormStatus = "idle" | "submitting" | "success";

export default function ThirtySixQuestionsPage() {
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
        <Breadcrumbs items={[{ label: "מדריכים חינמיים", href: "/lead/36-questions" }, { label: "36 השאלות" }]} />
      </div>

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/blog-listening.jpg"
            alt="36 השאלות שיכולות ליצור אהבה"
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
              36 השאלות שיכולות{" "}
              <span className="text-accent-light">ליצור אהבה</span>
            </h1>
            <p className="text-xl text-white/85 max-w-xl mx-auto leading-relaxed">
              מבוסס על המחקר המפורסם של ד״ר ארתור ארון — עם התאמה ישראלית מאלעד
            </p>
          </div>
        </div>
      </section>

      {/* Benefits + Form */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">

            {/* Left: Benefits + Research context */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                מה תקבל/י במדריך?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    text: "שאלות שנבדקו מדעית ליצירת קרבה",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    ),
                    color: "bg-primary/10 text-primary",
                  },
                  {
                    text: "מותאמות לתרבות הישראלית",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    color: "bg-accent/10 text-accent-dark",
                  },
                  {
                    text: "מדריך שימוש לדייט ראשון, שני ושלישי",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
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

              {/* Research note */}
              <div className="mt-8 p-5 rounded-2xl bg-muted/60 border border-border/50">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">המחקר של ד״ר ארון:</span>{" "}
                  ב-1997 פרסם הפסיכולוג ארתור ארון מחקר שהראה שזוגות שענו על 36 שאלות ספציפיות
                  בזה אחר זה פיתחו תחושת קרבה עמוקה תוך 45 דקות בלבד.
                  הגרסה של אלעד מותאמת למנטליות הישראלית ולשלבים שונים של היכרות.
                </p>
              </div>

              {/* Social proof */}
              <div className="mt-6 p-5 rounded-2xl bg-primary/5 border border-primary/10">
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
                      <h3 className="text-2xl font-bold mb-3">36 השאלות בדרך אליך!</h3>
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
                          <label htmlFor="name-36" className="block text-sm font-medium mb-2">
                            שם <span className="text-destructive">*</span>
                          </label>
                          <Input
                            id="name-36"
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
                          <label htmlFor="email-36" className="block text-sm font-medium mb-2">
                            אימייל <span className="text-destructive">*</span>
                          </label>
                          <Input
                            id="email-36"
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
                            "שלחו לי את 36 השאלות"
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

      {/* Preview: Sample Questions */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              הצצה פנימה
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              כמה שאלות לדוגמה
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              השאלות מחולקות ל-3 רמות — מפתיחות ועד עמוקות. המדריך המלא כולל את כולן עם הנחיות שימוש.
            </p>
          </div>

          <div className="space-y-8">
            {sampleQuestions.map((section) => (
              <div key={section.level}>
                <Badge className={`mb-4 border ${section.levelColor} bg-transparent font-medium`}>
                  {section.level}
                </Badge>
                <div className="space-y-3">
                  {section.questions.map((q) => (
                    <Card key={q.num} className="border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-200">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <span className="text-2xl font-bold text-primary/25 shrink-0 leading-none mt-0.5">
                            {String(q.num).padStart(2, "0")}
                          </span>
                          <p className="text-base leading-relaxed">{q.text}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Blur CTA for remaining questions */}
          <div className="mt-8 relative">
            <Card className="border-border/50 opacity-40 select-none">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-primary/25 shrink-0">33</span>
                  <div className="blur-sm">
                    <p className="text-base">...ועוד 30 שאלות נוספות שמחכות לך</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="absolute inset-0 flex items-center justify-center">
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary-dark transition-colors shadow-lg"
              >
                קבל/י את כל 36 השאלות
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            מוכן/ה לצאת לדייט עם הכלים הנכונים?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
            36 שאלות זה כלי אחד. אם תרצה לדעת איך להשתמש בהם נכון — שיחת היכרות בחינם מחכה לך.
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
