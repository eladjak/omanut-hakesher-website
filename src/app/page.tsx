import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { blogPosts } from "@/lib/blog-posts";

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "ייעוץ זוגי",
    description: "מפגשים אישיים לזוגות לחיזוק הקשר, שיפור התקשורת והתמודדות עם אתגרים",
    href: "/services#couples",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "סדנאות קבוצתיות",
    description: "סדנאות מעשיות בקבוצות קטנות לפיתוח מיומנויות תקשורת וקשר",
    href: "/services#workshops",
    color: "bg-secondary/10 text-secondary-dark",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "ליווי אישי",
    description: "מפגשים פרטניים להתפתחות אישית ובניית יכולות לקשרים בריאים",
    href: "/services#individual",
    color: "bg-accent/10 text-accent-dark",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "פגישות אונליין",
    description: "גמישות מלאה עם אפשרות למפגשים מקוונים מכל מקום בעולם",
    href: "/services#online",
    color: "bg-primary-light/20 text-primary-dark",
  },
];

const courses = [
  {
    title: "יסודות התקשורת הזוגית",
    description: "קורס מקיף ללימוד עקרונות התקשורת הבסיסיים לבניית קשר בריא ומספק",
    lessons: 12,
    duration: "6 שבועות",
    level: "מתחילים",
  },
  {
    title: "ניהול קונפליקטים בזוגיות",
    description: "למדו להפוך ויכוחים להזדמנויות צמיחה עם טכניקות מוכחות",
    lessons: 8,
    duration: "4 שבועות",
    level: "כל הרמות",
  },
  {
    title: "בניית אינטימיות רגשית",
    description: "העמקת הקשר הרגשי עם בן/בת הזוג דרך תרגולים וכלים מעשיים",
    lessons: 10,
    duration: "5 שבועות",
    level: "מתקדמים",
  },
];

const testimonials = [
  {
    quote: "התהליך עם אומנות הקשר שינה את הזוגיות שלנו לחלוטין. למדנו להקשיב באמת אחד לשני ולדבר בצורה שמחברת.",
    author: "מיכל ודני",
    context: "זוג נשוי 8 שנים",
  },
  {
    quote: "הכלים שקיבלנו פשוטים ומעשיים. אנחנו משתמשים בהם כל יום ורואים את ההבדל. הויכוחים שלנו הפכו לשיחות בונות.",
    author: "רונית ויוסי",
    context: "לאחר שנתיים ביחד",
  },
  {
    quote: "גישה חמה ומקצועית. הרגשנו בטוחים לפתוח את הלב ולעבוד על הקשר שלנו. זו הייתה ההחלטה הכי טובה.",
    author: "שירה ואלון",
    context: "לפני החתונה",
  },
  {
    quote: "אחרי שנים של ניסיונות כושלים, סוף סוף מצאנו מקום שבו הדברים התחילו להשתנות באמת.",
    author: "יעל ומשה",
    context: "זוג עם ילדים",
  },
  {
    quote: "הסדנה הייתה חוויה מדהימה. למדתי כל כך הרבה על עצמי ועל הדרך שבה אני מתקשר.",
    author: "אורן",
    context: "משתתף בסדנה",
  },
  {
    quote: "הליווי האישי עזר לי להבין דפוסים שחזרו בכל הקשרים שלי. היום אני בקשר בריא ומספק.",
    author: "נעמה",
    context: "ליווי אישי",
  },
  {
    quote: "המפגשים האונליין היו נוחים ואפקטיביים. גם דרך המסך ההרגשה הייתה של קרבה ותמיכה אמיתית.",
    author: "דנה ורן",
    context: "פגישות אונליין",
  },
  {
    quote: "הגענו בזמן משבר קשה ויצאנו מחוזקים. הכלים שקיבלנו עוזרים לנו גם היום, שנתיים אחרי.",
    author: "תמר ואיתי",
    context: "ייעוץ זוגי",
  },
];

const stats = [
  { number: "500+", label: "זוגות ויחידים" },
  { number: "95%", label: "שביעות רצון" },
  { number: "10+", label: "שנות ניסיון" },
  { number: "50+", label: "סדנאות" },
];

