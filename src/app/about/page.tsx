import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AboutFAQ } from "@/components/AboutFAQ";

export const metadata: Metadata = {
  title: "אודות אלעד יעקובוביץ׳ | הסיפור מאחורי אומנות הקשר",
  description:
    "הכירו את אלעד יעקובוביץ׳ - מנטור למציאת זוגיות עם ~20 שנות רקע בתחום הבמה ו-15+ שנות ניסיון בליווי רווקים לזוגיות מאושרת.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "אודות אלעד יעקובוביץ׳ | הסיפור מאחורי אומנות הקשר",
    description:
      "הכירו את אלעד יעקובוביץ׳ - מנטור למציאת זוגיות עם ~20 שנות רקע בתחום הבמה ו-15+ שנות ניסיון בליווי רווקים לזוגיות מאושרת.",
    url: "/about",
    locale: "he_IL",
    type: "website",
  },
};

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    title: "אמת",
    description:
      "אני לא הולך לספר לך מה שנעים לשמוע. אני הולך לספר לך מה שצריך לשמוע. ישירות, בלי בולשיט.",
    color: "bg-accent/10 text-accent-dark",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "כלים",
    description:
      "כל פרק, כל מפגש, כל שיחה - כולל משהו שאפשר לעשות מחר בבוקר. לא תיאוריה מופשטת - כלים שעובדים.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    title: "כבוד",
    description:
      "אני לא הולך להטיף לך. הגעת לכאן כי אתה רוצה לשנות משהו - וזה לבד כבר אומר על הערך שלך.",
    color: "bg-secondary/10 text-secondary-dark",
  },
];

