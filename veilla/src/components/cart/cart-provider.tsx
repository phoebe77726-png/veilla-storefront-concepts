"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { cartAdapter } from "@/lib/commerce";
import type { Cart } from "@/lib/commerce/types";

const CART_ID_KEY = "veilla.cart-id";

type CartContextValue = {
  cart: Cart | null;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  /** Line id currently being mutated, or "add" while adding. */
  pending: string | null;
  error: string | null;
  addItem: (variantId: string, quantity: number) => Promise<boolean>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  checkout: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

function readCartId() {
  try {
    return window.localStorage.getItem(CART_ID_KEY);
  } catch {
    return null;
  }
}

function writeCartId(id: string) {
  try {
    window.localStorage.setItem(CART_ID_KEY, id);
  } catch {
    /* storage unavailable */
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const cartRef = useRef<Cart | null>(null);

  const apply = useCallback((next: Cart) => {
    cartRef.current = next;
    setCart(next);
    writeCartId(next.id);
  }, []);

  useEffect(() => {
    let active = true;
    cartAdapter
      .getCart(readCartId())
      .then((existing) => {
        if (active && existing) apply(existing);
      })
      .catch(() => {
        /* a missing or expired cart simply starts empty */
      });
    return () => {
      active = false;
    };
  }, [apply]);

  const run = useCallback(
    async (key: string, task: () => Promise<Cart>, message: (c: Cart) => string) => {
      setPending(key);
      setError(null);
      try {
        const next = await task();
        apply(next);
        setAnnouncement(message(next));
        return true;
      } catch {
        setError("Something went wrong updating your bag. Please try again.");
        setAnnouncement("Your bag could not be updated.");
        return false;
      } finally {
        setPending(null);
      }
    },
    [apply],
  );

  const addItem = useCallback(
    async (variantId: string, quantity: number) => {
      const ok = await run(
        "add",
        () => cartAdapter.addLine(cartRef.current?.id ?? null, variantId, quantity),
        (c) => `Added to bag. Your bag has ${c.totalQuantity} ${c.totalQuantity === 1 ? "item" : "items"}.`,
      );
      if (ok) setOpen(true);
      return ok;
    },
    [run],
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      const id = cartRef.current?.id;
      if (!id) return;
      await run(lineId, () => cartAdapter.updateLine(id, lineId, quantity), (c) => `Bag updated. ${c.totalQuantity} ${c.totalQuantity === 1 ? "item" : "items"}.`);
    },
    [run],
  );

  const removeLine = useCallback(
    async (lineId: string) => {
      const id = cartRef.current?.id;
      if (!id) return;
      await run(lineId, () => cartAdapter.removeLine(id, lineId), () => "Item removed from bag.");
    },
    [run],
  );

  const checkout = useCallback(async () => {
    const current = cartRef.current;
    if (!current || current.lines.length === 0) return;
    setPending("checkout");
    try {
      window.location.assign(await cartAdapter.getCheckoutUrl(current));
    } catch {
      setError("Checkout is unavailable right now. Please try again.");
      setPending(null);
    }
  }, []);

  const value = useMemo(
    () => ({ cart, isOpen, setOpen, pending, error, addItem, updateQuantity, removeLine, checkout }),
    [cart, isOpen, pending, error, addItem, updateQuantity, removeLine, checkout],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <p aria-live="polite" role="status" className="sr-only">
        {announcement}
      </p>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
