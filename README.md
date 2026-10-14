# Veilla storefront concepts

Three design directions for **Veilla**, a single-product brand selling the Pre-Wash Scalp Kit: a rosemary + avocado hair oil with a portable scalp applicator. Each folder is a standalone Next.js app (App Router, TypeScript, Tailwind CSS, shadcn/ui, Motion, Lucide) sharing the same product facts, copy rules and commerce adapter.

| Folder | Direction | Idea |
| --- | --- | --- |
| [`veilla/`](veilla) | **A: Editorial** | Warm editorial storefront. Signature interaction: the hero photo "parts" along a scalp-part line to reveal the applicator in use. |
| [`veilla-b/`](veilla-b) | **B: A Study in Control** | The site as an exhibition of one object: a sideways gallery walk, wall labels, a floor-plan menu and an empty Visitor's Book in place of fake reviews. |
| [`veilla-c/`](veilla-c) | **C: Infusion** | Product-first scroll choreography: rosemary and avocado travel into the real bottle, then the applicator turns into view with three callouts. |

Each folder has its own `DESIGN.md` (design direction) and `README.md` (what works vs. what is mocked).

## Run one
```bash
cd veilla-c
npm install
npm run dev
```

## Shared notes
- **Commerce:** sample data with a local mock cart; checkout is simulated. A Shopify Storefront API adapter is included but not yet connected (`src/lib/commerce/`).
- **Copy rules:** no hair-growth, regrowth, hair-loss, DHT or clinical claims. Unconfirmed facts are tagged in the UI as *Needs verification*.
- **Imagery:** all photography is Veilla's own product imagery. Version C's transparent cutouts were lifted from those photos without altering labels or packaging.
