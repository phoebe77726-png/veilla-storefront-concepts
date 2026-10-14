import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PurchasePanel } from "@/components/commerce/purchase-panel";
import { StickyAddToCart } from "@/components/commerce/sticky-add-to-cart";
import { FaqSection } from "@/components/home/faq-section";
import { HowItWorks } from "@/components/home/sections";
import { ProductGallery } from "@/components/product/product-gallery";
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
  return product ? { title: product.title, description: product.description } : {};
}

const details: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "use",
    title: "How to use",
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
    title: "Applicator care",
    body: (
      <p>
        Wipe the tips after each use and store upright with the bottle.
        <NeedsVerification note="Cleaning and storage guidance" />
      </p>
    ),
  },
  {
    id: "shipping",
    title: "Shipping & returns",
    body: (
      <p>
        Delivery times, costs and our return window are listed on the{" "}
        <Link href="/shipping-returns" className="text-ink underline underline-offset-4">
          shipping and returns page
        </Link>
        .
      </p>
    ),
  },
];

export default function ProductPage({ params }: PageProps<"/products/[handle]">) {
  return (
    <>
      {/* Reading params must sit under Suspense so navigations stay instant (Next 16 partial prefetching). */}
      <Suspense fallback={<ProductSkeleton />}>
        <ProductDetail params={params} />
      </Suspense>
      <HowItWorks />
      <FaqSection />
    </>
  );
}

async function ProductDetail({ params }: { params: Promise<{ handle: string }> }) {
  const product = await catalog.getProduct((await params).handle);
  if (!product) notFound();
  const variant = product.variants[0];
  if (!variant) notFound();

  return (
    <>
      <section aria-labelledby="product-title">
        <div className="container-veil grid gap-10 pt-6 pb-section sm:pt-10 lg:grid-cols-12 lg:gap-x-14">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-soft lg:col-span-12">
            <ol className="flex gap-2">
              <li>
                <Link href="/" className="hover:text-ink">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">The Kit</li>
            </ol>
          </nav>

          <div className="min-w-0 lg:col-span-7">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          <div className="min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <p className="eyebrow text-cocoa">Rosemary + Avocado</p>
              <h1 id="product-title" className="mt-4 text-display-m">
                {product.title}
              </h1>
              <p className="mt-3 text-ink-soft">{product.subtitle}</p>
              <p className="mt-6 font-display text-[2rem] tabular-nums">{formatMoney(variant.price)}</p>

              <p className="mt-6 max-w-md">{product.description}</p>

              <ul className="mt-8 border-t border-sand">
                {product.includes.map((item) => (
                  <li key={item.title} className="border-b border-sand py-4">
                    <span className="block">{item.title}</span>
                    <span className="mt-1 block text-sm text-ink-soft">{item.detail}</span>
                  </li>
                ))}
              </ul>

              <PurchasePanel variant={variant} productTitle={product.title} className="mt-8" />

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
            </div>
          </div>
        </div>
      </section>
      <StickyAddToCart product={product} />
    </>
  );
}

function ProductSkeleton() {
  return (
    <div aria-busy className="container-veil grid gap-10 pt-6 pb-section sm:pt-10 lg:grid-cols-12 lg:gap-x-14">
      <div className="h-5 lg:col-span-12" />
      <div className="aspect-[4/5] animate-pulse bg-linen lg:col-span-7" />
      <div className="space-y-5 lg:col-span-5">
        <div className="h-3 w-32 bg-linen" />
        <div className="h-12 w-4/5 bg-linen" />
        <div className="h-8 w-24 bg-linen" />
        <div className="h-24 bg-linen" />
        <div className="h-12 bg-linen" />
      </div>
    </div>
  );
}
