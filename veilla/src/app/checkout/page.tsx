import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/site/page-intro";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Checkout (preview)",
  robots: { index: false },
};

/**
 * Landing page for the mock adapter's checkout hand-off.
 * With Shopify connected, getCheckoutUrl() returns Shopify's hosted checkout instead.
 */
export default function CheckoutPreviewPage() {
  return (
    <>
      <PageIntro eyebrow="Checkout" title={<>Checkout is <em>simulated</em> in this preview.</>}>
        <p>
          Your bag was handed off correctly. In production this step opens Shopify&rsquo;s secure hosted
          checkout (or a Stripe Checkout session). No order was placed and no payment was taken.
        </p>
      </PageIntro>
      <div className="container-veil pb-section lg:pl-[calc(2/12*100%+var(--spacing-gutter))]">
        <Button size="cta" render={<Link href="/" />} nativeButton={false}>
          Back to the store
        </Button>
      </div>
    </>
  );
}
