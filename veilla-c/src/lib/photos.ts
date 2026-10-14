import applicatorMacro from "@/assets/photos/applicator-macro.jpg";
import applicatorOnPart from "@/assets/photos/applicator-on-part.jpg";
import ceramicTray from "@/assets/photos/ceramic-tray.jpg";
import flatlayPlaster from "@/assets/photos/flatlay-plaster.jpg";
import kitWithBox from "@/assets/photos/kit-with-box.jpg";
import linenFlatlay from "@/assets/photos/linen-flatlay.jpg";
import portraitBathroom from "@/assets/photos/portrait-bathroom.jpg";
import ritualSofaA from "@/assets/photos/ritual-sofa-a.jpg";
import ritualSofaB from "@/assets/photos/ritual-sofa-b.jpg";
import stillLifeStone from "@/assets/photos/still-life-stone.jpg";

/**
 * Every photo is the supplied Veilla product photography.
 * Images whose label reads "38 ML" were excluded — see DESIGN.md.
 */
export const photos = {
  stillLifeStone: {
    src: stillLifeStone,
    alt: "Veilla Rosemary + Avocado Hair Oil bottle beside the clear scalp applicator on a plaster block, with rosemary and half an avocado",
  },
  applicatorOnPart: {
    src: applicatorOnPart,
    alt: "A hand holding the Veilla applicator so its three metal tips rest along a centre part, placing oil at the roots",
  },
  flatlayPlaster: {
    src: flatlayPlaster,
    alt: "Overhead view of the Veilla applicator and oil bottle on warm plaster, framed by rosemary sprigs and half an avocado",
  },
  applicatorMacro: {
    src: applicatorMacro,
    alt: "Close-up of the filled Veilla applicator lying on its side, a drop of oil forming on one of its three metal tips",
  },
  kitWithBox: {
    src: kitWithBox,
    alt: "The Veilla kit: oil bottle, sage-green carton and applicator on a stone slab with rosemary and a dish of oil",
  },
  linenFlatlay: {
    src: linenFlatlay,
    alt: "Veilla oil bottle and applicator on natural linen in soft daylight, with rosemary and avocado",
  },
  ceramicTray: {
    src: ceramicTray,
    alt: "Veilla bottle and applicator on a sage ceramic tray beside half an avocado",
  },
  ritualSofaA: {
    src: ritualSofaA,
    alt: "A woman on a sofa touching the Veilla applicator to her part while holding the oil bottle",
  },
  ritualSofaB: {
    src: ritualSofaB,
    alt: "A woman in a green shirt applying oil along her part with the Veilla applicator",
  },
  portraitBathroom: {
    src: portraitBathroom,
    alt: "A woman in a bright bathroom holding the Veilla applicator in one hand and the oil bottle in the other",
  },
} as const;
