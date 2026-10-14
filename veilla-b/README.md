# Veilla — Version B: "A Study in Control"

An alternative to Version A (`../veilla`). Same product facts, photos, copy rules and commerce layer; a completely different experience: the site is an exhibition of one object. See [DESIGN.md](DESIGN.md).

```bash
npm install
npm run dev -- -p 3200
```

## What's different from Version A
- Homepage is a **gallery walk**: on desktop with a mouse/trackpad, scrolling down moves sideways through five rooms (Entrance, Curator's note, The object, The gesture, Materials). Mobile, tablet and reduced-motion users get the same rooms stacked vertically.
- Every photo hangs with a **wall label** (figure number, title, facts).
- Navigation is a **room rail** (desktop header) / **room counter** (mobile) plus a full-screen **floor plan** menu.
- Buying: a persistent **ticket** (bottom-right on desktop, bottom bar on mobile) that steps aside when another buy button is on screen.
- Reviews: an empty **Visitor's book**, clearly marked as placeholders.
- Product page: an **Object record** (catalogue-style data table; SKU VEI-OIL-30 matches your live Shopify product).

## Functional vs. mocked
Same as Version A: cart, quantity, drawer, empty state and all navigation work; checkout is simulated (`/checkout`); the Shopify adapter is written but not connected; items tagged *Needs verification* still need confirming.
