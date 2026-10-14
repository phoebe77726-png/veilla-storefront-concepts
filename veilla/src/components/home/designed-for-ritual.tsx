import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { NeedsVerification } from "@/components/site/needs-verification";
import { photos } from "@/lib/photos";
import { PRODUCT_PATH } from "@/lib/site";

const specs: { term: string; detail: React.ReactNode }[] = [
  { term: "The oil", detail: "Rosemary + Avocado Hair Oil, 30 mL / 1 fl oz" },
  { term: "The bottle", detail: "Frosted glass with a dropper, for refilling the applicator" },
  { term: "The applicator", detail: "Approx. 5 × 2 cm, clear body, three metal tips" },
  { term: "Use", detail: "On the scalp, before shampoo" },
  {
    term: "Uses per bottle",
    detail: (
      <>
        Depends on hair density and sections
        <NeedsVerification note="Typical applications per 30 mL" />
      </>
    ),
  },
];

export function DesignedForRitual() {
  return (
    <section aria-labelledby="designed-title" className="grain bg-plaster">
      <div className="container-veil grid gap-12 py-section lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <p className="eyebrow text-cocoa">Designed for the ritual</p>
          <Reveal>
            <h2 id="designed-title" className="mt-5 text-display-m">
              Two pieces. <em>Each with one job.</em>
            </h2>
          </Reveal>
          <p className="mt-6 max-w-md text-ink-soft">
            The bottle stores and refills. The applicator places. Nothing in the kit is there for the shelf.
          </p>

          <dl className="mt-10 border-t border-ink/15">
            {specs.map((s) => (
              <div key={s.term} className="grid gap-1 border-b border-ink/15 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="eyebrow pt-1 text-cocoa">{s.term}</dt>
                <dd className="text-ink">{s.detail}</dd>
              </div>
            ))}
          </dl>

          <Link
            href={PRODUCT_PATH}
            className="mt-8 inline-block text-ink underline decoration-ink/30 underline-offset-[6px] hover:decoration-ink"
          >
            View full product details
          </Link>
        </div>

        <div className="relative lg:col-span-6 lg:col-start-7 lg:row-start-1">
          <div className="lg:sticky lg:top-24">
            <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={photos.kitWithBox.src}
              alt={photos.kitWithBox.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-[52%_50%]"
            />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
