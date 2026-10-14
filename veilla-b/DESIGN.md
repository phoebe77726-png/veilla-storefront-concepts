# Veilla — Version B: "A Study in Control"

Version A was an editorial storefront. Version B drops the storefront grammar entirely: the site is an **exhibition of a single object**. Same facts, photos and copy rules (see Version A's DESIGN.md §0); everything else changes.

## 1. Customer and conversion goal
Same shopper (existing or curious pre-wash scalp oilers frustrated by droppers and slick fingertips). The bet: a premium, single-product brand converts on **conviction and memorability**, not on a familiar grid. Conversion stays one tap away everywhere through a persistent "ticket", so the exhibition format never costs a sale.

## 2. Visual concept
A walk through rooms in a quiet gallery. Each photograph hangs with a **wall label** (figure number, title, materials, dimensions). The scalp part becomes the gallery's sightline: a single oil-amber rule runs along the floor of the walk as a progress line. No cards, no feature grids, no star rows.

## 3. Color tokens
Same brand palette as A, used differently: walls are warm plaster, one room is deep green.

| Token | Hex | Role in B |
| --- | --- | --- |
| `ivory` | `#F5EFE4` | gallery walls (default) |
| `paper` | `#FBF8F2` | wall labels, drawers |
| `plaster` | `#E9D3BE` | feature walls |
| `sand` | `#D3C4AD` | hairlines, label borders |
| `ink` / `ink-soft` | `#1C1B17` / `#585148` | text |
| `botanical` / `botanical-deep` | `#1F3A2B` / `#132519` | the green room, primary action |
| `cocoa` / `cocoa-soft` | `#6E4E3D` / `#C6A690` | figure numbers, captions on dark |
| `oil` | `#C08A2C` | the sightline / progress rule only |

## 4. Typography
- **Display:** *Gloock*, a high-contrast serif with a slightly odd, sculptural character; set very large and tight.
- **Text / labels:** *Schibsted Grotesk*, a sturdy, slightly bookish sans for wall labels and UI.
- **Catalogue data:** *Geist Mono*, for figure numbers, SKU and dimensions only.

## 5. Spacing and layout
- Desktop homepage: a horizontal **walk** of rooms (each 60–130vw wide), pinned under the header and driven by normal vertical scroll (1px down = 1px sideways). After the walk, the page returns to vertical for the ritual, visitor's book, questions and "Take it home".
- Rooms use full-height photography with labels placed asymmetrically (bottom-left, top-right, overlapping the frame edge).
- Mobile, tablet and reduced motion: rooms stack vertically; no sideways scrolling ever.
- Gutter `clamp(1rem, 4vw, 3.5rem)`; radius 0 everywhere except the bag count.

## 6. Wireframes
```
DESKTOP — the walk (scrolling down moves sideways)
┌ VEILLA   01 Entrance · 02 · 03 · 04 · 05 ·             Index   Bag 0 ┐
│┌─ Entrance ─────────┬─ Note ──┬─ The Object ───────┬─ Gesture ──…   │
││ A study in         │ Droppers│ [flatlay]  [kit+box]│ [on part]     │
││ control.           │ drift.  │  Fig.02     Fig.03  │  1 2 3 4      │
││ [Add · $39.99]     │         │                    │               │
││          [still]   │         │                    │               │
│└────────────────────┴─────────┴────────────────────┴───────────────│
│━━━━━━━━━━━━━━━━━━ oil sightline (progress) ━━━━━━━━━━━━━━━━━━━━━━━━│
└──────────────────────────────────── [ticket: Kit · $39.99 · Add ] ┘
then vertical: ORDER OF THE RITUAL (Part. / Place. / Rest. as a typographic score)
              VISITOR'S BOOK (empty, ruled, labelled placeholders)
              VISITOR QUESTIONS · TAKE IT HOME (green room) · EXIT

MOBILE 375
┌ ☰ Index   VEILLA   Bag ┐
│ Room 01 / 08 Entrance   │ ← room counter
│ A study in control.     │
│ [Add to bag · $39.99]   │
│ [photo] Fig.01 label    │
│ … rooms stacked …       │
│[ticket bar: Kit · Add]  │
└─────────────────────────┘
```

## 7. Motion plan
- **Signature:** the gallery walk (pinned horizontal travel) with the oil sightline filling as you go.
- Supporting: wall labels fade in once; room rail updates; bag ticket slides in after the entrance.
- Reduced motion: no walk, no fades; rooms stack and everything is static.

## 8. Component inventory
`SiteHeader` (wordmark, `RoomRail`, Index, Bag) · `FloorPlan` (full-screen index nav) · `GalleryWalk` + `Room` · `WallLabel` · `Sightline` · `AcquireTicket` (persistent add-to-bag) · `RitualScore` · `VisitorsBook` · `VisitorQuestions` · `TakeItHome` · `ObjectRecord` (product page) · shared cart drawer, quantity selector, add-to-cart button, `NeedsVerification`.
