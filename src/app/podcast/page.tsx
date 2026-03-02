import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "מוצאים אהבה! - הפודקאסט של אומנות הקשר",
  description:
    "פודקאסט מוצאים אהבה! עם אלעד יעקובוביץ׳ - שיחות כנות על זוגיות, דייטינג, תקשורת וכל מה שלא לימדו אותך על קשרים. האזן ב-Spotify וב-SoundCloud.",
  alternates: {
    canonical: "/podcast",
  },
  openGraph: {
    title: "מוצאים אהבה! - הפודקאסט | אומנות הקשר",
    description:
      "שיחות כנות על זוגיות, דייטינג, תקשורת וכל מה שלא לימדו אותך על קשרים.",
    url: "/podcast",
    locale: "he_IL",
    type: "website",
  },
};

const podcastTopics = [
  {
    title: "למה אתה עדיין רווק (התשובה האמיתית)",
    description: "נפרק את 5 הסיבות הכי נפוצות - ולא, ׳לא מצאתי את האחת׳ זו לא אחת מהן.",
  },
  {
    title: "דייטינג באפליקציות - מה שבאמת עובד",
    description: "מעבר לטיפים על תמונות - אסטרטגיה שלמה לדייטינג דיגיטלי.",
  },
  {
    title: "השיחה הראשונה - איך לא לפחד מקרבה",
    description: "למה רוב האנשים בורחים מקרבה, ואיך להפוך את הפחד לכוח.",
  },
  {
    title: "״היא לא הטיפוס שלי״ - הטעות שעולה לך בזוגיות",
    description: "למה ׳טיפוס׳ זה בעצם דפוס, ואיך לשבור אותו.",
  },
  {
    title: "מה נשים באמת רוצות (שאלנו אותן)",
    description: "שיחה כנה עם נשים על מה באמת חשוב להן - מעבר לגובה וחשבון בנק.",
  },
  {
    title: "אחרי הגירושין - איך חוזרים למשחק",
    description: "דייטינג בגיל 35+ אחרי פרידה - אתגרים ייחודיים ופתרונות מעשיים.",
  },
];

