"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { goToRoom, rooms } from "@/lib/rooms";
import { PRODUCT_PATH } from "@/lib/site";

const pages = [
  { href: PRODUCT_PATH, label: "Object record", note: "Full details and add to bag" },
  { href: "/faq", label: "Visitor questions", note: "How to use, ingredients, travel" },
  { href: "/shipping-returns", label: "Getting it home", note: "Shipping and returns" },
];

/** The site's navigation, presented as the exhibition's floor plan. */
export function FloorPlan() {
  const [open, setOpen] = useState(false);
  const pendingRoom = useRef<string | null>(null);
  const pathname = usePathname();

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={(isOpen) => {
        // Travel only once the sheet has closed and released its scroll lock.
        if (!isOpen && pendingRoom.current) {
          const id = pendingRoom.current;
          pendingRoom.current = null;
          // The scroll lock restores the old position on release; travel on the next frames.
          requestAnimationFrame(() => requestAnimationFrame(() => goToRoom(id)));
        }
      }}
    >
      <SheetTrigger className="fig inline-flex h-11 items-center gap-2 px-2 text-ink" aria-label="Open index">
        <span aria-hidden className="grid gap-[3px]">
          <span className="block h-px w-4 bg-current" />
          <span className="block h-px w-4 bg-current" />
        </span>
        Index
      </SheetTrigger>
      <SheetContent
        side="top"
        className="h-svh max-h-svh gap-0 overflow-y-auto border-0 bg-ivory p-0 data-[side=top]:h-svh"
      >
        <div className="container-veil flex h-(--header-h) items-center justify-between border-b border-sand/70">
          <SheetTitle className="font-display text-2xl font-normal tracking-[-0.02em]">Floor plan</SheetTitle>
          <SheetDescription className="sr-only">Rooms of the exhibition and other pages</SheetDescription>
        </div>
        <div className="container-veil grid gap-14 py-10 lg:grid-cols-12 lg:py-16">
          <nav aria-label="Rooms" className="lg:col-span-7">
            <p className="fig text-cocoa">The exhibition</p>
            <ol className="mt-6 border-t border-sand">
              {rooms.map((room, i) => (
                <li key={room.id} className="border-b border-sand">
                  <Link
                    href={`/#${room.id}`}
                    onClick={(e) => {
                      if (pathname === "/") {
                        e.preventDefault();
                        pendingRoom.current = room.id;
                      }
                      setOpen(false);
                    }}
                    className="group flex items-baseline gap-5 py-3.5"
                  >
                    <span className="fig w-8 text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-none tracking-[-0.02em] group-hover:italic">
                      {room.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <nav aria-label="Pages" className="lg:col-span-4 lg:col-start-9">
            <p className="fig text-cocoa">Elsewhere</p>
            <ul className="mt-6 space-y-6">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} onClick={() => setOpen(false)} className="group block">
                    <span className="font-display text-2xl group-hover:underline">{p.label}</span>
                    <span className="mt-1 block text-sm text-ink-soft">{p.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
