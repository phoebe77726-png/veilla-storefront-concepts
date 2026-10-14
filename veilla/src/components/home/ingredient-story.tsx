import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { NeedsVerification } from "@/components/site/needs-verification";
import { photos } from "@/lib/photos";

export function IngredientStory() {
  return (
    <section id="ingredients" aria-labelledby="ingredients-title" className="overflow-x-clip">
      <div className="container-veil py-section">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="eyebrow text-cocoa lg:col-span-2 lg:pt-4">In the bottle</p>
          <Reveal className="lg:col-span-8">
            <h2 id="ingredients-title" className="text-display-l">
              Green and bright, <em>then rich and slow.</em>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-y-16 lg:mt-24 lg:grid-cols-12 lg:gap-x-12">
          <article className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-plaster">
              <Image
                src={photos.flatlayPlaster.src}
                alt={photos.flatlayPlaster.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="scale-[1.35] object-cover object-[12%_15%]"
              />
            </div>
            <h3 className="mt-7 text-[2rem] leading-none">Rosemary</h3>
            <p className="mt-4 max-w-md text-ink-soft">
              Herbaceous, green, a little camphor-bright. Its scent is the first signal that the ritual has
              started: windows open, kettle on, an hour that belongs to you.
            </p>
          </article>

          <article className="lg:col-span-7 lg:mt-40">
            <div className="relative aspect-[7/5] overflow-hidden bg-linen">
              <Image
                src={photos.ceramicTray.src}
                alt={photos.ceramicTray.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover object-[70%_60%]"
              />
            </div>
            <h3 className="mt-7 text-[2rem] leading-none">Avocado</h3>
            <p className="mt-4 max-w-md text-ink-soft">
              A soft, cushioning oil with a slow glide, giving the blend its body as you work it in along
              each part before you wash.
            </p>
          </article>
        </div>

        <p className="mt-16 max-w-2xl border-t border-sand pt-6 text-sm text-ink-soft lg:ml-[calc(5/12*100%)]">
          Full ingredient list (INCI), oil percentages and sourcing
          <NeedsVerification note="Formula details from the manufacturer" />. We describe how the oil feels and
          smells, not what it does to hair growth.{" "}
          <Link href="/faq" className="text-ink underline underline-offset-4">
            Read why in the FAQ
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
