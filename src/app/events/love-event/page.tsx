"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Folded 2026-07-09 from the hoover-variant event page — the concrete agenda
// and audience copy that make the event feel real.
const agenda = [
  { time: "20:30", title: "ברוכים הבאים + היכרות", desc: "מי בחדר, מה מצפים, איך אנחנו עובדים" },
  { time: "20:40", title: "הדרכה חיה ממני", desc: "נושא משתנה כל שבוע — תקשורת, פחדים, פלירטוט, חזון" },
  { time: "21:20", title: "שאלות ותשובות", desc: "בלייב. את/ה שואל/ת, אני עונה. אין הסתרות." },
  { time: "21:50", title: "סיכום + צעדים הבאים", desc: "המשימה השבועית + מי ממשיך לאן" },
];

const audience = [
  "פנויים ופנויות בני 25-45",
  "מי שהבין שעוד דייט מקרי לא יביא לתוצאה",
  "מי שאוהב/ת ללמוד ולהתפתח עם קהילה",
  "כל הרמות הדתיות — חילוני/ת, מסורתי/ת, דתי/ה, חרדי/ה",
];

export default function LoveEventPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; submit?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v: typeof errors = {};
    if (!name.trim() || name.trim().length < 2) v.name = "נא להזין שם (לפחות 2 תווים)";
    if (!EMAIL_RE.test(email.trim())) v.email = "כתובת אימייל לא תקינה";
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/lead/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          name: name.trim(),
          slug: "love-event-rsvp",
        }),
      });
      if (!res.ok) {
        setErrors({ submit: "לא הצלחנו לרשום אותך. נסה/י שוב או צרו קשר ישיר בוואטסאפ." });
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
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "אירוע אהבה" }]} />
      </div>

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/community.jpg"
            alt="אירוע אהבה — הדרכה, קהילה, היכרויות"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/72" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-5 text-white border-white/30 text-sm px-4 py-1.5">
              חינם · יום חמישי 20:30 בזום
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight text-balance">
              אירוע <span className="text-accent-light">אהבה</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed text-pretty">
              הדרכה. קהילה. תמיכה. היכרויות. שעה וחצי בזום, אינטראקטיבי, בלי הקלטה — רק מי שמגיע, נכח.
            </p>
          </div>
        </div>
      </section>

      {/* What happens */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              מה קורה ב-1.5 שעות
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "הדרכה", desc: "תוכן ממוקד בנושא דייטינג ספציפי — שמשתנה כל אירוע" },
              { title: "קהילה", desc: "פגישה אנשים בתהליך שלך. אנרגיה אחרת לגמרי מהאפליקציות." },
              { title: "תמיכה", desc: "שאלות בלייב. נתקעים על מצב? נדבר עליו בקבוצה." },
              { title: "היכרויות", desc: "חלק מהאירוע — מפגשי break-out לזוגות-זוגות. בלי לחץ." },
            ].map((item) => (
              <Card key={item.title} className="border-border/50">
                <CardContent className="p-5 text-center">
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed text-pretty">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda + audience */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-balance">לוח הזמנים של המפגש</h2>
              <div className="space-y-4">
                {agenda.map((item) => (
                  <Card key={item.time} className="border-border/50">
                    <CardContent className="p-5 flex gap-4 items-start">
                      <div className="shrink-0 text-primary font-bold tabular-nums min-w-[56px]" dir="ltr">
                        {item.time}
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{item.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="lg:mt-14">
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <h2 className="text-xl font-bold mb-4">למי זה מתאים</h2>
                <ul className="space-y-3">
                  {audience.map((a) => (
                    <li key={a} className="flex gap-2.5 text-sm items-start">
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
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-border/50 shadow-xl shadow-primary/5">
            <CardContent className="p-8 md:p-10">
              {status === "success" ? (
                <div className="text-center py-6">
                  <div className="inline-flex p-4 rounded-full bg-secondary/15 mb-5">
                    <svg className="w-10 h-10 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">נרשמת בהצלחה</h2>
                  <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                    שלחנו לך לאימייל את פרטי החיבור לזום + תאריך האירוע הבא. בדוק/י את תיבת הדואר תוך כמה דקות.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    לא הגיע?{" "}
                    <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                      כתבו לי
                    </Link>{" "}
                    ואשלח שוב.
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-7">
                    <Badge variant="outline" className="mb-3 text-primary border-primary/30">
                      הרשמה חינמית
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-balance">תפסו לכם מקום</h2>
                    <p className="text-muted-foreground text-pretty">
                      המקומות מוגבלים — אנחנו שולחים אישור עם פרטי הזום מיד לאחר ההרשמה.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {errors.submit && (
                      <div className="rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive" role="alert">
                        {errors.submit}
                      </div>
                    )}

                    <div>
                      <label htmlFor="le-name" className="block text-sm font-medium mb-1.5">
                        שם <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="le-name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
                        placeholder="השם שלך"
                        className={`rounded-xl ${errors.name ? "border-destructive" : ""}`}
                        aria-invalid={!!errors.name}
                        required
                      />
                      {errors.name && <p className="text-destructive text-xs mt-1" role="alert">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="le-email" className="block text-sm font-medium mb-1.5">
                        אימייל <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="le-email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                        placeholder="your@email.com"
                        dir="ltr"
                        className={`rounded-xl ${errors.email ? "border-destructive" : ""}`}
                        aria-invalid={!!errors.email}
                        required
                      />
                      {errors.email && <p className="text-destructive text-xs mt-1" role="alert">{errors.email}</p>}
                    </div>

                    <Button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full rounded-full bg-primary hover:bg-primary-dark text-white text-lg py-6 font-semibold"
                    >
                      {status === "submitting" ? "רושם..." : "שמרו לי מקום"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center leading-relaxed">
                      ההרשמה לא מחייבת — אם לא הגעת, פשוט לא הגעת.
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
                      לשאלות בוואטסאפ
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
