import Image from "next/image";
import { Parallax, Reveal } from "@/components/motion/reveal";
import { NeedsVerification } from "@/components/site/needs-verification";
import { photos } from "@/lib/photos";

const details = [
  {
    title: "Three metal tips",
    body: "Spaced to rest along a part, so oil is set down at the root in a narrow line.",
  },
  {
    title: "Clear body",
    body: "You can see how much oil is loaded before you begin, and when to top it up.",
  },
  {
    title: "Frosted top",
    body: "The end you hold, keeping your fingertips well away from the oil.",
    verify: "Whether the top is pressed to dispense",
  },
  {
    title: "About 5 × 2 cm",
    body: "Small enough to sit in a wash bag or a travel pouch alongside the bottle.",
  },
];

export function ApplicatorDemo() {
  return (
    <section aria-labelledby="applicator-title" className="on-dark overflow-x-clip bg-botanical text-ivory">
      <div className="container-veil grid gap-12 py-section lg:grid-cols-12 lg:items-center">
        <div className="relative -mx-(--spacing-gutter) lg:col-span-7 lg:mr-0">
          <Parallax distance={24} className="relative aspect-square overflow-hidden lg:aspect-[6/5]">
            <Image
              src={photos.applicatorMacro.src}
              alt={photos.applicatorMacro.alt}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="origin-bottom-left scale-[1.2] object-cover object-[0%_85%]"
            />
          </Parallax>
        </div>

        <div className="lg:col-span-5 lg:pl-6">
          <p className="eyebrow text-cocoa-soft">Up close</p>
          <Reveal>
            <h2 id="applicator-title" className="mt-5 text-display-m">
              Made for the part, <em className="text-cocoa-soft">not the palm.</em>
            </h2>
          </Reveal>
          <ol className="mt-10 border-t border-ivory/20">
            {details.map((d, i) => (
              <li key={d.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-ivory/20 py-5">
                <span className="font-display text-lg text-oil italic">{i + 1}</span>
                <div>
                  <h3 className="font-sans text-base font-semibold">{d.title}</h3>
                  <p className="mt-1.5 text-ivory/75">
                    {d.body}
                    {d.verify ? (
                      <NeedsVerification note={d.verify} className="border-cocoa-soft text-cocoa-soft" />
                    ) : null}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
