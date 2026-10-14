import { notFound } from "next/navigation";
import { StickyAddToCart } from "@/components/commerce/sticky-add-to-cart";
import { ApplicatorDemo } from "@/components/home/applicator-demo";
import { DesignedForRitual } from "@/components/home/designed-for-ritual";
import { FaqSection } from "@/components/home/faq-section";
import { FinalPurchase } from "@/components/home/final-purchase";
import { Hero } from "@/components/home/hero";
import { IngredientStory } from "@/components/home/ingredient-story";
import { ProblemToRoutine } from "@/components/home/problem-to-routine";
import { ProofPlaceholders } from "@/components/home/proof-placeholders";
import { RitualSteps } from "@/components/home/ritual-steps";
import { KIT_HANDLE, catalog } from "@/lib/commerce";

export default async function HomePage() {
  const product = await catalog.getProduct(KIT_HANDLE);
  if (!product) notFound();

  return (
    <>
      <Hero product={product} />
      <ProblemToRoutine />
      <RitualSteps />
      <ApplicatorDemo />
      <IngredientStory />
      <DesignedForRitual />
      <ProofPlaceholders />
      <FaqSection />
      <FinalPurchase product={product} />
      <StickyAddToCart product={product} />
    </>
  );
}
