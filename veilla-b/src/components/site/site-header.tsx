"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { RoomRail } from "@/components/exhibit/room-rail";
import { FloorPlan } from "@/components/site/floor-plan";

export function SiteHeader() {
  const { cart, setOpen } = useCart();
  const count = cart?.totalQuantity ?? 0;

  return (
    <header className="sticky top-0 z-40 border-b border-sand/70 bg-ivory">
      <div className="container-veil grid h-(--header-h) grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Link href="/" aria-label="Veilla, home" className="justify-self-start font-display text-[1.6rem] leading-none tracking-[-0.02em]">
          Veilla
        </Link>
        <div className="hidden lg:block">
          <RoomRail variant="rail" />
        </div>
        <div className="col-start-3 flex items-center justify-self-end gap-1">
          <FloorPlan />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="fig -mr-2 inline-flex h-11 items-center gap-2 px-2 text-ink"
            aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
          >
            Bag
            <span aria-hidden className="grid min-w-5 place-items-center rounded-full bg-botanical px-1.5 text-[0.7rem] leading-5 text-ivory tabular-nums">
              {count}
            </span>
          </button>
        </div>
      </div>
      <div className="container-veil border-t border-sand/50 py-2 empty:hidden lg:hidden">
        <RoomRail variant="counter" />
      </div>
    </header>
  );
}
