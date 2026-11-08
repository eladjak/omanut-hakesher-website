"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { categoryLabel, type TestimonialItem } from "@/lib/testimonials";

const categoryStyles: Record<TestimonialItem["category"], string> = {
  text: "bg-primary/10 text-primary border-primary/30",
  graphic: "bg-accent/15 text-accent-dark border-accent/40",
  couple: "bg-secondary/10 text-secondary border-secondary/30",
};

export function TestimonialCard({
  item,
  index,
}: {
  item: TestimonialItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.18, delay: Math.min(index * 0.03, 0.18), ease: "easeOut" }}
    >
      <Link
        href={`/sipurim/${item.slug}`}
        prefetch
        aria-label={`קרא את הסיפור המלא של ${item.name}`}
        className="group block rounded-2xl overflow-hidden bg-card border border-border/40 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      >
        <div
          className={`relative w-full bg-muted ${
            item.aspect === "portrait" ? "aspect-[4/5]" : "aspect-square"
          }`}
        >
          <Image
            src={item.image}
            alt={`עדות לקוח — ${item.name}`}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className={`${
              item.category === "text" ? "object-cover" : "object-contain object-top"
            } transition-transform duration-300 group-hover:scale-[1.03]`}
          />
          <div className="absolute top-3 right-3">
            <Badge
              variant="outline"
              className={`text-xs border ${categoryStyles[item.category]}`}
            >
              {categoryLabel(item.category)}
            </Badge>
          </div>
        </div>
        <div className="p-5 bg-card">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-3">{item.title}</p>
          <p className="text-sm leading-relaxed text-foreground/80 text-pretty line-clamp-2">
            {item.short_quote}
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
            <span>לסיפור המלא</span>
            <span aria-hidden style={{ transform: "scaleX(-1)" }}>
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
