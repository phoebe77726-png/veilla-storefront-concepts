import Image from "next/image";
import Link from "next/link";
import { PurchasePanel } from "@/components/commerce/purchase-panel";
import { WallLabel } from "@/components/exhibit/exhibit";
import { Room, RoomTag } from "@/components/exhibit/room";
import { Reveal } from "@/components/motion/reveal";
import { FaqList } from "@/components/site/faq-list";
import { NeedsVerification } from "@/components/site/needs-verification";
import { faqs } from "@/content/faq";
import type { Product } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/format";
import { photos } from "@/lib/photos";
import { cn } from "@/lib/utils";

const score = [
  {
    verb: "Part.",
    body: "Comb a clean line where you want the oil to sit: a centre part, then a finger-width either side.",
    image: photos.ritualSofaB,
    position: "object-[60%_15%]",
  },
  {
    verb: "Place.",
    body: "Fill the applicator from the bottle and glide its three tips along the part, so oil lands at the root rather than on your hands.",
    verify: "Filling method and amount per application",
    image: photos.ritualSofaA,
    position: "object-[45%_15%]",
  },
  {
    verb: "Rest.",
    body: "Leave it while you set up the rest of wash day, then shampoo as usual.",
    verify: "Recommended resting time and washout",
    image: photos.portraitBathroom,
    position: "object-[50%_25%]",
  },
];

/** Room 06: the ritual written as a score — three verbs, read top to bottom. */
export function RitualScore() {
  return (
    <Room id="ritual" className="border-t border-sand/70">
      <div className="container-veil py-section">
        <RoomTag id="ritual" className="text-cocoa" />
        <p className="mt-6 max-w-md text-ink-soft">Three movements, performed before the water runs.</p>
        <ol className="mt-14 border-t border-ink/20">
          {score.map((s, i) => (
            <li key={s.verb} className="grid gap-6 border-b border-ink/20 py-8 md:grid-cols-12 md:items-center md:gap-8 md:py-10">
              <span className="fig text-cocoa md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <Reveal className="md:col-span-6">
                <p className="font-display text-display-xxl leading-[0.8]">{s.verb}</p>
              </Reveal>
              <p className="max-w-sm text-ink-soft md:col-span-3">
                {s.body}
                {s.verify ? <NeedsVerification note={s.verify} /> : null}
              </p>
              <div className={cn("relative aspect-[4/5] w-32 overflow-hidden bg-linen md:col-span-2 md:w-full")}>
                <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 768px) 14vw, 128px" className={cn("object-cover", s.position)} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Room>
  );
}

/** Room 07: an honest, empty visitor's book in place of invented reviews. */
export function VisitorsBook() {
  return (
    <Room id="visitors-book" tone="plaster" className="grain">
      <div className="container-veil grid gap-12 py-section lg:grid-cols-12">
        <div className="lg:col-span-4">
          <RoomTag id="visitors-book" className="text-cocoa" />
          <h2 className="mt-6 text-display-m">
            The book is open. <em>No entries yet.</em>
          </h2>
          <p className="mt-5 max-w-sm text-ink-soft">
            We are new, and we will not invent praise. Verified reviews will be added here as they arrive.
          </p>
        </div>
        <div className="border-t border-ink/25 lg:col-span-7 lg:col-start-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-ink/25 py-7">
              <span className="fig text-cocoa">No. {n}</span>
              <div>
                <p className="fig text-ink-soft">Placeholder · not a real review</p>
                <div aria-hidden className="mt-4 space-y-4">
                  <span className="block h-px w-full bg-ink/15" />
                  <span className="block h-px w-4/5 bg-ink/15" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Room>
  );
}

const featured = ["how-to-use", "when", "hair-types", "growth", "travel"];

/** Room 08. */
export function VisitorQuestions() {
  return (
    <Room id="questions">
      <div className="container-veil grid gap-10 py-section lg:grid-cols-12">
        <div className="lg:col-span-4">
          <RoomTag id="questions" className="text-cocoa" />
          <h2 className="mt-6 text-display-m">Asked at the door.</h2>
          <Link href="/faq" className="mt-6 inline-block underline decoration-sand underline-offset-[6px] hover:decoration-ink">
            All visitor questions
          </Link>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <FaqList items={faqs.filter((f) => featured.includes(f.id))} numbered />
        </div>
      </div>
    </Room>
  );
}

/** Room 09: the green room, where the object goes home with you. */
export function TakeItHome({ product }: { product: Product }) {
  const variant = product.variants[0];
  if (!variant) return null;
  return (
    <Room id="take-it-home" tone="green" className="overflow-x-clip">
      <div className="container-veil grid gap-12 py-section lg:grid-cols-12 lg:items-center">
        <figure className="relative lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={photos.linenFlatlay.src} alt={photos.linenFlatlay.alt} fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
          </div>
          <WallLabel fig="08" title="The Pre-Wash Scalp Kit" tone="dark" className="mt-4 lg:absolute lg:-right-8 lg:-bottom-8 lg:mt-0">
            {product.includes.map((i) => (
              <span key={i.title} className="block">
                {i.title}: {i.detail}
              </span>
            ))}
          </WallLabel>
        </figure>
        <div className="lg:col-span-5 lg:col-start-8">
          <RoomTag id="take-it-home" className="text-cocoa-soft" />
          <h2 className="mt-6 text-display-l">
            Take it <em className="text-cocoa-soft">home.</em>
          </h2>
          <p className="mt-6 font-display text-[2.25rem] tabular-nums">{formatMoney(variant.price)}</p>
          <PurchasePanel variant={variant} productTitle={product.title} tone="ivory" className="mt-6" />
          <p className="mt-6 text-sm text-ivory/70">
            Shipping and returns are on the{" "}
            <Link href="/shipping-returns" className="text-ivory underline underline-offset-4">
              getting it home
            </Link>{" "}
            page.
          </p>
        </div>
      </div>
    </Room>
  );
}
