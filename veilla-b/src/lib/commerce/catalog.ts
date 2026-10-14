import { photos } from "@/lib/photos";
import type { Product } from "./types";

/**
 * SAMPLE PRODUCT DATA.
 * Facts sourced from the product label and Veilla research docs:
 *  - 30 mL / 1 fl oz Rosemary + Avocado Hair Oil (label)
 *  - applicator approx. 5 × 2 cm (Veilla_Market_Research_Report)
 *  - $39.99 price and SKU VEI-OIL-30 (match the live Shopify product, Oct 2026)
 */
export const KIT_HANDLE = "pre-wash-scalp-kit";

export const sampleKit: Product = {
  id: "veilla-kit",
  handle: KIT_HANDLE,
  title: "The Pre-Wash Scalp Kit",
  subtitle: "Rosemary + Avocado Hair Oil with a portable scalp applicator",
  description:
    "A rosemary and avocado hair oil, paired with a palm-sized applicator that places oil along each part, so the pre-wash step happens at your scalp and stays off your fingertips.",
  images: [
    photos.stillLifeStone,
    photos.applicatorOnPart,
    photos.applicatorMacro,
    photos.flatlayPlaster,
    photos.kitWithBox,
  ],
  variants: [
    {
      id: "veilla-kit-default",
      title: "Oil 30 mL + applicator",
      sku: "VEI-OIL-30",
      price: { amount: 39.99, currencyCode: "USD" },
      compareAtPrice: null,
      availableForSale: true,
    },
  ],
  includes: [
    {
      title: "Rosemary + Avocado Hair Oil",
      detail: "30 mL / 1 fl oz, frosted glass bottle with dropper",
    },
    {
      title: "Portable scalp applicator",
      detail: "Approx. 5 × 2 cm, three metal tips, frosted top",
    },
  ],
};

export const sampleCatalog: Product[] = [sampleKit];
