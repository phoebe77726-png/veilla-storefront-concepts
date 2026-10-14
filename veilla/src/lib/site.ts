import { KIT_HANDLE } from "@/lib/commerce/catalog";

export const PRODUCT_PATH = `/products/${KIT_HANDLE}` as const;

export const navLinks = [
  { href: PRODUCT_PATH, label: "The Kit" },
  { href: "/#ritual", label: "Ritual" },
  { href: "/#ingredients", label: "Ingredients" },
  { href: "/faq", label: "FAQ" },
  { href: "/shipping-returns", label: "Shipping" },
] as const;

export const site = {
  name: "Veilla",
  tagline: "The pre-wash scalp ritual, placed with care.",
  description:
    "Veilla pairs a rosemary + avocado hair oil with a portable applicator for more controlled scalp application before you wash.",
};
