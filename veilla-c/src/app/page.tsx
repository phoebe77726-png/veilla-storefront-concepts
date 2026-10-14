import { notFound } from "next/navigation";
import { StickyAddToCart } from "@/components/commerce/sticky-add-to-cart";
import { ApplicatorStage } from "@/components/home/applicator-stage";
import { FaqSection } from "@/components/home/faq-section";
import { InfusionStage } from "@/components/home/infusion-stage";
import { ClosingCta, HowItWorks, Offer } from "@/components/home/sections";
import { KIT_HANDLE, catalog } from "@/lib/commerce";

export default async function HomePage() {
  const product = await catalog.getProduct(KIT_HANDLE);
  if (!product) notFound();

  return (
    <>
      <InfusionStage product={product} />
      <ApplicatorStage />
      <HowItWorks />
      <Offer product={product} />
      <FaqSection />
      <ClosingCta product={product} />
      <StickyAddToCart product={product} />
    </>
  );
}
