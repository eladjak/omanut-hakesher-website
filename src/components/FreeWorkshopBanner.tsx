"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

function getNextWorkshopDate(): Date {
  const now = new Date();
  // Set target to next month, first Saturday at 10:00
  const target = new Date(now.getFullYear(), now.getMonth() + 1, 1, 10, 0, 0);
  // Find the first Saturday
  while (target.getDay() !== 6) {
    target.setDate(target.getDate() + 1);
  }
  // If already past, move to the month after
  if (target <= now) {
    target.setMonth(target.getMonth() + 1);
    target.setDate(1);
    while (target.getDay() !== 6) {
      target.setDate(target.getDate() + 1);
    }
  }
  return target;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const diff = targetDate.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[60px]">
      <div className="text-2xl md:text-3xl font-bold tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs md:text-sm opacity-80 mt-1">{label}</div>
    </div>
  );
}

export function FreeWorkshopBanner() {
  const [targetDate] = useState(() => getNextWorkshopDate());
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-l from-primary via-primary-dark to-primary text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/20 mb-4">
            הרשמה חינם
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            סדנת היכרות חינמית
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
            הצטרפו לסדנה חינמית בנושא &quot;5 מפתחות לתקשורת זוגית
            טובה&quot; וגלו כלים מעשיים שתוכלו ליישם מיד
          </p>

          {/* Countdown */}
          <div className="flex justify-center gap-4 md:gap-6 mb-8">
            <CountdownUnit value={timeLeft.days} label="ימים" />
            <div className="text-2xl md:text-3xl font-bold self-start mt-1">
              :
            </div>
            <CountdownUnit value={timeLeft.hours} label="שעות" />
            <div className="text-2xl md:text-3xl font-bold self-start mt-1">
              :
            </div>
            <CountdownUnit value={timeLeft.minutes} label="דקות" />
            <div className="text-2xl md:text-3xl font-bold self-start mt-1">
              :
            </div>
            <CountdownUnit value={timeLeft.seconds} label="שניות" />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex px-8 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
            >
              הרשמו עכשיו - חינם
            </Link>
            <Link
              href="/services#workshops"
              className="inline-flex px-8 py-4 border-2 border-white/50 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              פרטים נוספים
            </Link>
          </div>

          <p className="text-sm opacity-70 mt-4">
            מקומות מוגבלים | ללא התחייבות | אונליין
          </p>
        </div>
      </div>
    </section>
  );
}
