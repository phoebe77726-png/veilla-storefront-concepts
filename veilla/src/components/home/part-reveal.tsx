"use client";

import Image from "next/image";
import { m, useReducedMotion, useTransform } from "motion/react";
import { useHeroProgress } from "@/components/home/hero-scene";
import { photos } from "@/lib/photos";

const SIZES = "(min-width: 1024px) 52vw, 100vw";

/**
 * The hero's single signature interaction.
 * Scrolling draws an oil-coloured "part" down the still life, then the photo
 * parts along that line to reveal the applicator placing oil on a real part.
 * Reduced motion: the still life is shown on its own, with no movement.
 */
export function PartReveal() {
  const reduce = useReducedMotion();
  const scrollYProgress = useHeroProgress();

  const line = useTransform(scrollYProgress, [0.04, 0.26], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0.62, 0.78], [1, 0]);
  const left = useTransform(scrollYProgress, [0.24, 0.72], ["0%", "-51%"]);
  const right = useTransform(scrollYProgress, [0.24, 0.72], ["0%", "51%"]);
  const lift = useTransform(scrollYProgress, [0.24, 0.8], [1.08, 1]);
  const firstCaption = useTransform(scrollYProgress, [0.34, 0.46], [1, 0]);
  const secondCaption = useTransform(scrollYProgress, [0.46, 0.6], [0, 1]);

  if (reduce) {
    return (
      <figure className="relative flex h-full flex-col">
        <div className="relative aspect-square overflow-hidden bg-plaster sm:aspect-[4/5] lg:aspect-auto lg:flex-1">
          <Image src={photos.stillLifeStone.src} alt={photos.stillLifeStone.alt} fill preload sizes={SIZES} className="object-cover" />
        </div>
        <figcaption className="mt-3 text-sm text-ink-soft">The kit: oil and applicator.</figcaption>
      </figure>
    );
  }

  return (
    <figure className="relative flex h-full flex-col">
      <div className="relative aspect-square overflow-hidden bg-plaster sm:aspect-[4/5] lg:aspect-auto lg:flex-1">
        <m.div className="absolute inset-0" style={{ scale: lift }}>
          <Image src={photos.applicatorOnPart.src} alt={photos.applicatorOnPart.alt} fill loading="eager" sizes={SIZES} className="object-cover object-[50%_35%]" />
        </m.div>

        {(["left", "right"] as const).map((side) => (
          <m.div
            key={side}
            aria-hidden={side === "right"}
            className="absolute inset-0 will-change-transform"
            style={{
              x: side === "left" ? left : right,
              clipPath: side === "left" ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)",
            }}
          >
            <Image
              src={photos.stillLifeStone.src}
              alt={side === "left" ? photos.stillLifeStone.alt : ""}
              fill
              preload
              sizes={SIZES}
              className="object-cover"
            />
          </m.div>
        ))}

        <m.span
          aria-hidden
          className="absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2 origin-top bg-oil"
          style={{ scaleY: line, opacity: lineOpacity }}
        />
      </div>

      <figcaption className="relative mt-3 h-5 text-sm text-ink-soft">
        <m.span className="absolute inset-0" style={{ opacity: firstCaption }}>
          The kit: oil and applicator. <span className="hidden sm:inline">Scroll to part.</span>
        </m.span>
        <m.span className="absolute inset-0" style={{ opacity: secondCaption }}>
          At the part: oil placed at the root.
        </m.span>
      </figcaption>
    </figure>
  );
}
