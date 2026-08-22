import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckoutForm } from "@/components/CheckoutForm";
import { CourseFAQ } from "@/components/CourseFAQ";
import { getProduct } from "@/lib/products";
import { PRODUCT_FACTS } from "@/lib/product-facts";
import { COURSE_PHASE_ILLUSTRATIONS } from "@/generated/course-phase-illustrations";

const product = getProduct("the-way")!;

export const metadata: Metadata = {
  title: `${product.nameHe} | אומנות הקשר`,
  description:
    `תוכנית הדרך — ${PRODUCT_FACTS.course.weeks} שבועות ו־${PRODUCT_FACTS.course.phases} שלבים של תוכן, תרגול ורפלקציה סביב תקשורת, היכרות וקשר.`,
  alternates: { canonical: product.path },
  openGraph: {
    title: `${product.nameHe} | אומנות הקשר`,
    description: "תוכנית הדרך — 12 שבועות של תוכן, תרגול וליווי בתהליך אישי.",
    url: product.path,
    type: "website",
  },
};

const stages = [
  {
    num: "01",
    weeks: "שבועות 1-3",
    title: "גישה",
    desc: "פתיחת המסע, מיפוי סיפורים ואמונות, עבודה עם פחדים ויצירת בסיס אישי לתהליך.",
    visual: COURSE_PHASE_ILLUSTRATIONS[0],
  },
  {
    num: "02",
    weeks: "שבועות 4-5",
    title: "תקשורת",
    desc: "הכרת עצמי, צרכים ורגשות, תקשורת מקרבת, קונפליקטים ושפות אהבה.",
    visual: COURSE_PHASE_ILLUSTRATIONS[1],
  },
  {
    num: "03",
    weeks: "שבועות 6-9",
    title: "מעבר ומשיכה",
    desc: "לעבור מעבודה פנימית לפעולה מדורגת: יצירת הזדמנויות, נוכחות, היכרות אונליין ובחירה בטוחה בדייטים.",
    visual: COURSE_PHASE_ILLUSTRATIONS[2],
  },
  {
    num: "04",
    weeks: "שבוע 10",
    title: "חיבור וכימיה",
    desc: "לתרגל הקשבה, שאלות וסקרנות הדדית, ולהבחין בין חיבור, משיכה, התאמה ובטיחות.",
    visual: COURSE_PHASE_ILLUSTRATIONS[3],
  },
  {
    num: "05",
    weeks: "שבוע 11",
    title: "אינטימיות",
    desc: "לבנות קרבה בהדרגה, עם פרטיות, הסכמה, גבולות ואפשרות לעצור או לבחור חלופה.",
    visual: COURSE_PHASE_ILLUSTRATIONS[4],
  },
  {
    num: "06",
    weeks: "שבוע 12",
    title: "מחויבות",
    desc: "לקבל החלטות מתוך בהירות והדדיות, לנהל שיחה על הקשר ולבנות תוכנית המשך אישית.",
    visual: COURSE_PHASE_ILLUSTRATIONS[5],
  },
];

const includes = [
  {
    title: `${PRODUCT_FACTS.course.lmsMappedLessons} שיעורים מסודרים`,
    desc: `תוכן הלמידה הפעיל מסודר לאורך ${PRODUCT_FACTS.course.weeks} שבועות ו־${PRODUCT_FACTS.course.phases} שלבים, עם מקום לחזרה ולא רק לצפייה רציפה.`,
  },
  {
    title: `${PRODUCT_FACTS.course.practicePdfs} דפי תרגול`,
    desc: "מסמכים להורדה שמתרגמים רעיון לפעולה, כתיבה או שיחה — עם בחירה מה מתאים לבצע ומה עדיף לדחות.",
  },
  {
    title: "רפלקציה ובדיקת הבנה",
    desc: "שאלות ותרגילים שעוזרים לחבר את החומר לחיים שלך, בלי להפוך את התשובות לציון על האישיות או על המוכנות לקשר.",
  },
  {
    title: "ליווי וקהילה לפי המחזור",
    desc: "הערוצים, הזמינות, המפגשים וכללי הפרטיות יוצגו במפורש לפני ההצטרפות — ורק מה שאושר יהיה חלק מההצעה.",
  },
];

