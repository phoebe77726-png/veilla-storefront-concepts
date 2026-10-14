"use client";

import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { AddToCartButton } from "@/components/commerce/add-to-cart-button";
import type { Product } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/format";

/**
 * Mobile-only bar that appears once every on-page buy control
 * (elements marked `data-buy-anchor`) has left the viewport.
 */
export function StickyAddToCart({ product }: { product: Product }) {
  const variant = product.variants[0];
  const [show, setShow] = useState(false);

  useEffect(() => {
    const anchors = Array.from(document.querySelectorAll("[data-buy-anchor]"));
    const visible = new Set<Element>();
    const update = () => setShow(visible.size === 0 && window.scrollY > 240);
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      update();
    });
    anchors.forEach((a) => observer.observe(a));
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  if (!variant) return null;

  return (
    <AnimatePresence>
      {show ? (
        <m.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-sand bg-paper/97 pb-[env(safe-area-inset-bottom)] lg:hidden"
          role="region"
          aria-label="Quick add to bag"
        >
          <div className="container-veil flex items-center gap-3 py-3">
            {product.images[0] ? (
              <Image src={product.images[0].src} alt="" width={44} height={44} sizes="44px" className="size-11 shrink-0 object-cover" />
            ) : null}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{product.title}</p>
              <p className="text-sm text-ink-soft tabular-nums">{formatMoney(variant.price)}</p>
            </div>
            <AddToCartButton variantId={variant.id} available={variant.availableForSale} size="cta-sm" label="Add to bag" />
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
