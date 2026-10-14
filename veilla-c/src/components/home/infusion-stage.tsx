"use client";

import Image from "next/image";
import { type MotionValue, m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AddToCartButton } from "@/components/commerce/add-to-cart-button";
import type { Product } from "@/lib/commerce/types";
import { cutouts } from "@/lib/cutouts";
import { formatMoney } from "@/lib/format";
import { useMedia } from "@/lib/use-media";
import { cn } from "@/lib/utils";

/*
 * Stage 1 — "Infusion".
 * Pinned for ~2.4 viewports of scroll:
 *   0.00–0.14  the bottle alone, headline + buy button
 *   0.14–0.32  rosemary and avocado drift in and are named
 *   0.48–0.74  they travel into the bottle and shrink away
 *   0.58–0.92  gold light rises inside the bottle (masked to its silhouette)
 *   0.86–1.00  "Infused into one oil."
 * The buy button never leaves the stage. Reduced motion renders the held
 * middle state as a static composition.
 */

type Ingredient = {
  key: string;
  image: { src: (typeof cutouts)["avocado"]["src"]; alt: string };
  /** Where it rests while being introduced, relative to the bottle's centre (small / large screens). */
  rest: { x: string; y: string; rotate: number };
  restLg: { x: string; y: string };
  /** Where it enters from. */
  from: { x: string; y: string; rotate: number };
  size: string;
  delay: number;
};

const ingredients: Ingredient[] = [
  {
    key: "rosemary-a",
    image: cutouts.rosemaryA,
    from: { x: "-58vw", y: "-30svh", rotate: -35 },
    rest: { x: "-27vw", y: "-17svh", rotate: -8 },
    restLg: { x: "-17vw", y: "-17svh" },
    size: "h-[24svh] lg:h-[30svh]",
    delay: 0,
  },
  {
    key: "rosemary-b",
    image: cutouts.rosemaryB,
    from: { x: "-50vw", y: "34svh", rotate: 30 },
    rest: { x: "-22vw", y: "17svh", rotate: 12 },
    restLg: { x: "-15vw", y: "19svh" },
    size: "h-[22svh] lg:h-[28svh]",
    delay: 0.03,
  },
  {
    key: "avocado",
    image: cutouts.avocado,
    from: { x: "56vw", y: "4svh", rotate: 40 },
    rest: { x: "25vw", y: "2svh", rotate: 10 },
    restLg: { x: "17vw", y: "4svh" },
    size: "h-[18svh] lg:h-[27svh]",
    delay: 0.06,
  },
];

function useIngredientMotion(p: MotionValue<number>, ing: Ingredient, lg: boolean) {
  const rest = lg ? { ...ing.rest, ...ing.restLg } : ing.rest;
  const d = ing.delay;
  const range = [0.12 + d, 0.3 + d, 0.48 + d, 0.72 + d * 0.5];
  return {
    x: useTransform(p, range, [ing.from.x, rest.x, rest.x, "0vw"]),
    y: useTransform(p, range, [ing.from.y, rest.y, rest.y, "0svh"]),
    rotate: useTransform(p, range, [ing.from.rotate, ing.rest.rotate, ing.rest.rotate, ing.rest.rotate + 60]),
    scale: useTransform(p, [range[2], range[3]], [1, 0.08]),
    opacity: useTransform(p, [range[0], range[0] + 0.06, range[3] - 0.05, range[3]], [0, 1, 1, 0]),
  };
}

function FloatingIngredient({ p, ing, still }: { p: MotionValue<number>; ing: Ingredient; still: boolean }) {
  const lg = useMedia("(min-width: 64rem)");
  const motion = useIngredientMotion(p, ing, lg);
  const rest = lg ? { ...ing.rest, ...ing.restLg } : ing.rest;
  const style = still ? { x: rest.x, y: rest.y, rotate: rest.rotate } : motion;
  return (
    <m.div aria-hidden className="absolute top-0 left-0" style={style}>
      <Image
        src={ing.image.src}
        alt=""
        sizes="(min-width: 1024px) 30vh, 24vh"
        className={cn("w-auto max-w-none -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_18px_22px_rgb(60_40_20/0.18)]", ing.size)}
      />
    </m.div>
  );
}