const recentPosts = blogPosts.slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[92dvh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-bl from-primary-light/20 via-background to-secondary-light/10" />
        {/* Decorative shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-0 w-1/3 h-1/2 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-full pointer-events-none" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
              ליווי מקצועי לזוגות ויחידים
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-foreground">
              אומנות הקשר
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary mt-3">
              לבנות קשר עמוק שנמשך לאורך זמן
            </p>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              ליווי מקצועי לזוגות ויחידים בדרך לתקשורת אמיתית ומשמעותית.
              יחד נגלה את הכלים לחיבור עמוק יותר ולקשרים שמספקים.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
              >
                לקביעת פגישת היכרות
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold text-lg hover:bg-primary hover:text-white transition-colors"
              >
                השירותים שלנו
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-16 flex flex-wrap gap-8 md:gap-12">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* "Who I Am" Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Photo placeholder */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-muted-foreground/50">
                    <svg className="w-24 h-24 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-sm">תמונה</p>
                  </div>
                </div>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full -z-10" />
            </div>

            {/* Story */}
            <div>
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                מי אני
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                הסיפור מאחורי <span className="text-primary">אומנות הקשר</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  אומנות הקשר נולדה מתוך האמונה העמוקה שכל אדם וכל זוג יכולים
                  ליצור קשרים עמוקים ומשמעותיים. לאורך שנים של עבודה עם זוגות
                  ויחידים, ראיתי כיצד שינויים קטנים בתקשורת מביאים לשינוי עצום.
                </p>
                <p>
                  הגישה שלי משלבת ידע מקצועי מתחומי הפסיכולוגיה והתקשורת עם כלים
                  מעשיים שניתן ליישם בחיי היום-יום.
                </p>
              </div>

              {/* Credentials */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-secondary/10 text-secondary-dark border-secondary/20 px-3 py-1">
                  M.A בפסיכולוגיה
                </Badge>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary-dark border-secondary/20 px-3 py-1">
                  מטפלת זוגית מוסמכת
                </Badge>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary-dark border-secondary/20 px-3 py-1">
                  10+ שנות ניסיון
                </Badge>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 text-primary font-semibold hover:gap-3 transition-all"
              >
                קראו עוד על הגישה שלי
                <span>&larr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              מה אני מציעה
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              השירותים <span className="text-primary">שלנו</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              מגוון אפשרויות לליווי וצמיחה בתחום הזוגיות והתקשורת, מותאם אישית לצרכים שלכם
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Link key={index} href={service.href} className="group">
                <Card className="h-full border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200">
                  <CardContent className="p-8">
                    <div className={`inline-flex p-3 rounded-xl mb-5 ${service.color}`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-2 mt-5 text-primary font-medium group-hover:gap-3 transition-all">
                      למידע נוסף <span>&larr;</span>
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-accent-dark border-accent/30">
              בקרוב
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              קורסים <span className="text-primary">דיגיטליים</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              למידה עצמאית בקצב שלכם, עם כלים מעשיים שתוכלו ליישם מיד
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Card key={index} className="relative overflow-hidden border-border/50 hover:shadow-lg transition-all duration-200">
                {/* Coming soon badge */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-accent text-accent-foreground hover:bg-accent">
                    בקרוב
                  </Badge>
                </div>

                {/* Course image placeholder */}
                <div className="aspect-[16/9] bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/15" />

                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {course.description}
                  </p>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{course.lessons} שיעורים</span>
                    <span>{course.duration}</span>
                    <Badge variant="outline" className="text-xs">{course.level}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              המלצות
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              מה אומרים <span className="text-primary">עלינו</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              סיפורים אמיתיים של זוגות ויחידים שעברו את התהליך
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border/50 hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  {/* Quote mark */}
                  <div className="text-4xl text-primary/20 font-serif leading-none mb-3">&ldquo;</div>
                  <blockquote className="text-sm leading-relaxed mb-4">
                    {testimonial.quote}
                  </blockquote>
                  <Separator className="my-4" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-sm">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <cite className="not-italic font-semibold block text-sm">
                        {testimonial.author}
                      </cite>
                      <span className="text-xs text-muted-foreground">
                        {testimonial.context}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              לכל ההמלצות
              <span>&larr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              מהבלוג
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              מאמרים <span className="text-primary">אחרונים</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              טיפים, תובנות וכלים מעשיים בנושאי זוגיות ותקשורת
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="h-full overflow-hidden border-border/50 hover:shadow-lg transition-all duration-200">
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/15" />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 mt-4 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                      קראו עוד <span>&larr;</span>
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              לכל המאמרים
              <span>&larr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">הישארו מעודכנים</h2>
              <p className="text-muted-foreground mb-8">
                הירשמו לניוזלטר וקבלו טיפים, מאמרים ותוכן בלעדי ישירות למייל
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="האימייל שלכם"
                  className="flex-1 px-5 py-3 border border-border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  dir="ltr"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors text-sm"
                >
                  הרשמה לניוזלטר
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            מוכנים להתחיל את המסע?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed">
            פגישת היכרות ראשונה ללא התחייבות. בואו נכיר ונראה איך אפשר לעזור לכם
            לבנות את הקשר שאתם רוצים.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
            >
              לקביעת פגישה
            </Link>
            <Link
              href="/services"
              className="inline-flex px-10 py-4 border-2 border-white/50 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              למידע נוסף
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
