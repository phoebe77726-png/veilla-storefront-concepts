"use client";

import { type MotionValue, useScroll } from "motion/react";
import { createContext, useContext, useRef } from "react";

const HeroProgress = createContext<MotionValue<number> | null>(null);

/**
 * Scroll container for the hero. On desktop the section is taller than the
 * viewport and its content is pinned, so the part-reveal plays fully in view
 * while the headline and CTA stay put. On mobile it scrolls normally.
 */
export function HeroScene({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section ref={ref} aria-labelledby="hero-title" className={className}>
      <HeroProgress.Provider value={scrollYProgress}>{children}</HeroProgress.Provider>
    </section>
  );
}

export function useHeroProgress() {
  const value = useContext(HeroProgress);
  if (!value) throw new Error("useHeroProgress must be used inside <HeroScene>");
  return value;
}