const credentials = [
  {
    title: "NLP מוסמך",
    description: "תכנות נוירו-לשוני - כלים לשינוי דפוסי חשיבה והתנהגות",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "CBT",
    description: "טיפול קוגניטיבי-התנהגותי - שיטה מבוססת מחקר לשינוי דפוסים",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "קואצ׳ יהודי",
    description: "אימון אישי המשלב ערכים ותובנות מהמסורת היהודית",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: "דמיון מודרך",
    description: "טכניקת הדמיה מונחית לפריצת חסמים רגשיים ומנטליים",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
];

const stats = [
  {
    number: "461",
    label: "זוגות שנוצרו",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    number: "15+",
    label: "שנות ניסיון בליווי",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "~20",
    label: "שנים על הבמה",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const mediaAppearances = [
  {
    name: "כוכב נולד עונה 10",
    type: "טלוויזיה",
    description: "הופעה בתוכנית המוזיקה הפופולרית",
  },
  {
    name: "רדיו 106FM",
    type: "רדיו",
    description: "ראיון ושיחה על זוגיות וקשרים",
  },
  {
    name: "שליש גן עדן",
    type: "טלוויזיה",
    description: "הופעה בתוכנית לחיפוש זוגיות",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "אודות" }]} />
      </div>

      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-muted to-background relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            הסיפור שלי
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            מרווק תקוע ל<span className="text-primary">מנטור זוגיות</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            הכירו את אלעד יעקובוביץ׳ - שחקן, מוזיקאי ובובנאי שהפך את המסע האישי שלו
            לדרך שכבר עזרה ל-461 זוגות למצוא אהבה
          </p>
        </div>
      </section>

      {/* Personal Story */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-3xl overflow-hidden">
                <Image
                  src="/assets/elad-photos/profile-current.jpg"
                  alt="אלעד יעקובוביץ׳ - מייסד אומנות הקשר"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full -z-10" />
            </div>

            {/* Story */}
            <div className="order-1 lg:order-2">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                הסיפור האישי
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                בגיל 20 הביטחון שלי היה <span className="text-primary">של ג׳וק</span>
              </h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  אני לא פסיכולוג. לא מטפל זוגי עם תואר שלישי. לא חוקר אקדמי שפרסם מאמרים
                  בכתבי עת. ואם אני ממש כנה - גם אני עשיתי את כל הטעויות שאני מלמד
                  להימנע מהן.
                </p>
                <p>
                  לפני שנים, ישבתי לבד בדירה שכורה בתל אביב, אחרי עוד פרידה, עוד דייט כושל,
                  עוד תקופה של &quot;אולי עכשיו זה יקרה&quot;. הייתי בשיא הקריירה. חברים טובים,
                  תחביבים, כושר גופני - על הנייר, הכל היה מושלם. חוץ מהדבר הזה. הזוגיות.
                </p>
                <p>
                  בגיל 20, הביטחון העצמי שלי היה של ג׳וק. ברצינות. הייתי נכנס לאירוע ומרגיש
                  שכולם מסתכלים עליי ושופטים. הייתי רואה בחורה שמושכת אותי ומיד מוצא
                  סיבה למה &quot;עכשיו זה לא הזמן הנכון לגשת&quot;. שנים של בדידות. של תחושה
                  שמשהו לא בסדר איתי.
                </p>
                <p className="text-foreground font-medium">
                  ואז הבנתי משהו שנשמע ברור כמו אור יום: הבעיה הייתה לא מה שעשיתי -
                  אלא מה שלא הבנתי על עצמי. לא הייתי צריך עוד אפליקציה. הייתי צריך דרך.
                </p>
                <p>
                  היום אני נשוי באושר, ועוזר לאחרים לעשות את אותו המסע.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artistic Background */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <Badge variant="outline" className="mb-4 text-accent-dark border-accent/30">
                הרקע הייחודי
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ~20 שנה על <span className="text-primary">הבמה</span>
              </h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  לפני שהתחלתי ללוות אנשים לזוגיות, חייתי כמעט 20 שנה בעולם הבמה -
                  כשחקן, מוזיקאי ובובנאי. זה לא סתם &quot;עבודה קודמת&quot;. זה מה שעיצב את
                  הדרך שבה אני רואה קשרים בין אנשים.
                </p>
                <p>
                  על הבמה למדתי שדברים שנראים פשוטים דורשים עבודה עמוקה. שכדי ליצור
                  חיבור אמיתי עם קהל - צריך קודם כל להיות אמיתי עם עצמך. שפגיעות היא
                  לא חולשה - היא הדבר הכי חזק שאפשר להביא לכל מערכת יחסים.
                </p>
                <p className="text-foreground font-medium">
                  השם &quot;אומנות הקשר&quot; הוא לא מקרי - הוא מחבר בין שני העולמות שלי.
                  האומנות על הבמה לימדה אותי על חיבור, ביטוי אותנטי ופגיעות.
                  את אותם הכלים בדיוק אני מביא לעבודה עם הרווקים והרווקות שמגיעים אליי.
                </p>
              </div>

              {/* Stage roles */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
                  שחקן
                </Badge>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 px-4 py-1.5">
                  מוזיקאי
                </Badge>
                <Badge variant="secondary" className="bg-accent/10 text-accent-dark border-accent/20 px-4 py-1.5">
                  בובנאי
                </Badge>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/generated/about-journey.jpg"
                  alt="אלעד יעקובוביץ׳ - מהבמה לליווי זוגיות"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent/20 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* The Method - HaDerech */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              השיטה
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              איך נולדה <span className="text-primary">״הדרך״</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              לא טיפים מפוזרים - דרך שלמה ומובנית שנבנתה מניסיון בשטח עם מאות אנשים
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="border-border/50">
              <CardContent className="p-8 md:p-10">
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    רוב העצות על זוגיות הן חסרות תועלת.
                    &quot;תהיה עצמך&quot; - אבל מי אני בעצם?
                    &quot;זה יגיע כשתפסיק לחפש&quot; - אז בינתיים מה, אני יושב על הספה?
                    &quot;תצא יותר&quot; - עוד 50 דייטים כושלים ישנו משהו?
                  </p>
                  <p>
                    הבעיה עם רוב הגישות היא שהן מתייחסות לסימפטום ולא למחלה.
                    הן אומרות לך מה לעשות, בלי לטפל בלמה.
                  </p>
                  <p className="text-foreground font-medium">
                    אז פיתחתי את &quot;הדרך&quot; - מסע מובנה ב-4 שלבים. לא מתוך ספרי לימוד,
                    אלא מתוך עבודה אישית עם מאות אנשים. מתוך ניסיון, טעויות, לימוד מטובי
                    המומחים בעולם, ובעיקר - מתוך הקשבה אמיתית למה שעובד ומה שלא.
                  </p>
                </div>

                {/* 4 Steps */}
                <div className="grid sm:grid-cols-2 gap-4 mt-10">
                  {[
                    { step: "01", title: "מבפנים החוצה", desc: "הכרת עצמך, שבירת סיפורים מגבילים, הבנת הפחדים שחוסמים" },
                    { step: "02", title: "שפת החיבור", desc: "תקשורת רגשית, גבולות בריאים, אינטימיות ופגיעות" },
                    { step: "03", title: "המפגש", desc: "כלים מעשיים לדייטינג, יצירת כימיה אמיתית, היכרויות שמובילות" },
                    { step: "04", title: "בניית קשר", desc: "מחויבות כהחלטה, שמירה על הקשר, בניית זוגיות שנמשכת" },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="p-5 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/20 transition-colors"
                    >
                      <span className="text-3xl font-bold text-primary/20">{item.step}</span>
                      <h3 className="text-lg font-semibold mt-2 mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              הכשרות והסמכות
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              לא מהאקדמיה - <span className="text-primary">מהשטח</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              אני לא פסיכולוג ולא מטפל קליני. אני מגיע מהשטח, עם הכשרות מקצועיות
              שנבחרו כי הן עובדות
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {credentials.map((cred, index) => (
              <Card key={index} className="border-border/50 hover:shadow-md transition-all duration-200 text-center">
                <CardContent className="p-6">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                    {cred.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{cred.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{cred.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="inline-flex p-3 rounded-full bg-white/10 mb-3">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Appearances */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              בתקשורת
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              הופעות <span className="text-primary">תקשורתיות</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {mediaAppearances.map((media, index) => (
              <Card key={index} className="border-border/50 hover:shadow-md transition-all duration-200 text-center">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary border-0 text-xs">
                    {media.type}
                  </Badge>
                  <h3 className="text-lg font-semibold mb-2">{media.name}</h3>
                  <p className="text-muted-foreground text-sm">{media.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              הגישה שלי
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              שלושה <span className="text-primary">עקרונות</span> שמנחים אותי
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ההתחייבות שלי לכל מי שנכנס לתהליך
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="border-border/50 hover:shadow-md transition-all duration-200 text-center">
                <CardContent className="p-8">
                  <div className={`inline-flex p-3 rounded-xl mb-5 ${value.color}`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Image */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-video rounded-3xl overflow-hidden">
                <Image
                  src="/images/generated/community.jpg"
                  alt="קהילת אומנות הקשר"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Text */}
            <div>
              <Badge variant="outline" className="mb-4 text-secondary border-secondary/30">
                הספר
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                הספר <span className="text-primary">&quot;אומנות הקשר&quot;</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  10 פרקים, 32 תרגילים מעשיים ועשרות סיפורים מהשטח.
                  לא עוד ספר טיפים - דרך שלמה ומובנית למציאת הזוגיות שמגיעה לך.
                </p>
                <p>
                  הספר מרכז את כל מה שלמדתי מ-15+ שנות ליווי רווקים ורווקות,
                  ומאפשר לכל אחד לצאת למסע - בקצב שלו, בזמן שלו.
                </p>
              </div>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
              >
                לפרטים על הספר
                <span>&larr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <AboutFAQ />

      {/* CTA */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">בוא נכיר</h2>
          <p className="text-xl opacity-90 mb-4 max-w-xl mx-auto leading-relaxed">
            שיחת היכרות של 30+ דקות, בחינם, בלי התחייבות.
          </p>
          <p className="text-lg opacity-80 mb-10 max-w-xl mx-auto leading-relaxed">
            אין פה מכירה בלחץ. אין טריקים. רק שיחה כנה על מה שאתה רוצה ואיך אני יכול לעזור.
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
