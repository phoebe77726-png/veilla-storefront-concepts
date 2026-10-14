"use client";

import { AnimatePresence, m } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AddToCartButton } from "@/components/commerce/add-to-cart-button";
import type { Product } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/format";
import { onElements } from "@/lib/on-elements";

/** Desktop header add-to-bag, shown whenever no other buy control is on screen. */
export function HeaderBuy({ product }: { product: Product }) {
  const variant = product.variants[0];
  const pathname = usePathname();
  // Keyed by path; until measured, assume a buy control is visible.
  const [state, setState] = useState<{ path: string; visible: boolean } | null>(null);

  useEffect(
    () =>
      onElements("[data-buy-anchor]", (els) => {
        const visible = new Set<Element>();
        const io = new IntersectionObserver((entries) => {
          for (const e of entries) {
            if (e.isIntersecting) visible.add(e.target);
            else visible.delete(e.target);
          }
          setState({ path: pathname, visible: visible.size > 0 });
        });
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
      }),
    [pathname],
  );

  if (!variant) return null;
  const show = state?.path === pathname && !state.visible;

  return (
    <AnimatePresence>
      {show ? (
        <m.div
          className="hidden lg:block"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          <AddToCartButton
            variantId={variant.id}
            available={variant.availableForSale}
            size="cta-sm"
            label={`Add to bag · ${formatMoney(variant.price)}`}
            className="h-9"
          />
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
