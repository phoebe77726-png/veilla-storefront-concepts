import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AcquireTicket } from "@/components/commerce/acquire-ticket";
import { PurchasePanel } from "@/components/commerce/purchase-panel";
import { WallLabel } from "@/components/exhibit/exhibit";
import { NeedsVerification } from "@/components/site/needs-verification";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { catalog } from "@/lib/commerce";
import { sampleCatalog } from "@/lib/commerce/catalog";
import { formatMoney } from "@/lib/format";

export function generateStaticParams() {
  return sampleCatalog.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: PageProps<"/products/[handle]">): Promise<Metadata> {
  const product = await catalog.getProduct((await params).handle);
  return product ? { title: `Object record: ${product.title}`, description: product.description } : {};
}

const figureTitles = ["The kit, at rest", "At the part", "Applicator, close", "From above", "With its carton"];

const details: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "use",
    title: "How it is used",
    body: (
      <ol className="list-decimal space-y-2 pl-5">
        <li>Part dry hair where you want the oil to sit.</li>
        <li>
          Fill the applicator from the bottle.
          <NeedsVerification note="Filling method" />
        </li>
        <li>Glide the three tips along the part, then move a finger-width over and repeat.</li>
        <li>
          Let it rest, then shampoo as usual.
          <NeedsVerification note="Resting time" />
        </li>
      </ol>
    ),
  },
  {
    id: "ingredients",
    title: "Ingredients",
    body: (
      <p>
        Rosemary and avocado lead the blend. Full INCI list
        <NeedsVerification note="Full ingredient list from manufacturer" />. For external use only. Patch test
        before first use and avoid contact with eyes.
      </p>
    ),
  },
  {
    id: "care",
    title: "Care of the applicator",
    body: (
      <p>
        Wipe the tips after each use and store upright with the bottle.
        <NeedsVerification note="Cleaning and storage guidance" />
      </p>
    ),
  },
];

export default function ObjectRecordPage({ params }: PageProps<"/products/[handle]">) {
  return (
    // Reading params sits under Suspense so navigations stay instant (Next 16 partial prefetching).
    <Suspense fallback={<RecordSkeleton />}>
      <ObjectRecord params={params} />
    </Suspense>
  );
}

async function ObjectRecord({ params }: { params: Promise<{ handle: string }> }) {
  const product = await catalog.getProduct((await params).handle);
  if (!product) notFound();
  const variant = product.variants[0];
  if (!variant) notFound();

  const record: [string, React.ReactNode][] = [
    ["Object", product.title],
    ["Catalogue no.", <span key="sku" className="font-mono text-sm">{variant.sku ?? "—"}</span>],
    ["Contents", product.includes.map((i) => <span key={i.title} className="block">{i.title}</span>)],
    ["Materials", "Frosted glass bottle with dropper; clear applicator body with three metal tips"],
    ["Dimensions", "Oil 30 mL / 1 fl oz; applicator approx. 5 × 2 cm"],
    ["Use", "On the scalp, before shampoo"],
  ];

  return (
    <article aria-labelledby="record-title">
      <div className="container-veil grid gap-10 pt-8 pb-section lg:grid-cols-12 lg:gap-x-16">
        <nav aria-label="Breadcrumb" className="fig text-ink-soft lg:col-span-12">
          <ol className="flex gap-2">
            <li>
              <Link href="/" className="hover:text-ink">The exhibition</Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">Object record</li>
          </ol>
        </nav>

        {/* Figures: a swipeable strip on small screens, hung vertically on large ones. */}
        <div className="min-w-0 lg:col-span-7">
          <ul
            tabIndex={0}
            aria-label={`${product.title}, ${product.images.length} figures. Scroll to see more.`}
            className="-mx-(--spacing-gutter) flex snap-x snap-mandatory gap-4 overflow-x-auto px-(--spacing-gutter) pb-2 lg:mx-0 lg:flex-col lg:gap-20 lg:overflow-visible lg:px-0"
          >
            {product.images.map((image, i) => (
              <li key={i} className="w-[82vw] max-w-md shrink-0 snap-start lg:w-full lg:max-w-none">
                <figure className={i % 2 === 1 ? "lg:ml-[18%]" : "lg:mr-[10%]"}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-linen">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      preload={i === 0}
                      sizes="(min-width: 1024px) 50vw, 82vw"
                      className="object-cover"
                    />
                  </div>
                  <WallLabel fig={String(i + 1).padStart(2, "0")} title={figureTitles[i] ?? product.title} className="mt-3" />
                </figure>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <p className="fig text-cocoa">Object record</p>
            <h1 id="record-title" className="mt-4 text-display-m">
              The Pre-Wash <em>Scalp Kit</em>
            </h1>
            <p className="mt-4 max-w-md text-ink-soft">{product.description}</p>

            <dl className="mt-8 border-t border-ink/20 text-sm">
              {record.map(([term, detail]) => (
                <div key={term} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-ink/20 py-3">
                  <dt className="fig pt-0.5 text-ink-soft">{term}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex items-baseline justify-between">
              <p className="fig text-ink-soft">Price</p>
              <p className="font-display text-[2.25rem] tabular-nums">{formatMoney(variant.price)}</p>
            </div>
            <PurchasePanel variant={variant} productTitle={product.title} className="mt-4" />

            <Accordion className="mt-10 border-t border-sand">
              {details.map((d) => (
                <AccordionItem key={d.id} value={d.id} className="border-b border-sand">
                  <AccordionTrigger className="py-5 font-sans text-base font-medium hover:no-underline **:data-[slot=accordion-trigger-icon]:text-cocoa">
                    {d.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-body text-ink-soft">{d.body}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <p className="mt-6 text-sm text-ink-soft">
              <Link href="/shipping-returns" className="text-ink underline underline-offset-4">Getting it home</Link>
              {" · "}
              <Link href="/faq" className="text-ink underline underline-offset-4">Visitor questions</Link>
            </p>
          </div>
        </div>
      </div>
      <AcquireTicket product={product} />
    </article>
  );
}

function RecordSkeleton() {
  return (
    <div aria-busy className="container-veil grid gap-10 pt-8 pb-section lg:grid-cols-12 lg:gap-x-16">
      <div className="h-4 lg:col-span-12" />
      <div className="aspect-[4/5] animate-pulse bg-linen lg:col-span-7" />
      <div className="space-y-5 lg:col-span-5">
        <div className="h-3 w-28 bg-linen" />
        <div className="h-14 w-4/5 bg-linen" />
        <div className="h-40 bg-linen" />
        <div className="h-12 bg-linen" />
      </div>
    </div>
  );
}
