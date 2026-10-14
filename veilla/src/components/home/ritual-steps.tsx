import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { NeedsVerification } from "@/components/site/needs-verification";
import { photos } from "@/lib/photos";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    title: "Part",
    body: "Comb a clean line where you want the oil to sit: a centre part, then a finger-width either side. Smaller sections are simply easier to reach.",
    image: photos.ritualSofaB,
    aspect: "aspect-[4/5]",
    position: "object-[60%_20%]",
    offset: "",
  },
  {
    n: "02",
    title: "Place",
    body: "Fill the applicator from the bottle, then glide its three tips along the part so oil lands at the root rather than on your hands.",
    verify: "How the applicator is filled and how much it dispenses",
    image: photos.ritualSofaA,
    aspect: "aspect-square",
    position: "object-[45%_20%]",
    offset: "lg:mt-28",
  },
  {
    n: "03",
    title: "Rest",
    body: "Leave it while you set up the rest of wash day, then shampoo as usual.",
    verify: "Recommended resting time and washout directions",
    image: photos.portraitBathroom,
    aspect: "aspect-[3/4]",
    position: "object-[50%_30%]",
    offset: "lg:mt-56",
  },
];

export function RitualSteps() {
  return (
    <section id="ritual" aria-labelledby="ritual-title" className="grain bg-linen">
      <div className="container-veil py-section">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="eyebrow text-cocoa lg:col-span-2 lg:pt-4">The ritual</p>
          <Reveal className="lg:col-span-7">
            <h2 id="ritual-title" className="text-display-l">
              Three steps, <em>before</em> the water runs.
            </h2>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-3 lg:gap-0">
          {steps.map((step, i) => (
            <li
              key={step.n}
              className={cn(
                "relative lg:px-8",
                i > 0 && "lg:border-l lg:border-sand",
                i === 0 && "lg:pl-0",
                i === steps.length - 1 && "lg:pr-0",
                step.offset,
              )}
            >
              <Reveal delay={i * 0.08}>
                <div className={cn("relative overflow-hidden bg-plaster", step.aspect)}>
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className={cn("object-cover", step.position)}
                  />
                </div>
                <div className="mt-6 flex items-baseline gap-4">
                  <span className="font-display text-xl text-cocoa italic">{step.n}</span>
                  <h3 className="text-[2rem] leading-none">{step.title}</h3>
                </div>
                <p className="mt-4 max-w-sm text-ink-soft">
                  {step.body}
                  {step.verify ? <NeedsVerification note={step.verify} /> : null}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
