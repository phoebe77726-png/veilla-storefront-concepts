import Image from "next/image";
import { PurchasePanel } from "@/components/commerce/purchase-panel";
import type { Product } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/format";
import { photos } from "@/lib/photos";

export function FinalPurchase({ product }: { product: Product }) {
  const variant = product.variants[0];
  if (!variant) return null;

  return (
    <section aria-labelledby="final-title" className="on-dark overflow-x-clip bg-botanical text-ivory">
      <div className="grid lg:grid-cols-12">
        <div className="relative aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:min-h-[44rem]">
          <Image
            src={photos.linenFlatlay.src}
            alt={photos.linenFlatlay.alt}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover object-[40%_50%]"
          />
        </div>
        <div className="flex flex-col justify-center px-(--spacing-gutter) py-16 lg:col-span-5 lg:px-14 lg:py-24">
          <p className="eyebrow text-cocoa-soft">One kit, the whole ritual</p>
          <h2 id="final-title" className="mt-5 text-display-l">
            Start on <em className="text-cocoa-soft">wash day.</em>
          </h2>
          <ul className="mt-8 space-y-3 border-t border-ivory/20 pt-6 text-ivory/85">
            {product.includes.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-oil" />
                <span>
                  <span className="block text-ivory">{item.title}</span>
                  <span className="text-sm text-ivory/70">{item.detail}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-display text-[2.25rem] tabular-nums">{formatMoney(variant.price)}</p>
          <PurchasePanel variant={variant} productTitle={product.title} tone="ivory" className="mt-5" />
        </div>
      </div>
    </section>
  );
}