// Folded 2026-07-09 from the legacy /hadrech page (canonical merge) — the
// differentiation copy Elad's audience already responded to.
const comparison = [
  {
    approach: "אפליקציות דייטינג",
    description: "נותנות הזדמנויות להיכרות, אך לא תמיד כוללות מסגרת לתרגול תקשורת, בחירה ועיבוד חוויות מדייטים.",
    verdict: "אפשר לשלב עם תרגול לפני ואחרי מפגש",
  },
  {
    approach: "אתרי היכרויות",
    description: "עשויים לספק התאמות ופרטי קשר, אך אינם בהכרח כוללים עבודה אישית על צרכים ודפוסים.",
    verdict: "מקור להיכרויות, לא תחליף ללמידה",
  },
  {
    approach: "טיפול פסיכולוגי",
    description: "עשוי לסייע בהבנה ובעבודה רגשית. לא כל מסגרת טיפולית כוללת תרגול ממוקד בדייטינג או משוב סמוך לאירוע.",
    verdict: "מתאים לצרכים טיפוליים ומקצועיים",
  },
  {
    approach: "ספרי עזרה עצמית",
    description: "יכולים לספק רעיונות וכלים, אך אינם כוללים התאמה אישית, תרגול מודרך או משוב על היישום.",
    verdict: "דרך נגישה להעמקה עצמאית",
  },
];

const weeklyRhythm = [
  {
    title: "לומדים רעיון אחד",
    desc: "מתחילים במקבץ שיעורים של אותו שבוע ומזהים מה רלוונטי עכשיו — בלי צורך לזכור הכול.",
  },
  {
    title: "בוחרים תרגול",
    desc: "מנסים פעולה, כתיבה או שיחה אחת. מותר להתאים, לדלג או לבחור חלופה בטוחה.",
  },
  {
    title: "עוצרים להתבונן",
    desc: "בודקים מה קרה בפועל: מה עזר, מה עורר קושי ומה כדאי לשנות בניסיון הבא.",
  },
  {
    title: "ממשיכים בצעד קטן",
    desc: "מסכמים החלטה אחת לשבוע הבא, כך שהלמידה מצטברת בלי להפוך למרוץ לסיום התוכן.",
  },
];

