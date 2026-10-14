import Link from "next/link";
import { NeedsVerification } from "@/components/site/needs-verification";

export type FaqItem = { id: string; group: "Using the kit" | "The oil" | "Orders"; q: string; a: React.ReactNode };

export const faqs: FaqItem[] = [
  {
    id: "how-to-use",
    group: "Using the kit",
    q: "How do I use the kit?",
    a: (
      <p>
        Part your hair where you want the oil to sit, fill the applicator from the bottle, then glide the three
        tips along the part. Move a finger-width over and repeat. Leave the oil to rest, then shampoo as usual.
        <NeedsVerification note="Filling method, amount per application and resting time" />
      </p>
    ),
  },
  {
    id: "when",
    group: "Using the kit",
    q: "When does it fit into my routine?",
    a: (
      <p>
        Before you wash. It is designed as a pre-wash step: the first thing you do on wash day, before the
        water runs. We do not currently recommend overnight or leave-in use
        <NeedsVerification note="Confirm approved directions with the formulator" />.
      </p>
    ),
  },
  {
    id: "hair-types",
    group: "Using the kit",
    q: "Will the applicator work with my hair?",
    a: (
      <p>
        The applicator is designed to bring oil to the scalp along a part, which tends to help when hair is
        dense or when you want to keep oil off the lengths. We have not yet tested it across every hair type
        and density, so we are not claiming it works for all
        <NeedsVerification note="Usability testing across textures and densities" />.
      </p>
    ),
  },
  {
    id: "growth",
    group: "The oil",
    q: "Does it help hair grow?",
    a: (
      <p>
        We do not make hair growth, regrowth or hair-loss claims. Veilla is a pre-wash scalp oil and an
        application tool: it is about how the ritual feels and how controlled the application is. If you are
        concerned about hair loss, please speak with a dermatologist.
      </p>
    ),
  },
  {
    id: "ingredients",
    group: "The oil",
    q: "What is in the oil?",
    a: (
      <p>
        Rosemary and avocado lead the blend. The full ingredient list will be published here and on the
        carton
        <NeedsVerification note="Full INCI list" />. Patch test on a small area before first use.
      </p>
    ),
  },
  {
    id: "clean",
    group: "Using the kit",
    q: "How do I clean and store the applicator?",
    a: (
      <p>
        Wipe the tips after each use and store upright.
        <NeedsVerification note="Manufacturer cleaning, refill and storage guidance" />
      </p>
    ),
  },
  {
    id: "travel",
    group: "Using the kit",
    q: "Can I travel with it?",
    a: (
      <p>
        The applicator is about 5 × 2 cm, so it fits easily in a wash bag. We have not yet confirmed it is
        leakproof when filled, so pack it upright in a sealed pouch
        <NeedsVerification note="Leak testing" />.
      </p>
    ),
  },
  {
    id: "shipping",
    group: "Orders",
    q: "Where do you ship, and can I return it?",
    a: (
      <p>
        See our <Link href="/shipping-returns">shipping and returns</Link> page for current details.
      </p>
    ),
  },
];
