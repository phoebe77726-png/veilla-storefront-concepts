"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { HeaderBuy } from "@/components/commerce/header-buy";
import { MobileNav } from "@/components/site/mobile-nav";
import type { Product } from "@/lib/commerce/types";
import { navLinks } from "@/lib/site";

export function SiteHeader({ product }: { product: Product | null }) {
  const { cart, setOpen } = useCart();
  const count = cart?.totalQuantity ?? 0;

  return (
    <header className="sticky top-0 z-40 h-(--header-h) border-b border-sand/70 bg-ivory">
      <div className="container-veil flex h-full items-center justify-between gap-6">
        <div className="flex items-center gap-1">
          <MobileNav />
          <Link
            href="/"
            className="font-display text-[1.7rem] leading-none tracking-[-0.02em] text-botanical"
            aria-label="Veilla, home"
          >
            Veilla
          </Link>
        </div>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.9rem] text-ink-soft transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
        {product ? <HeaderBuy product={product} /> : null}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="-mr-2 inline-flex h-11 items-center gap-2 px-2 text-[0.9rem] text-ink"
          aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
        >
          <ShoppingBag className="size-[1.15rem]" strokeWidth={1.5} aria-hidden />
          <span className="hidden sm:inline">Bag</span>
          <span
            aria-hidden
            className="grid min-w-5 place-items-center rounded-full bg-botanical px-1.5 text-[0.7rem] leading-5 font-semibold text-ivory tabular-nums"
          >
            {count}
          </span>
        </button>
        </div>
      </div>
    </header>
  );
}
