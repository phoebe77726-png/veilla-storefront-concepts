# Veilla storefront

A single-product storefront for the Veilla Pre-Wash Scalp Kit, built with Next.js 16 (App Router), TypeScript, Tailwind 4, shadcn/ui (Base UI), Motion and Lucide. Design rationale lives in [DESIGN.md](DESIGN.md).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## What works vs. what is mocked

| Area | Status |
| --- | --- |
| Home, product, FAQ, shipping & returns pages | Working, statically prerendered |
| Cart drawer, quantity, remove, empty state, add-to-cart feedback | Working against the **mock adapter** (stored in `localStorage`) |
| Mobile nav, mobile sticky add-to-cart | Working |
| Keyboard access, focus states, live announcements | Working |
| Reduced motion | Implemented (static hero, no parallax/fades); not yet tested with the OS setting turned on |
| Checkout | **Mocked**: hands off to `/checkout`, a preview page. No payment is taken |
| Shopify Storefront adapter | Written and typed, **not yet run against a real store** |
| Product price ($39.99) | Comes from the Veilla research plan. **Sample data** until confirmed |
| Reviews | **Placeholders**, clearly labelled. No reviews exist yet |
| Policies, ingredient list, directions | Marked **Needs verification** (25 tags; search `<NeedsVerification`) |

## Commerce architecture

```
src/lib/commerce/
  types.ts           Neutral Product / Cart models and the CatalogAdapter + CartAdapter interfaces
  catalog.ts         Sample product data
  mock-adapter.ts    Local cart (default)
  shopify-adapter.ts Storefront API (cartCreate, cartLinesAdd/Update/Remove, hosted checkoutUrl)
  index.ts           Picks the provider from NEXT_PUBLIC_COMMERCE_PROVIDER
```

UI components only import from `@/lib/commerce`, so switching providers needs no UI changes.

**Shopify:** set `NEXT_PUBLIC_COMMERCE_PROVIDER=shopify`, `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`, and create a product with handle `pre-wash-scalp-kit`.
**Stripe Checkout:** add a `stripe` branch in `index.ts` that keeps the mock-style local cart, and have `getCheckoutUrl()` POST to a route handler that creates a Checkout Session.

## Before launch

- Resolve every `NeedsVerification` tag (directions, resting time, INCI list, cleaning, leak testing, policies, support email).
- Replace review placeholders only with verified reviews.
- Copy rules: no growth, regrowth, hair-loss, DHT or clinical claims. "Mess-free" stays out until it has been tested.
- Product photos: `new website image 1.png` and `website image 2.png` print "38 ML" on the label and are not used.
