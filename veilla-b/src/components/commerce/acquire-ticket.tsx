"use client";

import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { AddToCartButton } from "@/components/commerce/add-to-cart-button";
import type { Product } from "@/lib/commerce/types";
import { onElements } from "@/lib/on-elements";
import { formatMoney } from "@/lib/format";

/**
 * A persistent "ticket" so buying is always one tap away, on every screen size.
 * It steps aside whenever another buy control (`data-buy-anchor`) is in view,
 * including inside the horizontal walk, and while the bag is open.
 */
export function AcquireTicket({ product }: { product: Product }) {
  const variant = product.variants[0];
  const { isOpen } = useCart();
  const pathname = usePathname();
  // Keyed by path; until measured, assume a buy control is visible so the ticket never flashes in.
  const [anchors, setAnchors] = useState<{
    path: string;
    visible: boolean;
  } | null>(null);

  useEffect(
    () =>
      onElements("[data-buy-anchor]", (els) => {
        const visible = new Set<Element>();
        const io = new IntersectionObserver((entries) => {
          for (const e of entries) {
            if (e.isIntersecting) visible.add(e.target);
            else visible.delete(e.target);
          }
          setAnchors({ path: pathname, visible: visible.size > 0 });
        });
        els.forEach((a) => io.observe(a));
        return () => io.disconnect();
      }),
    [pathname],
  );

  if (!variant) return null;
  const anchorVisible = anchors?.path === pathname ? anchors.visible : true;
  const show = !anchorVisible && !isOpen;

  return (
    <AnimatePresence>
      {show ? (
        <m.aside
          aria-label="Add the kit to your bag"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-sand bg-paper pb-[env(safe-area-inset-bottom)] lg:inset-x-auto lg:right-6 lg:bottom-6 lg:w-[27rem] lg:border lg:pb-0 lg:shadow-[0_24px_60px_-30px_rgb(28_27_23/0.45)]"
        >
          <div className="flex items-center gap-3 px-4 py-3 lg:p-4">
            {product.images[0] ? (
              <Image
                src={product.images[0].src}
                alt=""
                width={48}
                height={48}
                sizes="48px"
                className="size-12 shrink-0 object-cover"
              />
            ) : null}
            <div className="min-w-0 flex-1">
              <p className="fig hidden whitespace-nowrap text-cocoa lg:block">
                Ticket · one object
              </p>
              <p className="truncate text-sm font-medium lg:mt-0.5">
                Pre-Wash Scalp Kit
              </p>
              <p className="text-sm text-ink-soft tabular-nums">
                {formatMoney(variant.price)}
              </p>
            </div>
            <AddToCartButton
              variantId={variant.id}
              available={variant.availableForSale}
              size="cta-sm"
              label="Add to bag"
            />
          </div>
        </m.aside>
      ) : null}
    </AnimatePresence>
  );
}
