# Veilla — Design Direction

## 0. Inputs I audited

| Source | What it gave us |
| --- | --- |
| Supplied product photography (12 images) | Real product: frosted 1 fl oz dropper bottle, deep-green scalloped label "Rosemary + Avocado Hair Oil — Nourishing Scalp and Strand Elixir", sage carton, clear refill-style applicator with frosted cap and three metal ball tips. Warm plaster/peach sets, linen, rosemary sprigs, halved avocado. |
| `Veilla_Market_Research_Report.docx.pdf` | 30 mL oil + applicator approx. 5 × 2 cm. Copy guardrails: lead with application control; "mess-free", "precise", "faster", "no sectioning" need testing; no growth/regrowth claims. |
| `Veilla Market Research Plan.pdf` | Bundle price **$39.99** (treated as sample price until confirmed). "Everything Shower" / weekly-reset psychology; dropper frustration; fine-hair greasiness; coily-hair scalp access. |
| Existing code / checkout / fonts | None existed. No brand font or hex palette was supplied, so tokens below are derived from the label and photography. |
| frontend-design / shadcn skills | Not installed in this environment. Used the shadcn CLI directly (Base UI "base-nova" registry). |

**Photo QA:** `new website image 1.png` and `website image 2.png` print **"1 fl oz / 38 ML"** on the label (1 fl oz ≈ 30 mL). They are excluded; every image used reads "30 mL".

## 1. Customer and conversion goal

**Customer:** people who already oil their scalp before washing (or want to) and find it fiddly—droppers that drift, oil on fingers, oil caught in lengths before it reaches skin. Two physical realities: fine hair (wants placement, fears greasy lengths) and dense/coily hair (wants access to the scalp).

**Conversion goal:** one action—**add the kit to cart**—reachable from every viewport. Secondary: understand the 3-step ritual well enough to feel confident it fits their hair. Trust comes from honesty (clear facts, no invented proof), not urgency.

## 2. Visual concept — "The Part"

The scalp part is the organising line of the brand. A single thin vertical rule recurs: it splits the hero open, marks ritual steps, and divides spec tables. Photography is the texture—plaster, linen, glass, oil—shown big and cropped asymmetrically. Botanicals live in the photos, never as icons.

## 3. Color tokens

| Token | Hex | Use |
| --- | --- | --- |
| `ivory` | `#F5EFE4` | page background |
| `paper` | `#FBF8F2` | drawers, raised surfaces |
| `linen` | `#EAE1D1` | quiet bands, placeholders |
| `plaster` | `#E9D3BE` | warm section wash (matches photo sets) |
| `sand` | `#D3C4AD` | hairlines, borders |
| `ink` | `#1C1B17` | primary text |
| `ink-soft` | `#585148` | secondary text (6.8:1 on ivory) |
| `botanical` | `#1F3A2B` | primary actions, dark sections (label green) |
| `botanical-deep` | `#132519` | hover / deepest surfaces |
| `cocoa` | `#6E4E3D` | editorial accents, numerals, links on light |
| `cocoa-soft` | `#C6A690` | captions on dark (5.1:1 on botanical) |
| `oil` (single accent) | `#C08A2C` | the "part" line, active markers, focus ring on dark. Never body text on light. |

## 4. Typography

- **Display:** *Newsreader* (variable, optical sizes, true italics) — editorial, warm, not "luxury Didone".
- **Text/UI:** *Instrument Sans* — compact, highly legible at 14–17px.
- Scale (fluid): Display XL `clamp(3rem, 7vw, 7rem)` / 0.95 · Display L `clamp(2.4rem, 4.8vw, 4.5rem)` / 1.0 · Display M `clamp(1.9rem, 3.2vw, 3rem)` / 1.08 · H3 serif 1.5rem · Body 1.0625rem / 1.6 · Small 0.875rem · Eyebrow 0.75rem, 600, +0.16em, uppercase.
- Italic serif used for one word per headline, max.

