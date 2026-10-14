"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { CartProvider } from "@/components/cart/cart-provider";

/**
 * LazyMotion keeps the animation bundle to the DOM features we use;
 * `strict` throws if a full `motion.*` component sneaks back in.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <CartProvider>{children}</CartProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
