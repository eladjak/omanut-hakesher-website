"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Graphic = {
  id: string;
  author: string;
  image_quote: string;
  role?: string;
  image: string;
  narrative?: string;
  outcome?: string;
  featured?: boolean;
};

export function TestimonialLightbox({ testimonials }: { testimonials: Graphic[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const current = testimonials.find((t) => t.id === openId);

  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openId, close]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.button
            key={t.id}
            onClick={() => setOpenId(t.id)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4), ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="group block w-full text-right rounded-2xl overflow-hidden border border-border/40 hover:border-primary/50 shadow-sm hover:shadow-xl transition-shadow bg-card focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={`קרא עדות מלאה של ${t.author}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={t.image}
                alt={`עדות ${t.author}`}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg mb-1">{t.author}</h3>
              {t.outcome && (
                <p className="text-sm text-primary font-medium mb-2">{t.outcome}</p>
              )}
              <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">
                {t.image_quote}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-background rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90dvh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={close}
                className="absolute top-4 left-4 size-10 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary z-10"
                aria-label="סגור"
              >
                <X className="size-5" />
              </button>
              <div className="bg-secondary/5 p-6 md:p-8">
                <img
                  src={current.image}
                  alt={`עדות ${current.author}`}
                  className="w-full h-auto rounded-xl shadow-md max-h-[50dvh] object-contain mx-auto"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 id="lightbox-title" className="text-2xl md:text-3xl font-bold mb-2">
                  {current.author}
                </h3>
                {current.outcome && (
                  <p className="text-primary font-semibold mb-4">{current.outcome}</p>
                )}
                <blockquote className="text-lg leading-relaxed text-pretty border-r-4 border-primary/40 pr-4 mb-4 italic-quote">
                  &ldquo;{current.image_quote}&rdquo;
                </blockquote>
                {current.narrative && (
                  <p className="text-muted-foreground leading-relaxed text-pretty">
                    {current.narrative}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
