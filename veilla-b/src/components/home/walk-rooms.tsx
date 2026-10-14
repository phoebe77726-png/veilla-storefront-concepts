import Image from "next/image";
import { AddToCartButton } from "@/components/commerce/add-to-cart-button";
import { Exhibit, WallLabel } from "@/components/exhibit/exhibit";
import { Room, RoomTag } from "@/components/exhibit/room";
import { NeedsVerification } from "@/components/site/needs-verification";
import type { Product } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/format";
import { photos } from "@/lib/photos";

/*
 * Rooms 01–05: the gallery walk. Each room is a full-height panel inside the
 * walk (`walk:` styles) and a normal stacked section everywhere else.
 */

const roomPad = "px-(--spacing-gutter) py-14 sm:py-20 walk:py-10";

export function EntranceRoom({ product }: { product: Product }) {
  const variant = product.variants[0];
  return (
    <Room id="entrance" width="100vw" className={roomPad}>
      <div className="grid h-full gap-10 walk:grid-cols-12 walk:gap-8">
        <div className="flex flex-col walk:col-span-7 walk:justify-between">
          <RoomTag id="entrance" className="text-cocoa" />
          <div className="mt-8 walk:mt-0">
            <p className="fig text-ink-soft">Exhibition · one object</p>
            <h1 className="mt-5 text-display-xxl">
              A study
              <br />
              in <em className="text-botanical">control.</em>
            </h1>
          </div>
          <div className="mt-8 max-w-xl walk:mt-0">
            <p className="text-ink-soft">
              Veilla is a rosemary + avocado hair oil and a palm-sized applicator, made for one step: oiling the
              scalp before you wash. This is a slow walk around it.
            </p>
            {variant ? (
              <div data-buy-anchor className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <AddToCartButton
                  variantId={variant.id}
                  available={variant.availableForSale}
                  label={`Add to bag · ${formatMoney(variant.price)}`}
                />
                <p className="fig text-ink-soft">
                  <span className="hidden walk:inline">Scroll to walk →</span>
                  <span className="walk:hidden">Scroll to begin ↓</span>
                </p>
              </div>
            ) : null}
          </div>
        </div>
        <Exhibit
          className="walk:col-span-5 walk:self-center"
          frameClassName="aspect-[4/5] walk:aspect-auto walk:h-[min(66svh,44rem)]"
          image={photos.stillLifeStone}
          sizes="(min-width: 1024px) 38vw, 100vw"
          preload
          label={{
            fig: "01",
            title: "The kit, at rest",
            children: "Frosted glass bottle, 30 mL / 1 fl oz. Applicator with three metal tips, approx. 5 × 2 cm.",
          }}
          labelPlacement="overlap-left"
        />
      </div>
    </Room>
  );
}

export function NoteRoom() {
  return (
    <Room id="note" width="62vw" tone="plaster" className={`${roomPad} grain`}>
      <div className="flex h-full max-w-4xl flex-col justify-between gap-10">
        <RoomTag id="note" className="text-cocoa" />
        <blockquote>
          <p className="font-display text-display-l">
            Droppers drift. Fingertips get slick. Oil settles on the lengths before it ever reaches the scalp.
          </p>
        </blockquote>
        <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
          <span aria-hidden className="mt-3 block h-[3px] w-16 bg-oil" />
          <p className="max-w-lg text-lg">
            So the object of this exhibition is not the oil alone. It is the gesture around it:{" "}
            <em className="font-display text-xl not-italic">part, place, rest.</em>
          </p>
        </div>
      </div>
    </Room>
  );
}

export function ObjectRoom() {
  return (
    <Room id="object" width="118vw" className={roomPad}>
      <div className="flex h-full flex-col">
        <RoomTag id="object" className="text-cocoa" />
        <div className="mt-10 grid flex-1 gap-16 walk:mt-6 walk:grid-cols-[auto_auto_1fr] walk:items-start walk:gap-20">
          <Exhibit
            frameClassName="aspect-square walk:h-[min(56svh,38rem)]"
            image={photos.flatlayPlaster}
            sizes="(min-width: 1024px) 40vw, 100vw"
            label={{ fig: "02", title: "From above", children: "Bottle and applicator on warm plaster, with rosemary and avocado." }}
            labelPlacement="below"
          />
          <Exhibit
            className="walk:self-end"
            frameClassName="aspect-[4/3] walk:h-[min(46svh,30rem)]"
            image={photos.kitWithBox}
            sizes="(min-width: 1024px) 45vw, 100vw"
            label={{ fig: "03", title: "With its carton", children: "Sage carton, illustrated with rosemary and avocado." }}
            labelPlacement="overlap-right"
          />
          <div className="max-w-sm self-center walk:pr-8">
            <p className="font-display text-[1.75rem] leading-tight">Two pieces, each with one job.</p>
            <p className="mt-4 text-ink-soft">
              The bottle stores the oil and refills the applicator. The applicator carries a small amount to the
              part you have made.
              <NeedsVerification note="How the applicator is filled" />
            </p>
          </div>
        </div>
      </div>
    </Room>
  );
}

