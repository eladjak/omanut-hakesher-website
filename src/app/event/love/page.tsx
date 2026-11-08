"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";

type FormStatus = "idle" | "submitting" | "success" | "error";

const agenda = [
  { time: "20:30", title: "ברוכים הבאים + הכרות", desc: "מי בחדר, מה מצפים, איך אנחנו עובדים" },
  { time: "20:40", title: "הדרכה חיה ממני", desc: "נושא משתנה כל שבוע — תקשורת, פחדים, פלירטוט, חזון" },
  { time: "21:20", title: "שאלות ותשובות", desc: "בלייב. את/ה שואל/ת, אני עונה. אין הסתרות." },
  { time: "21:50", title: "סיכום + צעדים הבאים", desc: "המשימה השבועית + מי ממשיך לאן" },
];

const audience = [
  "פנויים ופנויות בני 25-45",
  "מי שהבין שעוד דייט במקרי לא יביא לתוצאה",
  "מי שאוהב/ת ללמוד ולהתפתח עם קהילה",
  "כל הרמות הדתיות — חילוני/ת, מסורתי/ת, דתי/ה, חרדי/ה",
];

export default function LoveEventPage() {
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
        body: JSON.stringify({ email: email.trim(), name: name.trim(), slug: "love-event" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrors({ submit: data.error === "invalid-email" ? "כתובת אימייל לא תקינה" : "משהו השתבש. נסה/י שוב." });
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrors({ submit: "אין חיבור לרשת." });
      setStatus("error");
    }
  };

  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "אירוע אהבה" }]} />
      </div>

      <section className="relative py-24 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/generated/blog-listening.jpg" alt="אירוע אהבה — מפגש שבועי בזום" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-5 text-white border-white/30 text-sm px-4 py-1.5">
              חינם · בזום · כל יום ה׳ ב-20:30
            </Badge>
            <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              אירוע <span className="text-accent-light">אהבה</span>
            </h1>
            <p className="text-pretty text-xl md:text-2xl text-white/85 max-w-2xl mx-auto leading-relaxed">
              מפגש שבועי של הדרכה, קהילה ותמיכה — לפנויים ופנויות שרוצים זוגיות אמיתית.
            </p>
            <p className="mt-6 text-white/75 text-base">
              ⚠️ ללא הקלטה — רק מי שמגיע בזמן רואה.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div>
              <h2 className="text-balance text-2xl md:text-3xl font-bold mb-8">מה קורה במפגש</h2>
              <div className="space-y-4">
                {agenda.map((item, i) => (
                  <Card key={i} className="border-border/50">
                    <CardContent className="p-5 flex gap-4 items-start">
                      <div className="shrink-0 text-primary font-bold tabular-nums min-w-[60px]">{item.time}</div>
                      <div>
                        <h3 className="font-bold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 p-5 rounded-2xl bg-primary/5 border border-primary/10">
                <h3 className="font-bold mb-3">למי זה מתאים</h3>
                <ul className="space-y-2.5">
                  {audience.map((a, i) => (
                    <li key={i} className="flex gap-2.5 text-sm items-start">
                      <span className="shrink-0 mt-0.5 text-primary">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <Card className="border-border/50 shadow-xl shadow-primary/5">
                <CardContent className="p-8">
                  {status === "success" ? (
                    <div className="text-center py-8">
                      <div className="inline-flex p-4 rounded-full bg-secondary/15 mb-5">
                        <svg className="w-10 h-10 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">נרשמת! נשלח לך תזכורת</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        תקבל/י לינק לזום באימייל יום לפני המפגש. בדוק/י את תיבת הדואר — לפעמים זה נוחת בספאם.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold mb-2">להירשם למפגש הבא — חינם</h2>
                      <p className="text-muted-foreground text-sm mb-7">
                        ממש כאן. תקבל/י לינק לזום באימייל יום לפני.
                      </p>
                      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        {errors.submit && (
                          <div className="rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive" role="alert">
                            {errors.submit}
                          </div>
                        )}
                        <div>
                          <label htmlFor="ev-name" className="block text-sm font-medium mb-2">
                            שם <span className="text-destructive">*</span>
                          </label>
                          <Input
                            id="ev-name"
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
                          <label htmlFor="ev-email" className="block text-sm font-medium mb-2">
                            אימייל <span className="text-destructive">*</span>
                          </label>
                          <Input
                            id="ev-email"
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
                          {status === "submitting" ? "שולח..." : "אני בא/ה — שריינו לי מקום"}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center leading-relaxed">
                          מקומות מוגבלים. אפשר להסיר מהרשימה בכל עת.
                        </p>
                      </form>

                      <div className="mt-6 pt-6 border-t border-border/50 text-center">
                        <p className="text-sm text-muted-foreground mb-3">שאלות לפני שמגיעים?</p>
                        <Link
                          href="https://wa.me/972512518025?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%99%D7%A9%20%D7%9C%D7%99%20%D7%A9%D7%90%D7%9C%D7%94%20%D7%A2%D7%9C%20%D7%90%D7%99%D7%A8%D7%95%D7%A2%20%D7%94%D7%90%D7%94%D7%91%D7%94"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-secondary-dark hover:opacity-80 transition-opacity"
                        >
                          לשאלות בוואטסאפ ←
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
    </>
  );
}
