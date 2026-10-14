"use client";

import { Check, Loader2 } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = {
  variantId: string;
  quantity?: number;
  available?: boolean;
  label?: string;
  tone?: "botanical" | "ivory";
  size?: "cta" | "cta-sm";
  className?: string;
};

export function AddToCartButton({
  variantId,
  quantity = 1,
  available = true,
  label = "Add to bag",
  tone = "botanical",
  size = "cta",
  className,
}: AddToCartButtonProps) {
  const { addItem, pending } = useCart();
  const reduce = useReducedMotion();
  const [state, setState] = useState<"idle" | "adding" | "added">("idle");

  useEffect(() => {
    if (state !== "added") return;
    const t = setTimeout(() => setState("idle"), 1800);
    return () => clearTimeout(t);
  }, [state]);

  const onClick = async () => {
    setState("adding");
    const ok = await addItem(variantId, quantity);
    setState(ok ? "added" : "idle");
  };

  const text = !available ? "Sold out" : state === "adding" ? "Adding…" : state === "added" ? "Added to bag" : label;

  return (
    <Button
      type="button"
      size={size}
      variant={tone === "ivory" ? "ivory" : "default"}
      onClick={onClick}
      disabled={!available || pending === "add"}
      aria-disabled={!available}
      className={cn("relative min-w-[13.5rem] overflow-hidden disabled:opacity-100", size === "cta-sm" && "min-w-[8.5rem]", className)}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={state}
          className="inline-flex items-center gap-2"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {state === "adding" && <Loader2 className="size-4 animate-spin" aria-hidden />}
          {state === "added" && <Check className="size-4" aria-hidden />}
          {text}
        </m.span>
      </AnimatePresence>
    </Button>
  );
}
