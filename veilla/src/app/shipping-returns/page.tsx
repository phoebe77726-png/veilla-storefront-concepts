import type { Metadata } from "next";
import { NeedsVerification } from "@/components/site/needs-verification";
import { PageIntro } from "@/components/site/page-intro";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Delivery, shipping costs and returns for the Veilla pre-wash scalp kit.",
};

const sections: { title: string; rows: { term: string; detail: React.ReactNode }[] }[] = [
  {
    title: "Shipping",
    rows: [
      { term: "Where we ship", detail: <>United States <NeedsVerification note="Shipping destinations" /></> },
      { term: "Processing time", detail: <>Orders leave our studio within [X] business days <NeedsVerification note="Fulfilment SLA" /></> },
      { term: "Delivery estimate", detail: <>[X–Y] business days after dispatch <NeedsVerification note="Carrier and service level" /></> },
      { term: "Cost", detail: <>Calculated at checkout; free over $[X] <NeedsVerification note="Rates and any free-shipping threshold" /></> },
      { term: "Tracking", detail: "A tracking link is emailed as soon as your order ships." },
    ],
  },
  {
    title: "Returns",
    rows: [
      { term: "Window", detail: <>[X] days from delivery <NeedsVerification note="Return window" /></> },
      { term: "Condition", detail: <>Unopened items; opened oil may not be returnable for hygiene reasons <NeedsVerification note="Opened-product policy" /></> },
      { term: "How to start", detail: <>Email us with your order number <NeedsVerification note="Returns contact or portal" /></> },
      { term: "Refunds", detail: <>To the original payment method within [X] days of receipt <NeedsVerification note="Refund timing" /></> },
      { term: "Damaged in transit", detail: <>Send a photo within [X] days and we will make it right <NeedsVerification note="Damage policy" /></> },
    ],
  },
];

export default function ShippingReturnsPage() {
  return (
    <>
      <PageIntro eyebrow="Policies" title={<>Shipping <em>&amp;</em> returns</>}>
        <p>
          Bracketed values are placeholders. Every item marked for verification must be confirmed before
          launch.
        </p>
      </PageIntro>
      <div className="container-veil space-y-20 pb-section">
        {sections.map((s) => (
          <section key={s.title} aria-labelledby={`policy-${s.title}`} className="grid gap-6 lg:grid-cols-12">
            <h2 id={`policy-${s.title}`} className="text-[2rem] leading-none lg:col-span-3 lg:col-start-3">
              {s.title}
            </h2>
            <dl className="border-t border-sand lg:col-span-7">
              {s.rows.map((r) => (
                <div key={r.term} className="grid gap-1 border-b border-sand py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <dt className="eyebrow pt-1 text-cocoa">{r.term}</dt>
                  <dd>{r.detail}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </>
  );
}
