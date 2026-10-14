# Veilla — Version C: "Infusion"

Product-first and scroll-choreographed. The real bottle and applicator (cut out from the supplied photos, labels untouched) are the stage; the story is told by moving them, not by stacking sections.

## 1. Customer and conversion goal
Shoppers who already oil their scalp (or want to) and dislike droppers and oily hands. Goal: **Add to bag** within the first two scenes. The buy button is visible in the first viewport, rides in the header once you scroll past it, and becomes a bottom bar on mobile.

## 2. Visual concept — "Infusion"
1. **The bottle** stands alone in a warm studio light-box.
2. **Rosemary and avocado** drift in, are named, then travel into the bottle's neck and shrink away; the oil inside lights up from the bottom (a gold glow masked to the bottle's own silhouette).
3. **The applicator** turns into view on deep green and three precise leader lines point out what it does: straight to the root, precision-tip design, off your fingertips.
4. A short ritual, a clean offer, honest FAQ.

## 3. Color tokens
Brand palette unchanged (ivory `#F5EFE4`, plaster `#E9D3BE`, botanical `#1F3A2B` / `#132519`, cocoa `#6E4E3D`, ink `#1C1B17`). The single accent `oil #C08A2C` is used as **light**: the infusion glow, the leader-line dots, the oil drop.

## 4. Typography
- Display: *Instrument Serif*, condensed and elegant at very large sizes, with italic for one word per headline.
- Text/UI: *Hanken Grotesk*, clean and highly legible.

## 5. Spacing and layout
Pinned "stages" (sticky, full viewport under the header) driven by scroll progress; outside the stages, normal sections on a 12-column grid with the shared gutter. Cutouts carry soft contact shadows so they sit on the surface rather than float.

## 6. Wireframes
```
DESKTOP stage 1 (pinned)                 stage 2 (pinned, green)
┌──────────────────────────────────────┐ ┌──────────────────────────────────────┐
│ Oil the scalp,          ▮ bottle     │ │ (3) Off your     ╲                    │
│ not your hands.        ▮▮▮           │ │    fingertips ───● ▯ applicator       │
│ $39.99 [Add the kit]   ▮▮▮  ← glow   │ │ (2) Precision ───● ▯ (turns as you    │
│  rosemary ↘   ↙ avocado              │ │     tips           ▯  scroll)         │
│  …they travel into the neck…         │ │              ●─── (1) Straight to     │
└──────────────────────────────────────┘ │                       the root        │
MOBILE: same stages, bottle centred,     └──────────────────────────────────────┘
ingredients from screen edges; callouts become a numbered list under the applicator.
```

## 7. Motion plan
- Stage 1: bottle float → ingredients in (labelled) → ingredients into the neck → gold fill rises.
- Stage 2: applicator turns (rotate + slight rotateY) into place → leader lines draw one by one → an oil drop forms at the tips.
- Everything else: one gentle fade-up per heading.
- Reduced motion: no pinning; both stages render as finished, static compositions.

## 8. Component inventory
`InfusionStage` · `ApplicatorStage` (+ `Callout`) · `HowItWorks` · `Offer` · `FaqSection` · `ClosingCta` · `HeaderBuy` (header add-to-bag after the hero) · `StickyAddToCart` (mobile) · shared cart drawer, quantity selector, add-to-cart button, product page, `NeedsVerification`.