export function InfusionStage({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const variant = product.variants[0];

  const head1 = useTransform(p, [0.1, 0.18], [1, 0]);
  const head2 = useTransform(p, [0.2, 0.28, 0.64, 0.7], [0, 1, 1, 0]);
  const head3 = useTransform(p, [0.7, 0.78], [0, 1]);
  const labels = useTransform(p, [0.24, 0.3, 0.46, 0.52], [0, 1, 1, 0]);
  const bottleY = useTransform(p, [0, 1], ["0svh", "-2svh"]);
  const bottleScale = useTransform(p, [0.5, 0.8], [1, 1.05]);
  const fill = useTransform(p, [0.58, 0.92], ["100%", "8%"]);
  const fillOpacity = useTransform(p, [0.58, 0.66, 1], [0, 0.85, 0.55]);
  const halo = useTransform(p, [0, 0.55, 0.85], [0.35, 0.5, 1]);

  const s = <T,>(value: MotionValue<T>, still: T) => (reduce ? still : value);

  return (
    <section ref={ref} aria-labelledby="hero-title" className={cn("relative", !reduce && "h-[340svh]")}>
      <div
        className={cn(
          "relative overflow-hidden bg-[radial-gradient(120%_90%_at_62%_45%,#fbf3e6_0%,#efdcc6_55%,#e3c8ad_100%)]",
          reduce
            ? "min-h-[calc(100svh-var(--header-h))]"
            : "sticky top-(--header-h) h-[calc(100svh-var(--header-h))]",
        )}
      >
        {/* Studio floor */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-b from-transparent to-[#d9bb9c]/60" />

        {/*
          Copy column. Mobile: headline at the top, buy button pinned to the bottom of the stage.
          Desktop: one vertically centred column on the left. Headlines cross-fade in place;
          the buy button never leaves the stage.
        */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between px-(--spacing-gutter) pt-[5svh] pb-[4svh] lg:right-auto lg:w-[48%] lg:justify-center lg:py-0">
          <div className="pointer-events-auto">
            <p className="eyebrow text-cocoa">Rosemary + Avocado Hair Oil</p>
            <div className="relative mt-4">
              <m.h1 id="hero-title" style={{ opacity: s(head1, 1) }} className="text-display-xl text-ink">
                Oil the scalp, <em className="text-botanical">not&nbsp;your&nbsp;hands.</em>
              </m.h1>
              <m.p
                aria-hidden={reduce}
                style={{ opacity: s(head2, 0) }}
                className="absolute inset-0 font-display text-display-xl text-ink"
              >
                Rosemary, <em className="text-botanical">meet avocado.</em>
              </m.p>
              <m.p style={{ opacity: s(head3, 0) }} className="absolute inset-0 font-display text-display-xl text-ink">
                Infused into <em className="text-botanical">one oil.</em>
              </m.p>
            </div>
            <p className="mt-6 hidden max-w-md text-ink-soft lg:block">
              A rosemary + avocado hair oil, paired with a palm-sized applicator that places it along your part,
              straight to the root.
            </p>
          </div>

          <div data-buy-anchor className="pointer-events-auto flex flex-wrap items-center gap-x-5 gap-y-2 lg:mt-9">
            {variant ? (
              <AddToCartButton
                variantId={variant.id}
                available={variant.availableForSale}
                label={`Add the kit · ${formatMoney(variant.price)}`}
                className="max-sm:w-full"
              />
            ) : null}
            <p className="text-sm text-ink-soft">Oil 30 mL + portable scalp applicator</p>
          </div>
        </div>

        {/* The bottle and everything that flows into it share one anchor point. */}
        <div className="absolute top-[56%] left-1/2 z-10 h-[46svh] -translate-x-1/2 -translate-y-1/2 lg:top-1/2 lg:left-[68%] lg:h-[min(72svh,46rem)]">
          <m.div aria-hidden className="absolute top-1/2 left-1/2 size-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_226_160/0.9),transparent)]" style={{ opacity: s(halo, 0.5) }} />
          <div aria-hidden className="absolute -bottom-[3%] left-1/2 h-[6%] w-[90%] -translate-x-1/2 rounded-[50%] bg-[#6b4a2c]/35 blur-md" />

          {/* Ingredients sit behind the glass and converge on the bottle's centre, so they read as going in. */}
          <div className="absolute top-[52%] left-1/2">
            {ingredients.map((ing) => (
              <FloatingIngredient key={ing.key} p={p} ing={ing} still={reduce} />
            ))}
          </div>

          <m.div className="relative h-full" style={{ y: s(bottleY, "0svh"), scale: s(bottleScale, 1) }}>
            <Image
              src={cutouts.bottle.src}
              alt={cutouts.bottle.alt}
              preload
              sizes="(min-width: 1024px) 30vh, 22vh"
              className="h-full w-auto"
            />
            {/* Gold light rising inside the bottle, masked to the bottle's own silhouette. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-soft-light"
              style={{
                maskImage: `url(${cutouts.bottle.src.src})`,
                WebkitMaskImage: `url(${cutouts.bottle.src.src})`,
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
              }}
            >
              <m.div
                className="absolute inset-x-0 bottom-0 h-[200%] bg-[linear-gradient(to_top,#ffd36b_0%,#f7b733_45%,transparent_52%)]"
                style={{ y: s(fill, "8%"), opacity: s(fillOpacity, 0) }}
              />
            </div>
          </m.div>

          {/* Ingredient names */}
          <m.div style={{ opacity: s(labels, 1) }} className="pointer-events-none absolute inset-0 hidden sm:block">
            <IngredientLabel className="right-[calc(100%+3vw)] -top-[4%] text-right" name="Rosemary" note="Herbaceous, green, a little camphor-bright." />
            <IngredientLabel className="left-[calc(100%+9vw)] top-[80%]" name="Avocado" note="Rich and cushioning, with a slow glide." />
          </m.div>
        </div>

        {/* Final beat */}
        <m.ul
          style={{ opacity: s(head3, 0) }}
          className="absolute right-(--spacing-gutter) bottom-[4svh] z-20 hidden gap-2 lg:flex"
          aria-label="Bottle details"
        >
          {["30 mL / 1 fl oz", "Rosemary + Avocado", "For the pre-wash step"].map((chip) => (
            <li key={chip} className="border border-ink/15 bg-ivory/70 px-3 py-1.5 text-xs text-ink">
              {chip}
            </li>
          ))}
        </m.ul>

        {/* Scroll cue */}
        <m.p
          aria-hidden
          style={{ opacity: s(head1, 0) }}
          className="absolute bottom-[4svh] left-1/2 z-20 hidden -translate-x-1/2 text-xs tracking-[0.18em] text-ink-soft uppercase lg:block"
        >
          Scroll
        </m.p>
      </div>
    </section>
  );
}

function IngredientLabel({ name, note, className }: { name: string; note: string; className?: string }) {
  return (
    <div className={cn("absolute w-56", className)}>
      <p className="font-display text-[2.4rem] leading-none text-ink">{name}</p>
      <p className="mt-2 text-sm text-ink-soft">{note}</p>
    </div>
  );
}
