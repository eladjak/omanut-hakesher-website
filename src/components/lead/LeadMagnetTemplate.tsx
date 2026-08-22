import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getLeadMagnet } from "@/lib/lead-magnets";

export interface TeaserItem {
  num: number;
  title: string;
  desc: string;
}

export interface LeadMagnetTemplateProps {
  slug: string;
  breadcrumbLabel: string;
  heroBadge: string;
  heroTitle: React.ReactNode;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;
  benefits: { text: string }[];
  teaserBadge: string;
  teaserTitle: string;
  teaserSubtitle: string;
  teasers: TeaserItem[];
  contextNote?: { title: string; text: string };
  practicePrompt: { title: string; desc: string; questions: string[] };
  ctaText: string;
  formIntro: string;
}

export function LeadMagnetTemplate(props: LeadMagnetTemplateProps) {
  const {
    slug,
    breadcrumbLabel,
    heroBadge,
    heroTitle,
    heroSubtitle,
    heroImage,
    heroImageAlt,
    benefits,
    teaserBadge,
    teaserTitle,
    teaserSubtitle,
    teasers,
    contextNote,
    practicePrompt,
    ctaText,
    formIntro,
  } = props;

  const magnet = getLeadMagnet(slug);
  const assetUrl = magnet?.deliverable === true ? magnet.assetUrl : null;
  const isDeliverable = assetUrl !== null;

  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "מדריכים חינמיים", href: "/lead" }, { label: breadcrumbLabel }]} />
      </div>

      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroImage} alt={heroImageAlt} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-foreground/68" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <Badge variant="outline" className="mb-5 text-white border-white/30 text-sm px-4 py-1.5">
              {heroBadge}
            </Badge>
            <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              {heroTitle}
            </h1>
            <p className="text-pretty text-xl text-white/85 max-w-xl mx-auto leading-relaxed">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">מה תקבל/י במדריך?</h2>
              <div className="space-y-6">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="inline-flex p-2.5 rounded-xl shrink-0 mt-0.5 bg-primary/10 text-primary">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium leading-relaxed">{b.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-5 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-4">
                  <div className="inline-flex p-3 rounded-full bg-primary/10">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-primary">מדריך שעובדים איתו</p>
                    <p className="text-muted-foreground text-sm">לבחור רעיון אחד, לנסות, ואז לבדוק מה קרה</p>
                  </div>
                </div>
              </div>

              {contextNote && (
                <aside className="mt-6 p-5 rounded-2xl bg-background border border-border/60" aria-label={contextNote.title}>
                  <p className="font-semibold mb-2">{contextNote.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{contextNote.text}</p>
                </aside>
              )}
            </div>

            <div>
              <Card className="border-border/50 shadow-xl shadow-primary/5">
                <CardContent className="p-8">
                  {!isDeliverable ? (
                    <div className="py-8 text-center">
                      <h2 className="text-xl font-bold mb-3">המדריך בהכנה</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        הקובץ עדיין לא מוכן למסירה. אפשר לחזור לעמוד המדריכים ולבחור כלי שכבר זמין.
                      </p>
                      <Button asChild className="mt-6 rounded-full">
                        <Link href="/lead">לכל המדריכים</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="py-4 text-center">
                      <div className="mb-5 inline-flex rounded-full bg-secondary/15 p-4">
                        <svg className="h-10 w-10 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
                        </svg>
                      </div>
                      <h2 className="mb-3 text-2xl font-bold">המדריך פתוח עכשיו</h2>
                      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                        {formIntro} אין צורך להשאיר אימייל או להצטרף לרשימת דיוור.
                      </p>
                      <a
                        href={assetUrl}
                        className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
                      >
                        לפתיחת ה־PDF
                      </a>
                      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                        הקישור פותח את הקובץ המלא בדפדפן. אפשר לשמור או להדפיס משם.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-border/40">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-secondary-dark border-secondary/30">איך להשתמש</Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold mb-4">שלושה צעדים שהופכים קריאה לתרגול</h2>
            <p className="text-pretty text-muted-foreground max-w-2xl mx-auto">
              אין צורך ליישם הכול בבת אחת. עדיף סבב קטן שאפשר ללמוד ממנו.
            </p>
          </div>
          <ol className="grid md:grid-cols-3 gap-5">
            {[
              { num: "01", title: "לבחור", desc: "מסמנים רעיון אחד שרלוונטי למצב אמיתי מהשבוע הקרוב." },
              { num: "02", title: "לנסות", desc: "מגדירים פעולה קטנה ובטוחה שאפשר לבצע בלי לשחק תפקיד." },
              { num: "03", title: "לבדוק", desc: "אחרי ההתנסות כותבים מה הרגיש טבעי, מה היה קשה ומה כדאי לשנות." },
            ].map((step) => (
              <li key={step.num} className="rounded-2xl border border-border/60 bg-card p-6 list-none">
                <span className="text-sm font-bold text-primary tabular-nums">{step.num}</span>
                <h3 className="font-bold text-lg mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">{teaserBadge}</Badge>
            <h2 className="text-balance text-3xl md:text-4xl font-bold mb-4">{teaserTitle}</h2>
            <p className="text-pretty text-lg text-muted-foreground max-w-2xl mx-auto">{teaserSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {teasers.map((t) => (
              <Card key={t.num} className="border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold text-primary/20 shrink-0 leading-none mt-0.5 tabular-nums">
                      {String(t.num).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-semibold text-base mb-1.5">{t.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-primary/20 bg-primary/5 p-6 md:p-8">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">תרגיל שאפשר לנסות עכשיו</Badge>
            <h3 className="text-2xl font-bold mb-3 text-balance">{practicePrompt.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-pretty mb-5">{practicePrompt.desc}</p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-6">
              {practicePrompt.questions.map((question) => (
                <li key={question} className="rounded-xl bg-background border border-border/60 p-4 text-sm leading-relaxed">
                  {question}
                </li>
              ))}
            </ul>
            {isDeliverable ? (
              <a
                href={assetUrl}
                className="inline-flex items-center justify-center min-h-11 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:bg-primary-dark transition-colors shadow-lg"
              >
                {ctaText}
              </a>
            ) : (
              <Button asChild className="rounded-full min-h-11">
                <Link href="/lead">לבחירת מדריך שזמין עכשיו</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden />
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">מה מתאים אחרי המדריך?</h2>
            <p className="text-pretty text-lg text-primary-foreground/85 max-w-2xl mx-auto leading-relaxed">
              אפשר להישאר בתרגול עצמי, לבחור מסלול לימוד מובנה או לבדוק התאמה לליווי אישי.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "להמשיך לבד", desc: "עוד כלים חינמיים לתרגול בקצב שלך.", href: "/resources", label: "למשאבים" },
              { title: "ללמוד בדרך מובנית", desc: "להכיר את תוכנית הדרך ואת מבנה 12 השבועות.", href: "/programs/the-way", label: "לתוכנית הדרך" },
              { title: "לקבל התאמה אישית", desc: "לברר בשיחה אם ליווי אישי מתאים לצורך הנוכחי.", href: "/coaching", label: "להכיר את הליווי" },
            ].map((option) => (
              <Card key={option.title} className="border-white/20 bg-white/10 text-primary-foreground">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{option.title}</h3>
                  <p className="text-sm text-primary-foreground/80 leading-relaxed mb-5">{option.desc}</p>
                  <Link href={option.href} className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">
                    {option.label}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
