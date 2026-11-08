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
        <Breadcrumbs items={[{ label: "אירועים", href: "/events/love-event" }, { label: "אירוע אהבה" }]} />
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
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
