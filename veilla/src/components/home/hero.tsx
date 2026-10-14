import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { AddToCartButton } from "@/components/commerce/add-to-cart-button";
import { HeroScene } from "@/components/home/hero-scene";
import { PartReveal } from "@/components/home/part-reveal";
import type { Product } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/format";

export function Hero({ product }: { product: Product }) {
  const variant = product.variants[0];

  return (
    <HeroScene className="relative lg:h-[175svh]">
      <div className="container-veil grid gap-x-12 gap-y-6 pt-6 pb-20 sm:gap-y-8 sm:pt-12 lg:sticky lg:top-(--header-h) lg:h-[calc(100svh-var(--header-h))] lg:grid-cols-12 lg:grid-rows-[1fr_1fr] lg:py-10">
        <div className="lg:col-span-5 lg:self-end">
          <p className="eyebrow text-cocoa">Pre-wash scalp kit · Rosemary + Avocado</p>
          <h1 id="hero-title" className="mt-4 text-display-xl text-ink sm:mt-5">
            Scalp oiling, <em className="text-botanical">in&nbsp;your control.</em>
          </h1>
        </div>

        <div className="relative order-last lg:order-none lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:min-h-0">
          <PartReveal />
        </div>

        <div className="lg:col-span-5 lg:row-start-2">
          <p className="max-w-[34rem] text-ink-soft">
            A rosemary + avocado hair oil, paired with a palm-sized applicator that places oil along each
            part, so the ritual happens at your scalp and stays off your fingertips.
          </p>

          <div data-buy-anchor className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            {variant ? (
              <AddToCartButton
                variantId={variant.id}
                available={variant.availableForSale}
                label={`Add the kit · ${formatMoney(variant.price)}`}
              />
            ) : null}
            <Link href="#ritual" className="group inline-flex items-center gap-2 py-2 text-[0.95rem] text-ink">
              <span className="underline decoration-sand underline-offset-[6px] group-hover:decoration-ink">See the ritual</span>
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </Link>
          </div>

          <dl className="mt-8 grid sm:mt-10 max-w-[34rem] grid-cols-3 border-t border-sand pt-5 text-sm">
            {[
              ["Oil", "30 mL"],
              ["Applicator", "≈ 5 × 2 cm"],
              ["When", "Before you wash"],
            ].map(([term, value], i) => (
              <div key={term} className={i > 0 ? "border-l border-sand pl-4" : "pr-4"}>
                <dt className="eyebrow text-ink-soft">{term}</dt>
                <dd className="mt-1.5 text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </HeroScene>
  );
}