export default function TheWayProgramPage() {
  return (
    <>
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs
          items={[
            { label: "תוכניות", href: "/programs" },
            { label: product.nameHe },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/hadrech-hero.jpg"
            alt="תוכנית הדרך — מסלול תוכן, תרגול וליווי"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-5 text-white border-white/30 text-sm px-4 py-1.5">
              {PRODUCT_FACTS.course.weeks} שבועות · {PRODUCT_FACTS.course.phases} שלבי למידה
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight text-balance">
              12 שבועות של עבודה על זוגיות —{" "}
              <span className="text-accent-light">עם תוכן, תרגול וליווי</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed text-pretty">
              מסלול שמחבר התבוננות, מיומנויות ופעולה בעולם האמיתי — בקצב מדורג,
              עם אפשרות לעצור, לחזור ולבחור מה נכון לתרגל עכשיו.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#program-structure"
                className="inline-flex px-10 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg"
              >
                לראות איך התוכנית בנויה
              </a>
              <Link
                href="/resources"
                className="inline-flex px-8 py-4 border border-white/40 text-white rounded-full font-medium text-base hover:bg-white/10 transition-colors"
              >
                להכיר קודם את סגנון התוכן
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The six canonical course stages */}
      <section id="program-structure" className="py-20 md:py-24 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              מבנה הקורס — {PRODUCT_FACTS.course.phases} שלבים
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              מהתבוננות אישית ועד החלטות בקשר
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              כל שלב מוסיף שפה, תרגול ושאלות חדשות. המטרה אינה לסמן וי, אלא
              לחבר בין מה שלומדים לבין בחירות ושיחות בחיים עצמם.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {stages.map((s) => (
              <Card key={s.num} className="border-border/50 hover:shadow-md hover:border-primary/20 transition-all overflow-hidden">
                <div className="relative aspect-video bg-muted">
                  <Image
                    src={s.visual.src}
                    alt={s.visual.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-7">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-3xl font-bold text-primary/30 tabular-nums">{s.num}</span>
                    <span className="text-xs text-muted-foreground font-medium tracking-wide">{s.weeks}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed text-pretty">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* A practical weekly learning loop */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              איך נראה שבוע בתוכנית
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              לולאה פשוטה: ללמוד, לנסות, להתבונן, לבחור
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              התוכן נועד להפוך לתרגול שאפשר לבדוק ולשפר. לא חייבים לבצע כל משימה,
              ואין ציון על קצב או על בחירה לדלג.
            </p>
          </div>

          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {weeklyRhythm.map((item, index) => (
              <li key={item.title}>
                <Card className="border-border/50 h-full">
                  <CardContent className="p-6">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-bold mb-4 tabular-nums">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How the course can complement other forms of support */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 text-accent-dark border-accent/40">
                לבחור את המסגרת הנכונה
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                התוכנית יכולה להשתלב — לא להחליף כל דבר אחר
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                אפליקציות, ספרים וטיפול מקצועי יכולים לשרת מטרות חשובות. התוכנית
                מוסיפה רצף לימודי ותרגול, ואפשר לשלב אותה עם מסגרות אחרות כשזה מתאים.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-10">
              {comparison.map((item) => (
                <Card key={item.approach} className="border-border/50 h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">{item.approach}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3 text-pretty">
                      {item.description}
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-0 text-xs whitespace-normal text-right leading-relaxed"
                    >
                      {item.verdict}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-secondary/5 shadow-lg">
              <CardContent className="p-8 text-center">
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
                  תוכנית הדרך
                </Badge>
                <h3 className="text-2xl font-bold mb-4 text-balance">
                  עבודה פנימית + מיומנויות + ליווי + קהילה
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
                  הדרך משלבת עבודה אישית, כלים מעשיים להיכרויות, תרגול, משוב וקהילה.
                  היא אינה מחליפה טיפול או מבטיחה תוצאה; זו מסגרת לימודית ויישומית
                  שאפשר לבחון מול הצרכים והמצב האישי שלך.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core concept — "פנוי לקשר" (folded from legacy /hadrech) */}
      <section className="py-20 md:py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" aria-hidden />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/10">
              הרעיון המרכזי
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-balance">
              ״פנוי לקשר״ הוא לא ציון.
              <br />
              זו <span className="text-accent">שאלה שחוזרים אליה</span>.
            </h2>
            <p className="text-xl opacity-90 leading-relaxed mb-6 text-pretty">
              אפשר לרצות קשר ובאותו זמן להזדקק לעוד מרחב, ביטחון, תרגול או בהירות.
              זה לא אומר שמשהו בך מקולקל, ולא יוצר תווית קבועה של ״מוכן״ או ״לא מוכן״.
            </p>
            <p className="text-lg opacity-80 leading-relaxed text-pretty">
              התוכנית מציעה דרך לבדוק בכל שלב מה נחוץ עכשיו: גבול, שיחה, מיומנות,
              מנוחה או צעד קטן בעולם ההיכרויות. גם האטה ועצירה הן בחירות לגיטימיות.
            </p>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 text-accent-dark border-accent/40">
                מה כלול בתוכנית
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                ארבעה רכיבים שמחברים ידע ליישום
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-10">
              {includes.map((item) => (
                <Card key={item.title} className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6 md:p-8 text-center">
              <p className="text-lg font-bold mb-2">תכולת המחזור מאושרת לפני ההצטרפות</p>
              <p className="text-sm text-muted-foreground">
                ערוצי הליווי, מועדי המפגשים, הגישה לקהילה ותנאי הרכישה יוצגו יחד
                במסמך תנאים אחד. כך אפשר להשוות בין מה שצריך לבין מה שמוצע בפועל.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout form */}
      <section id="checkout" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-border/50 shadow-xl shadow-primary/5">
              <CardContent className="p-8 md:p-10">
                <div className="text-center mb-7">
                  <Badge variant="outline" className="mb-3 text-primary border-primary/30">
                    בדיקת זמינות
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 text-balance">{product.nameHe}</h2>
                  <p className="text-muted-foreground text-pretty">{product.taglineHe}</p>
                </div>

                <CheckoutForm />

                <div className="mt-7 pt-7 border-t border-border/50 text-center">
                  <p className="text-sm text-muted-foreground mb-3">לא בטוח/ה? צור/י קשר ישיר עם אלעד</p>
                  <Link
                    href="https://wa.me/972512518025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-secondary-dark hover:opacity-80 transition-opacity"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    שלח/י לי הודעה בוואטסאפ
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="bg-muted/30">
        <CourseFAQ />
      </div>

      {/* Let people sample the teaching style before choosing */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-balance">
            לא חייבים להחליט רק לפי עמוד מכירה
          </h2>
          <p className="text-muted-foreground mb-6 text-pretty">
            אפשר לקרוא מאמר, להכיר את הספר ולבדוק אם השפה, הקצב וסוג התרגול
            מתאימים לך לפני שבוחרים מסלול מלא.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/resources"
              className="inline-flex px-7 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary-dark transition-colors"
            >
              לקריאת תוכן פתוח
            </Link>
            <Link
              href="/book"
              className="inline-flex px-7 py-3 border border-primary/30 text-primary rounded-full font-semibold hover:bg-primary/5 transition-colors"
            >
              להכיר את הספר
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" aria-hidden />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            הצעד הבא צריך להתאים לחיים שלך
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto leading-relaxed text-pretty">
            אם מסגרת של {PRODUCT_FACTS.course.weeks} שבועות מתאימה כרגע, אפשר לבדוק את פרטי המחזור.
            אם לא — הספר והתוכן הפתוח הם דרכים טובות להתחיל בקצב עצמאי.
          </p>
          <a
            href="#checkout"
            className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
          >
            לבדוק את פרטי ההצטרפות
          </a>
        </div>
      </section>
    </>
  );
}