export default function PodcastPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "פודקאסט" }]} />
      </div>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/podcast-hero.jpg"
            alt="מוצאים אהבה - הפודקאסט של אומנות הקשר"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 text-white border-white/30">
              הפודקאסט
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
              מוצאים אהבה!
              <br />
              <span className="text-accent-light">הפודקאסט של אומנות הקשר</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              שיחות אמיתיות על זוגיות, דייטינג, תקשורת וכל מה שלא לימדו אותך
              בבית ספר. בלי קלישאות, בלי בולשיט - רק אמת.
            </p>

            {/* Podcast microphone image */}
            <div className="flex items-center justify-center mb-10">
              <div className="relative w-32 h-32 rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="/images/generated/podcast-microphone.jpg"
                  alt="מיקרופון פודקאסט"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Listening platforms */}
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://open.spotify.com/show/2mXzv3AS0rZw7eTCVjEbyZ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#1DB954] text-white rounded-full font-semibold hover:bg-[#1aa34a] transition-colors shadow-md"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                האזן ב-Spotify
              </a>
              <a
                href="https://soundcloud.com/ohlovelive"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#FF5500] text-white rounded-full font-semibold hover:bg-[#e64d00] transition-colors shadow-md"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 15.104l.172 1.955c.013.06.045.094.104.094s.09-.038.104-.094l.195-1.955-.195-1.957c-.013-.057-.045-.094-.104-.094m1.8-.725c-.066 0-.113.05-.12.116l-.216 2.661.216 2.6c.008.063.054.113.12.113.065 0 .113-.05.12-.113l.246-2.6-.246-2.661c-.007-.066-.055-.116-.12-.116m.9-.125c-.075 0-.128.055-.133.13l-.192 2.786.192 2.75c.005.074.058.129.133.129.074 0 .127-.055.133-.13l.218-2.749-.218-2.786c-.006-.075-.059-.13-.133-.13m.9-.075c-.083 0-.142.063-.146.147l-.168 2.861.168 2.883c.004.085.063.147.146.147.082 0 .142-.063.146-.147l.19-2.883-.19-2.861c-.004-.084-.064-.147-.146-.147M6.9 11.1c-.09 0-.153.07-.157.157l-.145 3.847.145 3.795c.004.09.068.155.157.155.088 0 .152-.065.156-.155l.165-3.795-.165-3.847c-.004-.089-.068-.157-.156-.157m.901-.125c-.099 0-.168.076-.172.174l-.12 3.972.12 3.898c.004.099.073.174.172.174.097 0 .167-.075.171-.174l.136-3.898-.136-3.972c-.004-.099-.074-.174-.171-.174m.9.125c-.107 0-.183.083-.186.19l-.096 3.847.096 3.838c.003.109.079.19.186.19.106 0 .182-.081.186-.19l.108-3.838-.108-3.847c-.004-.107-.08-.19-.186-.19m.9-.25c-.115 0-.197.09-.2.207l-.073 4.097.073 4.04c.003.117.085.207.2.207.114 0 .196-.09.2-.207l.083-4.04-.083-4.097c-.004-.117-.086-.207-.2-.207m.9-.125c-.123 0-.21.097-.214.223l-.05 4.222.05 4.157c.004.127.091.223.214.223.122 0 .209-.096.213-.223l.057-4.157-.057-4.222c-.004-.126-.091-.223-.213-.223m.9-.25c-.131 0-.224.104-.228.238l-.026 4.472.026 4.397c.004.136.097.238.228.238.13 0 .223-.102.227-.238l.03-4.397-.03-4.472c-.004-.134-.097-.238-.227-.238m.9.125c-.139 0-.238.111-.241.253l-.003 4.347.003 4.27c.003.143.102.253.241.253.138 0 .237-.11.24-.253l.004-4.27-.004-4.347c-.003-.142-.102-.253-.24-.253m.9-.25c-.147 0-.252.118-.255.268v4.597l.003 4.363c.003.151.108.268.252.268.147 0 .252-.117.255-.268l.003-4.363-.003-4.597c-.003-.15-.108-.268-.255-.268m.9.25c-.156 0-.267.125-.269.284v4.347l.003 4.386c.002.16.113.284.269.284.155 0 .266-.124.268-.284l.003-4.386-.003-4.347c-.002-.159-.113-.284-.268-.284m.9-.375c-.164 0-.281.131-.284.298v4.722l.003 4.406c.003.168.12.298.281.298.162 0 .279-.13.282-.298l.003-4.406-.003-4.722c-.003-.167-.12-.298-.282-.298m.9.25c-.172 0-.295.138-.297.313v4.472l.003 4.414c.002.176.125.313.294.313.169 0 .292-.137.294-.313l.003-4.414-.003-4.472c-.002-.175-.125-.313-.294-.313m.9-.125c-.18 0-.309.145-.311.328v4.597l.003 4.423c.002.184.131.328.308.328.177 0 .306-.144.308-.328l.003-4.423-.003-4.597c-.002-.183-.131-.328-.308-.328m.9.625c-.188 0-.323.152-.325.343v3.972l.003 4.357c.002.191.137.343.322.343.186 0 .32-.152.322-.343l.003-4.357-.003-3.972c-.002-.191-.136-.343-.322-.343" />
                </svg>
                האזן ב-SoundCloud
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              מה תמצא <span className="text-primary">בפודקאסט</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                title: "שיחות כנות",
                description:
                  "שיחות עומק על מה שבאמת קורה בעולם הדייטינג. בלי פילטרים, בלי קלישאות.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "כלים מעשיים",
                description:
                  "כל פרק כולל משהו שאפשר ליישם מיד. טיפ, תרגיל, או שינוי בגישה שאפשר להתחיל איתו היום.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "אורחים אמיתיים",
                description:
                  "מומחים, אנשים שעברו את הדרך, ושיחות שמאירות פרספקטיבות חדשות על זוגיות.",
              },
            ].map((item, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              נושאים
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              על מה <span className="text-primary">מדברים</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {podcastTopics.map((topic, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/20 transition-colors">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            מוכן לצעד הבא?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-xl mx-auto leading-relaxed">
            הפודקאסט נותן את ההשראה. הליווי האישי עושה את השינוי.
            שיחת היכרות של 30+ דקות, בחינם, בלי התחייבות.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/coaching"
              className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
            >
              לשיחת היכרות חינם
            </Link>
            <a
              href="https://open.spotify.com/show/2mXzv3AS0rZw7eTCVjEbyZ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-10 py-4 border-2 border-white/50 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              האזן עכשיו
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
