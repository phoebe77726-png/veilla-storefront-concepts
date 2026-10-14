"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { photos } from "@/lib/photos";
import { PRODUCT_PATH, navLinks } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="-ml-2 grid size-11 place-items-center text-ink lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" strokeWidth={1.5} aria-hidden />
      </SheetTrigger>
      <SheetContent side="left" className="w-[88vw] max-w-sm gap-0 border-sand bg-paper p-0">
        <div className="flex h-(--header-h) items-center border-b border-sand/70 px-5">
          <SheetTitle className="font-display text-[1.6rem] font-normal text-botanical">Veilla</SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
        </div>
        <nav aria-label="Mobile" className="px-5 pt-6">
          <ul className="divide-y divide-sand/70">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-[1.75rem] leading-tight text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href={PRODUCT_PATH}
          onClick={() => setOpen(false)}
          className="mx-5 mt-auto mb-6 flex items-center gap-4 border-t border-sand/70 pt-5"
        >
          <Image
            src={photos.flatlayPlaster.src}
            alt=""
            width={72}
            height={72}
            className="size-18 object-cover"
          />
          <span>
            <span className="eyebrow block text-cocoa">The only thing we make</span>
            <span className="mt-1 block font-display text-lg leading-snug">The Pre-Wash Scalp Kit</span>
          </span>
        </Link>
      </SheetContent>
    </Sheet>
  );
}
