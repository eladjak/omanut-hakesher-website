"use client";

import { MotionConfig } from "framer-motion";

/**
 * framer-motion writes transforms inline via rAF, so a CSS reduced-motion
 * belt (see WowMotion.tsx / wow.css) cannot reach it. `reducedMotion="user"`
 * makes every Motion component in this app respect the OS "reduce motion"
 * setting: transform and layout animations are skipped, only opacity is
 * animated.
 *
 * Mounted in the ROOT layout so it wraps every route.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
