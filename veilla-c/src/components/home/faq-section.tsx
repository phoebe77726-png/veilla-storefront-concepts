import Link from "next/link";
import { FaqList } from "@/components/site/faq-list";
import { faqs } from "@/content/faq";

const featured = ["how-to-use", "when", "hair-types", "growth", "travel"];

export function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="border-t border-sand/70">
      <div className="container-veil grid gap-10 py-section lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-cocoa">Questions</p>
          <h2 id="faq-title" className="mt-5 text-display-m">
            Asked <em>before</em> the first wash.
          </h2>
          <Link href="/faq" className="mt-8 inline-block underline decoration-sand underline-offset-[6px] hover:decoration-ink">
            All questions
          </Link>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <FaqList items={faqs.filter((f) => featured.includes(f.id))} />
        </div>
      </div>
    </section>
  );
}
