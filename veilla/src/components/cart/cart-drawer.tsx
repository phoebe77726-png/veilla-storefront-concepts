"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { QuantitySelector } from "@/components/commerce/quantity-selector";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { isMockCommerce } from "@/lib/commerce";
import { MAX_LINE_QUANTITY } from "@/lib/commerce/mock-adapter";
import type { CartLine } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/format";
import { photos } from "@/lib/photos";
import { PRODUCT_PATH } from "@/lib/site";

export function CartDrawer() {
  const { cart, isOpen, setOpen, error, checkout, pending } = useCart();
  const lines = cart?.lines ?? [];
  const count = cart?.totalQuantity ?? 0;

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-full gap-0 border-sand bg-paper p-0 data-[side=right]:sm:max-w-[28rem]"
      >
        <SheetHeader className="h-(--header-h) flex-row items-center border-b border-sand/70 px-5 py-0">
          <SheetTitle className="font-display text-2xl font-normal">
            Your bag <span className="text-ink-soft tabular-nums">({count})</span>
          </SheetTitle>
          <SheetDescription className="sr-only">Review items before checkout</SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <EmptyCart onNavigate={() => setOpen(false)} />
        ) : (
          <>
            <ul className="flex-1 divide-y divide-sand/70 overflow-y-auto px-5" aria-label="Items in your bag">
              {lines.map((line) => (
                <CartLineItem key={line.id} line={line} />
              ))}
            </ul>

            <SheetFooter className="gap-4 border-t border-sand/70 bg-ivory px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              {error ? (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              ) : null}
              <dl className="flex items-baseline justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="font-display text-2xl tabular-nums">{cart ? formatMoney(cart.subtotal) : ""}</dd>
              </dl>
              <p className="-mt-2 text-sm text-ink-soft">Shipping and taxes are calculated at checkout.</p>
              <Button size="cta" className="w-full" onClick={checkout} disabled={pending === "checkout"}>
                {pending === "checkout" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
                Checkout
                <ArrowRight className="size-4" aria-hidden />
              </Button>
              {isMockCommerce ? (
                <p className="text-center text-xs text-ink-soft">Preview store: checkout is simulated and takes no payment.</p>
              ) : null}
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartLineItem({ line }: { line: CartLine }) {
  const { updateQuantity, removeLine, pending, setOpen } = useCart();
  const busy = pending === line.id;
  const { merchandise } = line;

  return (
    <li className="flex gap-4 py-5" aria-busy={busy}>
      {merchandise.image ? (
        <Image
          src={merchandise.image.src}
          alt=""
          width={96}
          height={120}
          sizes="96px"
          className="h-30 w-24 shrink-0 bg-linen object-cover"
        />
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              href={`/products/${merchandise.productHandle}`}
              onClick={() => setOpen(false)}
              className="font-display text-lg leading-snug hover:underline"
            >
              {merchandise.productTitle}
            </Link>
            <p className="mt-0.5 text-sm text-ink-soft">{merchandise.variantTitle}</p>
          </div>
          <p className="shrink-0 tabular-nums">{formatMoney({ ...merchandise.price, amount: merchandise.price.amount * line.quantity })}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantitySelector
            size="sm"
            label={merchandise.productTitle}
            value={line.quantity}
            max={MAX_LINE_QUANTITY}
            min={1}
            disabled={busy}
            onChange={(q) => updateQuantity(line.id, q)}
          />
          <button
            type="button"
            onClick={() => removeLine(line.id)}
            disabled={busy}
            className="text-sm text-ink-soft underline underline-offset-4 hover:text-ink disabled:opacity-50"
          >
            Remove<span className="sr-only"> {merchandise.productTitle}</span>
          </button>
        </div>
      </div>
    </li>
  );
}

function EmptyCart({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex flex-1 flex-col px-5 pt-8 pb-8">
      <div className="relative aspect-[4/3] overflow-hidden bg-linen">
        <Image src={photos.ceramicTray.src} alt="" fill sizes="(min-width: 640px) 28rem, 100vw" className="object-cover" />
      </div>
      <p className="mt-8 font-display text-[2rem] leading-tight">Your bag is empty.</p>
      <p className="mt-3 text-ink-soft">
        The ritual starts with one kit: the rosemary + avocado oil and the applicator that places it.
      </p>
      <Button
        size="cta"
        className="mt-8 w-full"
        render={<Link href={PRODUCT_PATH} onClick={onNavigate} />}
        nativeButton={false}
      >
        Shop the kit
      </Button>
    </div>
  );
}
