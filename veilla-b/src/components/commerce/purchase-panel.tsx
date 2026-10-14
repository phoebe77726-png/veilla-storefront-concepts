"use client";

import { useState } from "react";
import { AddToCartButton } from "@/components/commerce/add-to-cart-button";
import { QuantitySelector } from "@/components/commerce/quantity-selector";
import { MAX_LINE_QUANTITY } from "@/lib/commerce/mock-adapter";
import type { ProductVariant } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";

/** Quantity + add to bag. `data-buy-anchor` lets the sticky bar know a buy control is on screen. */
export function PurchasePanel({
  variant,
  productTitle,
  tone = "botanical",
  className,
}: {
  variant: ProductVariant;
  productTitle: string;
  tone?: "botanical" | "ivory";
  className?: string;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div data-buy-anchor className={cn("flex flex-wrap items-stretch gap-3", className)}>
      <QuantitySelector
        label={productTitle}
        value={quantity}
        onChange={setQuantity}
        max={MAX_LINE_QUANTITY}
        className={tone === "ivory" ? "border-ivory/30 bg-transparent text-ivory [&_button]:text-ivory [&_button:hover]:bg-ivory/10" : undefined}
      />
      <AddToCartButton
        variantId={variant.id}
        quantity={quantity}
        available={variant.availableForSale}
        tone={tone}
        className="min-w-48 flex-1"
      />
    </div>
  );
}