const details = [
  { title: "Three metal tips", body: "Spaced to rest along a part, setting oil down at the root in a narrow line." },
  { title: "Clear body", body: "You can see how much oil is loaded before you begin." },
  { title: "Frosted top", body: "The end you hold, keeping fingertips away from the oil.", verify: "Whether the top is pressed to dispense" },
  { title: "About 5 × 2 cm", body: "Small enough for a wash bag, beside the bottle." },
];

export function GestureRoom() {
  return (
    <Room id="gesture" width="122vw" tone="green" className={roomPad}>
      <div className="flex h-full flex-col">
        <RoomTag id="gesture" className="text-cocoa-soft" />
        <div className="mt-10 grid flex-1 gap-14 walk:mt-6 walk:grid-cols-[auto_auto_minmax(20rem,26rem)] walk:items-center walk:gap-16">
          <Exhibit
            frameClassName="aspect-[4/5] walk:h-[min(68svh,46rem)]"
            image={photos.applicatorOnPart}
            imageClassName="object-[50%_30%]"
            sizes="(min-width: 1024px) 40vw, 100vw"
            label={{ fig: "04", title: "At the part", tone: "dark", children: "The three tips rest along a centre part, placing oil at the root." }}
            labelPlacement="overlap-right"
          />
          <Exhibit
            className="walk:self-start"
            frameClassName="aspect-square walk:h-[min(40svh,26rem)]"
            image={photos.applicatorMacro}
            imageClassName="origin-bottom-left scale-[1.2] object-[0%_85%]"
            sizes="(min-width: 1024px) 28vw, 100vw"
            label={{ fig: "05", title: "Applicator, close", tone: "dark", children: "A drop forming at one tip." }}
            labelPlacement="below"
          />
          <div>
            <h2 className="text-display-m">
              Made for the part, <em className="text-cocoa-soft">not the palm.</em>
            </h2>
            <ol className="mt-8 border-t border-ivory/20">
              {details.map((d, i) => (
                <li key={d.title} className="grid grid-cols-[2rem_1fr] gap-x-3 border-b border-ivory/20 py-4">
                  <span className="fig pt-1 text-oil">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-sans text-base font-semibold">{d.title}</h3>
                    <p className="mt-1 text-sm text-ivory/75">
                      {d.body}
                      {d.verify ? <NeedsVerification note={d.verify} className="border-cocoa-soft text-cocoa-soft" /> : null}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Room>
  );
}

export function MaterialsRoom() {
  return (
    <Room id="materials" width="112vw" className={roomPad}>
      <div className="flex h-full flex-col">
        <RoomTag id="materials" className="text-cocoa" />
        <div className="mt-10 grid flex-1 gap-16 walk:mt-6 walk:grid-cols-[auto_auto_minmax(16rem,22rem)] walk:items-end walk:gap-16">
          <figure className="walk:self-start">
            <div className="relative aspect-[3/4] overflow-hidden bg-plaster walk:h-[min(56svh,36rem)]">
              <Image
                src={photos.flatlayPlaster.src}
                alt="Rosemary sprigs on warm plaster beside the Veilla bottle"
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="scale-[1.5] object-cover object-[100%_0%]"
              />
            </div>
            <WallLabel fig="06" title="Rosemary" className="mt-4">
              Herbaceous, green, a little camphor-bright. The scent that tells you the ritual has started.
            </WallLabel>
          </figure>
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden bg-linen walk:h-[min(48svh,30rem)]">
              <Image
                src={photos.ceramicTray.src}
                alt={photos.ceramicTray.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[70%_60%]"
              />
            </div>
            <WallLabel fig="07" title="Avocado" className="mt-4">
              A soft, cushioning oil with a slow glide, giving the blend its body.
            </WallLabel>
          </figure>
          <div className="max-w-sm">
            <p className="font-display text-[1.75rem] leading-tight">
              We describe how it feels and smells. Not what it does to growth.
            </p>
            <p className="mt-4 text-sm text-ink-soft">
              Full ingredient list (INCI) and percentages
              <NeedsVerification note="Formula details from the manufacturer" />
            </p>
            <p className="fig mt-10 text-cocoa">
              <span className="hidden walk:inline">End of the walk · the ritual continues below ↓</span>
            </p>
          </div>
        </div>
      </div>
    </Room>
  );
}
