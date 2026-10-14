"use client";

import Image from "next/image";
import { type MotionValue, m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cutouts } from "@/lib/cutouts";
import { cn } from "@/lib/utils";

/*
 * Stage 2 — the applicator.
 *   0.00–0.32  it turns into view (rotate + a little rotateY), scaling up
 *   0.30–0.72  three leader lines draw out, one by one
 *   0.74–0.95  an oil drop forms at the tips
 * Anchor points are percentages of the applicator's box, so lines land on
 * the right part at any size. Reduced motion shows the finished state.
 */

type Callout = {
  n: number;
  title: string;
  body: string;
  /** Point on the applicator, as % of its box. */
  anchor: { x: number; y: number };
  side: "left" | "right";
  start: number;
};

const callouts: Callout[] = [
  {
    n: 1,
    title: "Straight to the root",
    body: "Three metal tips rest on the scalp along your part, so oil goes to the root instead of the lengths.",
    anchor: { x: 50, y: 98 },
    side: "left",
    start: 0.32,
  },
  {
    n: 2,
    title: "Precision-tip design",
    body: "Designed to lay down a narrow, controlled line of oil, one section at a time.",
    anchor: { x: 86, y: 80 },
    side: "right",
    start: 0.46,
  },
  {
    n: 3,
    title: "Off your fingertips",
    body: "Hold it by the frosted top. It is designed to keep oil on the tips, not on your hands.",
    anchor: { x: 20, y: 9 },
    side: "left",
    start: 0.6,
  },
];

export function ApplicatorStage() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const rotate = useTransform(p, [0, 0.32, 1], [-42, -7, -3]);
  const rotateY = useTransform(p, [0, 0.32, 1], [62, 0, -14]);
  const scale = useTransform(p, [0, 0.32], [0.78, 1]);
  const intro = useTransform(p, [0, 0.12], [0, 1]);
  const drop = useTransform(p, [0.74, 0.88, 0.95], [0, 1, 1]);
  const dropY = useTransform(p, [0.86, 0.97], ["0%", "60%"]);

  const s = <T,>(value: MotionValue<T>, still: T) => (reduce ? still : value);

  return (
    <section ref={ref} aria-labelledby="applicator-title" className={cn("on-dark relative bg-botanical text-ivory", !reduce && "h-[300svh]")}>
      <div
        className={cn(
          "relative overflow-hidden bg-[radial-gradient(90%_70%_at_50%_55%,#2c4c39_0%,#1f3a2b_45%,#132519_100%)]",
          reduce ? "min-h-[calc(100svh-var(--header-h))] pb-16" : "sticky top-(--header-h) h-[calc(100svh-var(--header-h))]",
        )}
      >
        <m.div style={{ opacity: s(intro, 1) }} className="relative z-10 px-(--spacing-gutter) pt-[5svh] lg:absolute lg:top-[8%] lg:left-0 lg:pt-0">
          <p className="eyebrow text-cocoa-soft">The applicator · approx. 5 × 2 cm</p>
          <h2 id="applicator-title" className="mt-4 text-display-l">
            Made for <em className="text-cocoa-soft">the root.</em>
          </h2>
        </m.div>

        {/* Applicator + callouts share one box so anchors stay attached. */}
        <div className="absolute top-[36%] left-1/2 h-[26svh] -translate-x-1/2 -translate-y-1/2 [perspective:1200px] lg:top-[56%] lg:h-[min(62svh,40rem)]">
          <div aria-hidden className="absolute top-1/2 left-1/2 size-[180%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(214_164_76/0.35),transparent)]" />
          <m.div
            className="relative h-full"
            style={{ rotate: s(rotate, -4), rotateY: s(rotateY, 0), scale: s(scale, 1) }}
          >
            <Image src={cutouts.applicator.src} alt={cutouts.applicator.alt} sizes="(min-width: 1024px) 28vh, 18vh" className="h-full w-auto drop-shadow-[0_30px_40px_rgb(0_0_0/0.45)]" />
          </m.div>

          {/* Oil drop forming at the tips */}
          <m.span
            aria-hidden
            style={{ opacity: s(drop, 1), y: s(dropY, "0%") }}
            className="absolute top-[99%] left-1/2 h-[4.5%] w-[9%] -translate-x-1/2 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-[radial-gradient(circle_at_35%_30%,#ffe7a3,#d39a2c_60%,#a8701c)] shadow-[0_0_18px_rgb(240_190_90/0.6)]"
          />

          {callouts.map((c) => (
            <CalloutLine key={c.n} c={c} p={p} still={reduce} />
          ))}
        </div>

        {/* Small screens: numbered list under the applicator. */}
        <ol className="absolute inset-x-0 bottom-0 z-10 grid gap-2.5 px-(--spacing-gutter) pb-[calc(2svh+5rem)] lg:hidden">
          {callouts.map((c) => (
            <MobileCallout key={c.n} c={c} p={p} still={reduce} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function CalloutLine({ c, p, still }: { c: Callout; p: MotionValue<number>; still: boolean }) {
  const line = useTransform(p, [c.start, c.start + 0.08], [0, 1]);
  const text = useTransform(p, [c.start + 0.05, c.start + 0.12], [0, 1]);
  const dot = useTransform(p, [c.start - 0.02, c.start], [0, 1]);
  const left = c.side === "left";

  return (
    <>
      {/* Numbered marker on the applicator (all sizes). */}
      <m.span
        aria-hidden
        style={{ opacity: still ? 1 : dot, left: `${c.anchor.x}%`, top: `${c.anchor.y}%` }}
        className="absolute z-10 grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-oil text-[0.65rem] font-semibold text-botanical-deep ring-4 ring-oil/25 lg:size-3 lg:text-[0]"
      >
        {c.n}
      </m.span>

      {/* Leader line + text (large screens). */}
      <div
        className={cn("absolute hidden -translate-y-1/2 items-center lg:flex", left ? "flex-row-reverse" : "flex-row")}
        style={left ? { right: `${100 - c.anchor.x}%`, top: `${c.anchor.y}%` } : { left: `${c.anchor.x}%`, top: `${c.anchor.y}%` }}
      >
        <m.span
          aria-hidden
          style={{ scaleX: still ? 1 : line }}
          className={cn("block h-px w-[clamp(5rem,12vw,11rem)] bg-ivory/60", left ? "origin-right" : "origin-left")}
        />
        <m.div style={{ opacity: still ? 1 : text }} className={cn("w-[17rem]", left ? "pr-5 text-right" : "pl-5")}>
          <p className="font-display text-[1.9rem] leading-none">{c.title}</p>
          <p className="mt-2 text-sm text-ivory/75">{c.body}</p>
        </m.div>
      </div>
    </>
  );
}

function MobileCallout({ c, p, still }: { c: Callout; p: MotionValue<number>; still: boolean }) {
  const opacity = useTransform(p, [c.start, c.start + 0.08], [0.35, 1]);
  return (
    <m.li style={{ opacity: still ? 1 : opacity }} className="flex gap-3">
      <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-oil text-[0.65rem] font-semibold text-botanical-deep">
        {c.n}
      </span>
      <p className="text-[0.82rem] leading-snug text-ivory/80">
        <span className="font-display text-lg text-ivory">{c.title}.</span> {c.body}
      </p>
    </m.li>
  );
}
