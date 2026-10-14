import type { Metadata } from "next";
import { FaqList } from "@/components/site/faq-list";
import { PageIntro } from "@/components/site/page-intro";
import { faqs, type FaqItem } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "How to use the Veilla pre-wash scalp kit, what is in the oil, and how orders work.",
};

const groups: FaqItem["group"][] = ["Using the kit", "The oil", "Orders"];

export default function FaqPage() {
  return (
    <>
      <PageIntro eyebrow="FAQ" title={<>Questions, <em>answered plainly.</em></>}>
        <p>
          Where we are still confirming a detail with our manufacturer, we say so rather than guess.
        </p>
      </PageIntro>
      <div className="container-veil space-y-16 pb-section">
        {groups.map((group) => (
          <section key={group} aria-labelledby={`faq-${group}`} className="grid gap-6 lg:grid-cols-12">
            <h2 id={`faq-${group}`} className="eyebrow pt-6 font-sans text-ink-soft lg:col-span-3 lg:col-start-3">
              {group}
            </h2>
            <div className="lg:col-span-7">
              <FaqList items={faqs.filter((f) => f.group === group)} />
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
