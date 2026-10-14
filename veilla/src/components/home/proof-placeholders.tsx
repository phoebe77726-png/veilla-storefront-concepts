/**
 * Social proof slots. Veilla has no published customer reviews yet, so these are
 * clearly labelled placeholders. Replace with verified reviews (e.g. from
 * Shopify Product Reviews / Judge.me) only once they exist.
 */

function Slot({ size, label }: { size: "lg" | "sm"; label: string }) {
  return (
    <figure
      className={
        size === "lg"
          ? "flex min-h-72 flex-col justify-between border border-dashed border-ink-soft/50 p-8 lg:col-span-7 lg:row-span-2 lg:min-h-full lg:p-12"
          : "flex min-h-40 flex-col justify-between border border-dashed border-ink-soft/50 p-6 lg:col-span-5"
      }
    >
      <p className="eyebrow text-cocoa">Placeholder · {label}</p>
      <blockquote
        className={size === "lg" ? "my-8 font-display text-[1.75rem] leading-snug text-ink-soft" : "my-5 font-display text-xl leading-snug text-ink-soft"}
      >
        {size === "lg"
          ? "A verified customer review will appear here, quoted in the customer’s own words."
          : "Reserved for a verified review."}
      </blockquote>
      <figcaption className="text-sm text-ink-soft">Not a real review. Do not publish until replaced.</figcaption>
    </figure>
  );
}

export function ProofPlaceholders() {
  return (
    <section aria-labelledby="proof-title" className="border-t border-sand/70">
      <div className="container-veil py-section">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="eyebrow text-cocoa lg:col-span-2 lg:pt-4">In their words</p>
          <div className="lg:col-span-8">
            <h2 id="proof-title" className="text-display-m">
              Reviews will live here, <em>once they are real.</em>
            </h2>
            <p className="mt-5 max-w-xl text-ink-soft">
              We are a new brand and will not invent praise. The slots below are layout placeholders.
            </p>
          </div>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <Slot size="lg" label="Featured review" />
          <Slot size="sm" label="Review" />
          <Slot size="sm" label="Review" />
        </div>
      </div>
    </section>
  );
}