## 5. Spacing and layout

- 4px base. Section rhythm `clamp(5rem, 11vw, 10.5rem)`.
- Container max 1440px, side padding `clamp(1rem, 4vw, 3.5rem)` (16px at 375).
- 12-column grid, 24px gutters (16px mobile). Asymmetry rule: image columns are 7/12 or 5/12, never 6/6; at least one image per section breaks the column edge.
- Radius: 2px on controls, 0 on photography. No card grids.

## 6. Wireframes

```
DESKTOP 1440                                   MOBILE 375
┌──────────────────────────────────────────┐   ┌─────────────────┐
│ Veilla      Kit  Ritual  FAQ   Bag(0)    │   │ ☰  Veilla  Bag  │
├───────────────┬──────────────────────────┤   ├─────────────────┤
│ EYEBROW       │ ┌────────┃────────┐      │   │ Headline 2-3 ln │
│ Headline XL   │ │ still  ┃  life  │ ←split│   │ ┌─────────────┐ │
│ sub copy      │ │ (reveals applic- │      │   │ │ hero frame  │ │
│ $39.99 [Add]  │ │  ator on part)   │      │   │ │  4:5 split  │ │
│ facts row     │ └──────────────────┘      │   │ └─────────────┘ │
├───────────────┴──────────────────────────┤   │ sub · [Add kit] │
│ Problem statement (serif, wide)  → routine│  ├─────────────────┤
├──────────┬──────────┬────────────────────┤   │ statement       │
│ 01 Part  │ 02 Place │ 03 Rest  (staggered)│  │ 01 / 02 / 03    │
├──────────┴───────┬──┴────────────────────┤   │ stacked w/ rule │
│ macro applicator │ annotations 1–3       │   │ macro image     │
│ (bleeds left 7/12)│ (5/12)               │   │ annotations     │
├──────────────────┴───────────────────────┤   │ ingredients     │
│ Rosemary (5/12 img) │ Avocado (7/12 img) │   │ spec table      │
├──────────────────────────────────────────┤   │ placeholders    │
│ Designed for the ritual: spec table +img │   │ FAQ accordion   │
│ Placeholder reviews (1 large + 2 small)  │   │ final CTA       │
│ FAQ (4/12 heading · 8/12 accordion)      │   │ footer          │
│ Final purchase (green band, kit photo)   │   ├─────────────────┤
│ Footer                                   │   │ [sticky Add bar]│
└──────────────────────────────────────────┘   └─────────────────┘
```

## 7. Motion plan

- **Hero (the one memorable interaction):** as you scroll, a thin oil-amber line draws down the still-life like a scalp part, then the photo parts along it—each half slides away—revealing the applicator placing oil on a real part. Scroll-linked, no scroll-jacking, CTA visible throughout.
- Supporting, quiet: two images with ±30px parallax; section headings fade up once (16px, 500ms, ease-out); add-to-cart button morphs to "Added"; drawer slides 240ms.
- `prefers-reduced-motion`: hero renders as a still (no split), parallax and fades are disabled, drawer uses opacity only.

## 8. Component inventory

Layout: `SiteHeader`, `MobileNav`, `SiteFooter`, `Container`, `Eyebrow`, `NeedsVerification`.
Commerce: `CartProvider`, `CartDrawer`, `CartLineItem`, `EmptyCart`, `QuantitySelector`, `AddToCartButton`, `StickyAddToCart`, `Price`, adapter (`mock` / `shopify`).
Home sections: `Hero` (PartReveal), `ProblemToRoutine`, `RitualSteps`, `ApplicatorDemo`, `IngredientStory`, `DesignedForRitual`, `ProofPlaceholders`, `FaqSection`, `FinalPurchase`.
PDP: `ProductGallery`, `ProductInfo`, `ProductDetailsAccordion`.
Motion utilities: `Reveal`, `Parallax` (both honour reduced motion).
