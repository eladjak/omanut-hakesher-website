"use client";

import type { JSX } from "react";
import { useGender } from "@/components/GenderProvider";
import { t } from "@/lib/gendered-content";

interface GenderedTextProps {
  /** Key from the genderedContent registry in src/lib/gendered-content.ts */
  id: string;
  /** HTML tag to render. Defaults to "span". */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

/**
 * Renders a locale-aware Hebrew string based on the visitor's selected gender.
 *
 * Usage:
 *   <GenderedText id="cta.ready" as="h2" className="text-3xl font-bold" />
 */
export function GenderedText({
  id,
  as: Tag = "span",
  className,
}: GenderedTextProps) {
  const { gender } = useGender();
  return <Tag className={className}>{t(id, gender)}</Tag>;
}
