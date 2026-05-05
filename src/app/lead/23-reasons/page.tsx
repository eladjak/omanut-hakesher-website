"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const reasonTeasers = [
  { num: 1, title: "הפחד שהיא/הוא ידחה אותך", desc: "הקול הפנימי שאומר 'לא שווה לנסות' לפני שאפילו ניסית" },
  { num: 2, title: "אתה מחפש את השלמות", desc: "הרשימה שבראש שאף אחד בעולם האמיתי לא עומד בה" },
  { num: 4, title: "אתה מצפה שזה יקרה לבד", desc: "הסיפור ש'כשיגיע הזמן הנכון זה פשוט יקרה'" },
  { num: 7, title: "אתה לא באמת זמין רגשית", desc: "ייתכן שאתה מחפש קשר - אבל סוגר את הדלת לפני שהוא מגיע" },
  { num: 12, title: "אתה משדר את ה'ויבס' הלא נכונים", desc: "מה שאתה חושב שאתה משדר ומה שבאמת יוצא ממך - שני דברים שונים לגמרי" },
  { num: 18, title: "אמונות מגבילות על זוגיות", desc: "כל אחד נושא עמו סיפורים מהעבר. השאלה - אילו סיפורים נושא אתה?" },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function TwentyThreeReasonsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; submit?: string }>({});

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
    try {
      const res = await fetch("/api/lead/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim(), slug: "23-reasons" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrors({ submit: data.error === "invalid-email" ? "כתובת אימייל לא תקינה" : "משהו השתבש. נסה/י שוב בעוד רגע." });
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrors({ submit: "אין חיבור לרשת. בדוק/י את החיבור ונסה/י שוב." });
      setStatus("error");
    }
  };

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "מדריכים חינמיים", href: "/lead/23-reasons" }, { label: "23 הסיבות" }]} />
      </div>

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/blog-readiness.jpg"
            alt="23 הסיבות שאתה עדיין רווק"
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
              23 הסיבות האמיתיות שאתה עדיין{" "}
              <span className="text-accent-light">רווק/ה</span>
            </h1>
            <p className="text-xl text-white/85 max-w-xl mx-auto leading-relaxed">
              ו-23 הדרכים לשנות את זה — מדריך חינמי מאלעד יעקובוביץ׳
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
                    text: "תגלה את הדפוסים שמרחיקים ממך זוגיות",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    ),
                    color: "bg-primary/10 text-primary",
                  },
                  {
                    text: "תקבל כלים מעשיים שאפשר ליישם מיד",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    color: "bg-accent/10 text-accent-dark",
                  },
                  {
                    text: "תבין מה באמת עומד בינך לבין האהבה",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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
                      <h3 className="text-2xl font-bold mb-3">תודה — המדריך בדרך</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        שלחנו לך אותו עכשיו לאימייל. בדוק/י את תיבת הדואר תוך כמה דקות — לפעמים זה נוחת בספאם.
                      </p>
                      <p className="text-sm text-muted-foreground mt-4">
                        לא הגיע? <Link href="/contact" className="text-primary underline-offset-4 hover:underline">כתוב/כתבי לי</Link> ואשלח לך ידנית.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold mb-2">קבל/י את המדריך עכשיו — חינם</h2>
                      <p className="text-muted-foreground text-sm mb-7">
                        ממש כאן, ממש עכשיו. בלי תשלום, בלי התחייבות.
                      </p>
                      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        {errors.submit && (
                          <div className="rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive" role="alert">
                            {errors.submit}
                          </div>
                        )}
                        <div>
                          <label htmlFor="name-23" className="block text-sm font-medium mb-2">
                            שם <span className="text-destructive">*</span>
                          </label>
                          <Input
                            id="name-23"
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
                          <label htmlFor="email-23" className="block text-sm font-medium mb-2">
                            אימייל <span className="text-destructive">*</span>
                          </label>
                          <Input
                            id="email-23"
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
                            "שלחו לי את המדריך"
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

      {/* Preview: Teasers */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              הצצה פנימה
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              כמה מהסיבות שתגלה במדריך
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              (ו-17 סיבות נוספות שממתינות לך בפנים)
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {reasonTeasers.map((reason) => (
              <Card key={reason.num} className="border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold text-primary/20 shrink-0 leading-none mt-0.5">
                      {String(reason.num).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-semibold text-base mb-1.5">{reason.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Blur CTA */}
          <div className="mt-5 relative">
            <Card className="border-border/50 opacity-40 select-none">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-bold text-primary/20 shrink-0">23</span>
                  <div className="blur-sm">
                    <h3 className="font-semibold text-base mb-1.5">הסיבה הכי חשובה...</h3>
                    <p className="text-sm text-muted-foreground">זו שאם תפתור אותה, כל השאר יסתדר מעצמו</p>
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
                גלה את כל 23 הסיבות
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
            רוצה ליווי אישי?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
            המדריך הוא ההתחלה. אם תרצה ללכת עמוק יותר — שיחת היכרות בחינם מחכה לך.
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
