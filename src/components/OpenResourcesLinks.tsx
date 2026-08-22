import Link from "next/link";

interface OpenResourcesLinksProps {
  theme?: "light" | "dark";
  layout?: "row" | "stack";
  className?: string;
}

/**
 * A truthful public alternative while marketing signup has no approved list.
 * It gives visitors useful content immediately and collects no personal data.
 */
export function OpenResourcesLinks({
  theme = "light",
  layout = "row",
  className = "",
}: OpenResourcesLinksProps) {
  const isDark = theme === "dark";
  const stacked = layout === "stack";

  return (
    <nav
      aria-label="תוכן שאפשר לפתוח עכשיו"
      className={`flex ${stacked ? "flex-col sm:flex-row" : "flex-wrap"} gap-3 ${className}`}
    >
      <Link
        href="/lead"
        className={`inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-center text-sm font-semibold transition-colors ${
          isDark
            ? "bg-primary-light text-[#0F1729] hover:bg-primary hover:text-primary-foreground"
            : "bg-primary text-primary-foreground hover:bg-primary-dark"
        }`}
      >
        למדריכים הפתוחים
      </Link>
      <Link
        href="/resources"
        className={`inline-flex min-h-11 items-center justify-center rounded-full border px-6 py-3 text-center text-sm font-semibold transition-colors ${
          isDark
            ? "border-background/30 text-background hover:bg-background/10"
            : "border-border bg-background text-foreground hover:bg-muted"
        }`}
      >
        למאמרים ולפודקאסט
      </Link>
    </nav>
  );
}
