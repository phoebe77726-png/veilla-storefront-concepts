import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/commerce/add-to-cart-button";
import { PurchasePanel } from "@/components/commerce/purchase-panel";
import { Reveal } from "@/components/motion/reveal";
import { NeedsVerification } from "@/components/site/needs-verification";
import type { Product } from "@/lib/commerce/types";
import { cutouts } from "@/lib/cutouts";
import { formatMoney } from "@/lib/format";
import { photos } from "@/lib/photos";
import { PRODUCT_PATH } from "@/lib/site";

const steps = [
  {
    n: "01",
    title: "Part",
    body: "Comb a clean line where you want the oil to sit.",
    image: photos.ritualSofaB,
    position: "object-[60%_15%]",
  },
  {
    n: "02",
    title: "Place",
    body: "Glide the three tips along the part. Move a finger-width over and repeat.",
    verify: "Filling method and amount per application",
    image: photos.applicatorOnPart,
    position: "object-[50%_30%]",
  },
  {
    n: "03",
    title: "Rest & wash",
    body: "Let it sit while you set up wash day, then shampoo as usual.",
    verify: "Recommended resting time",
    image: photos.portraitBathroom,
    position: "object-[50%_25%]",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" id="ritual" className="bg-ivory">
      <div className="container-veil py-section">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow text-cocoa">The pre-wash ritual</p>
            <h2 id="how-title" className="mt-4 text-display-l">
              Three steps, <em>before the water runs.</em>
            </h2>
          </Reveal>
          <p className="max-w-sm text-ink-soft">A small, deliberate step at the very start of wash day.</p>
        </div>
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {steps.map((s) => (
            <li key={s.n}>
              <div className="relative aspect-[4/5] overflow-hidden bg-linen">
                <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 768px) 32vw, 100vw" className={`object-cover ${s.position}`} />
                <span className="absolute top-4 left-4 bg-ivory/90 px-2 py-1 text-xs font-semibold tabular-nums text-ink">{s.n}</span>
              </div>
              <h3 className="mt-5 text-[2.1rem] leading-none">{s.title}</h3>
              <p className="mt-2 max-w-xs text-ink-soft">
                {s.body}
                {s.verify ? <NeedsVerification note={s.verify} /> : null}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Offer({ product }: { product: Product }) {
  const variant = product.variants[0];
  if (!variant) return null;
  return (
    <section aria-labelledby="offer-title" id="shop" className="bg-plaster">
      <div className="container-veil grid gap-12 py-section lg:grid-cols-12 lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden lg:col-span-7">
          <Image src={photos.kitWithBox.src} alt={photos.kitWithBox.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
        </div>
        <div className="lg:col-span-5">
          <p className="eyebrow text-cocoa">The kit</p>
          <h2 id="offer-title" className="mt-4 text-display-l">
            Everything for <em>the ritual.</em>
          </h2>
          <ul className="mt-8 divide-y divide-ink/15 border-y border-ink/15">
            {product.includes.map((item) => (
              <li key={item.title} className="flex items-start gap-4 py-4">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-oil" />
                <span>
                  <span className="block font-medium">{item.title}</span>
                  <span className="text-sm text-ink-soft">{item.detail}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-baseline justify-between">
            <p className="font-display text-[2.75rem] leading-none tabular-nums">{formatMoney(variant.price)}</p>
            <Link href={PRODUCT_PATH} className="text-sm underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              Full details
            </Link>
          </div>
          <PurchasePanel variant={variant} productTitle={product.title} className="mt-5" />
          <p className="mt-5 text-xs text-ink-soft">
            Reviews: placeholder. Verified customer reviews will appear here once they exist.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ClosingCta({ product }: { product: Product }) {
  const variant = product.variants[0];
  if (!variant) return null;
  return (
    <section aria-labelledby="closing-title" className="on-dark relative overflow-hidden bg-botanical text-ivory">
      <div aria-hidden className="absolute top-1/2 right-[12%] size-[38rem] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(214_164_76/0.28),transparent)]" />
      <div className="container-veil relative grid items-center gap-10 py-20 md:grid-cols-12">
        <div className="md:col-span-7">
          <h2 id="closing-title" className="text-display-xl">
            Wash day starts <em className="text-cocoa-soft">at the root.</em>
          </h2>
          <div data-buy-anchor className="mt-8 flex flex-wrap items-center gap-5">
            <AddToCartButton variantId={variant.id} available={variant.availableForSale} tone="ivory" label={`Add the kit · ${formatMoney(variant.price)}`} />
            <p className="text-sm text-ivory/70">Oil 30 mL + portable scalp applicator</p>
          </div>
        </div>
        <div className="relative mx-auto h-72 md:col-span-4 md:col-start-9 md:h-96">
          <Image src={cutouts.bottle.src} alt="" sizes="160px" className="h-full w-auto drop-shadow-[0_30px_40px_rgb(0_0_0/0.4)]" />
        </div>
      </div>
    </section>
  );
}
