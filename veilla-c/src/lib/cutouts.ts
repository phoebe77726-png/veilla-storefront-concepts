import applicator from "@/assets/cutouts/applicator.png";
import avocado from "@/assets/cutouts/avocado.png";
import bottle from "@/assets/cutouts/bottle.png";
import rosemaryA from "@/assets/cutouts/rosemary-a.png";
import rosemaryB from "@/assets/cutouts/rosemary-b.png";

/**
 * Transparent cutouts lifted from the supplied Veilla photography with Apple's
 * Vision subject-lifting (bottle, applicator, avocado) and a colour key (rosemary).
 * Labels and packaging are untouched.
 */
export const cutouts = {
  bottle: { src: bottle, alt: "Veilla Rosemary + Avocado Hair Oil, 1 fl oz / 30 mL frosted dropper bottle" },
  applicator: { src: applicator, alt: "The Veilla scalp applicator: clear body filled with oil, frosted top, three metal tips" },
  avocado: { src: avocado, alt: "Half an avocado" },
  rosemaryA: { src: rosemaryA, alt: "A sprig of rosemary" },
  rosemaryB: { src: rosemaryB, alt: "A sprig of rosemary" },
} as const;
