import { Reveal } from "@/components/motion/reveal";

export function ProblemToRoutine() {
  return (
    <section aria-labelledby="problem-title" className="border-t border-sand/70">
      <div className="container-veil grid gap-10 py-section lg:grid-cols-12">
        <p className="eyebrow text-cocoa lg:col-span-2 lg:pt-4">Before the wash</p>
        <Reveal className="lg:col-span-9">
          <h2 id="problem-title" className="text-display-m text-ink">
            Droppers drift. Fingertips get slick. Oil settles on the lengths before it ever reaches the scalp.
          </h2>
        </Reveal>

        <div className="relative lg:col-span-6 lg:col-start-6">
          {/* The part motif: a short oil-coloured rule leading from problem to routine. */}
          <span aria-hidden className="mb-8 block h-20 w-[2px] bg-oil" />
          <Reveal>
            <p className="font-display text-[1.5rem] leading-snug text-ink sm:text-[1.75rem]">
              Veilla turns that step into a routine you can repeat:{" "}
              <em className="text-botanical">part, place, rest.</em>
            </p>
            <p className="mt-5 max-w-lg text-ink-soft">
              The oil is the comfort. The applicator is the control: it brings the oil to the line you have
              parted, so you can work section by section without reaching for a dropper and a towel.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
