"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Breadcrumbs } from "@/components/Breadcrumbs";

type GalleryCategory = "הכל" | "סדנאות" | "אירועים" | "זוגיות";

interface GalleryItem {
  id: number;
  title: string;
  category: Exclude<GalleryCategory, "הכל">;
  gradient: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "סדנת תקשורת זוגית",
    category: "סדנאות",
    gradient: "from-primary/60 to-accent/40",
    description: "סדנה אינטימית לפיתוח כלי תקשורת מעשיים לזוגות",
  },
  {
    id: 2,
    title: "ערב זוגות חגיגי",
    category: "אירועים",
    gradient: "from-secondary/60 to-primary/40",
    description: "ערב מיוחד לחיזוק הקשר בין בני זוג באווירה חמה",
  },
  {
    id: 3,
    title: "רגע של חיבור",
    category: "זוגיות",
    gradient: "from-accent/60 to-secondary/40",
    description: "רגעים של קשר אמיתי בין בני זוג במהלך התהליך",
  },
  {
    id: 4,
    title: "סדנת הקשבה פעילה",
    category: "סדנאות",
    gradient: "from-primary-light/60 to-secondary/40",
    description: "למידת טכניקות הקשבה שמחברות ומעמיקות את הקשר",
  },
  {
    id: 5,
    title: "כנס שנתי לזוגות",
    category: "אירועים",
    gradient: "from-secondary-dark/60 to-accent/40",
    description: "הכנס השנתי שלנו עם מרצים מובילים בתחום הזוגיות",
  },
  {
    id: 6,
    title: "תרגול בזוגות",
    category: "זוגיות",
    gradient: "from-accent-dark/60 to-primary/40",
    description: "תרגילים מעשיים שעוזרים לבני זוג לתרגל תקשורת חדשה",
  },
  {
    id: 7,
    title: "סדנת ניהול קונפליקטים",
    category: "סדנאות",
    gradient: "from-primary/50 to-primary-light/60",
    description: "כלים להפוך ויכוחים לשיחות בונות ומחברות",
  },
  {
    id: 8,
    title: "מפגש הכרות קהילתי",
    category: "אירועים",
    gradient: "from-secondary/50 to-secondary-light/60",
    description: "מפגשים קהילתיים ליצירת רשת תמיכה חברתית",
  },
  {
    id: 9,
    title: "צמיחה משותפת",
    category: "זוגיות",
    gradient: "from-accent/50 to-accent-light/60",
    description: "תהליכי צמיחה משותפים שמעמיקים את האינטימיות הרגשית",
  },
  {
    id: 10,
    title: "סדנת שפות אהבה",
    category: "סדנאות",
    gradient: "from-primary-dark/60 to-accent/50",
    description: "גילוי שפות האהבה האישיות ולמידה לדבר בשפה של הזולת",
  },
  {
    id: 11,
    title: "הרצאה פתוחה",
    category: "אירועים",
    gradient: "from-secondary/60 to-primary-light/50",
    description: "הרצאות פתוחות לקהל הרחב על תקשורת בריאה בזוגיות",
  },
  {
    id: 12,
    title: "חיבור מחדש",
    category: "זוגיות",
    gradient: "from-accent/60 to-primary-dark/50",
    description: "תהליך חיבור מחדש לזוגות שרוצים לרענן את הקשר",
  },
];

const categories: GalleryCategory[] = ["הכל", "סדנאות", "אירועים", "זוגיות"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("הכל");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === "הכל"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "גלריה" }]} />
      </div>

      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge
            variant="outline"
            className="mb-4 text-primary border-primary/30"
          >
            הגלריה שלנו
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            רגעים של <span className="text-primary">חיבור</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            תמונות מסדנאות, אירועים ורגעים מיוחדים של זוגות בתהליך
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="סינון לפי קטגוריה">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`px-6 py-2.5 rounded-full font-medium text-sm transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                aria-label={`פתח תמונה: ${item.title} - ${item.description}`}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {/* Gradient Placeholder */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
                />

                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/30 rounded-full" />
                  <div className="absolute bottom-6 left-6 w-10 h-10 border-2 border-white/20 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/10 rounded-full" />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200" />

                {/* Content */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
                  <Badge className="mb-2 bg-white/20 text-white border-none text-xs">
                    {item.category}
                  </Badge>
                  <h3 className="text-white font-semibold text-lg leading-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Hover icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                אין תמונות בקטגוריה זו כרגע
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog
        open={selectedItem !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedItem(null);
        }}
      >
        <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
          {selectedItem && (
            <>
              {/* Image area */}
              <div
                className={`aspect-video bg-gradient-to-br ${selectedItem.gradient} relative`}
              >
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-8 right-8 w-24 h-24 border-2 border-white/30 rounded-full" />
                  <div className="absolute bottom-8 left-8 w-16 h-16 border-2 border-white/20 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/10 rounded-full" />
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge className="bg-white/20 text-white border-none">
                    {selectedItem.category}
                  </Badge>
                </div>
              </div>
              {/* Info area */}
              <div className="p-6">
                <DialogTitle className="text-xl font-bold mb-2">
                  {selectedItem.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground leading-relaxed">
                  {selectedItem.description}
                </DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            רוצים להיות חלק מהסיפור?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
            הצטרפו למאות זוגות שכבר עברו את התהליך
          </p>
          <Link
            href="/contact"
            className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
          >
            לקביעת פגישת היכרות
          </Link>
        </div>
      </section>
    </>
  );
}
