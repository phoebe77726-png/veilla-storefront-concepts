# Veilla — Version C: "Infusion"

Product-first, scroll-choreographed storefront. See [DESIGN.md](DESIGN.md).

```bash
npm install
npm run dev -- -p 3300
```

## The experience
1. **Infusion stage** (pinned): the real bottle in studio light → rosemary and avocado drift in and are named → they travel into the bottle → gold light rises inside it (masked to the bottle's silhouette). The add-to-bag button never leaves the stage.
2. **Applicator stage** (pinned): the applicator turns into view as you scroll; three leader lines draw out — *Straight to the root*, *Precision-tip design*, *Off your fingertips* — and an oil drop forms at the tips. On phones the callouts become a numbered list with matching markers on the applicator.
3. Ritual (3 steps), the kit offer, FAQ, closing call to action.
4. Buying is always one tap away: in the hero, in the header (desktop) once you scroll past it, and in a bottom bar on mobile.

Reduced motion: no pinning; both stages render as finished, static compositions.

## Product cutouts
`src/assets/cutouts/` were lifted from your supplied photos on this Mac — Apple Vision subject-lifting for the bottle, applicator and avocado; a colour key for the rosemary. Nothing was generated or redrawn; labels are untouched. Sharper, higher-resolution studio shots of the applicator would make stage 2 crisper on large retina screens.

## Functional vs. mocked
Cart, quantity, drawer, empty state, navigation and product page work. Checkout is simulated (`/checkout`); the Shopify adapter is written but not connected; items tagged *Needs verification* still need confirming.
