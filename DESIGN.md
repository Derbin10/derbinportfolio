# Design system — derbin■ (v3, "Electric")

Look references supplied by Derbin (sorted with the **reference-to-motion** skill: all three are *look* references):
1. **Folioblox portfolio** — light page, large rounded cards, dark hero card, "Trusted by" strip, curved project carousel,
   project list rows, "View →" pills with a round arrow badge, About hero with portrait.
2. **Techy social carousel** — deep navy → electric blue, pill labels, numbered blue tiles beside dark tiles, dotted grids, ring lines.
3. **"What we do?" post** — services as connected pills (filled / outline alternating) on a blue glow.

Structure and UX rules from **UI/UX Pro Max** (Portfolio/Personal: storytelling-driven, motion-driven, avoid generic templates;
44px touch targets, 4.5:1 contrast, visible labels, reduced-motion support). Motion recipes from **motion-effects**.

## Colour (CSS variables; `.dark` flips any panel)
| Token | Light page | Dark panel | Use |
|---|---|---|---|
| `bg` | #F3F5FF | #050A1F | Ground |
| `surface` / `surface-2` | #FFFFFF / #E6EAFF | #0C1433 / #131D45 | Cards, chips |
| `fg` | #0A0F2C | #F5F7FF | Headlines |
| `fg-2` | #2C3561 | #C9D1F2 | Body |
| `muted` | #5A6390 (5.3:1) | #8E98C4 (6.5:1) | Meta |
| `accent` | #2F54FF | #2F54FF | Buttons, tiles, the square full stop (white on it 5.8:1) |
| `accent-text` | #2F54FF | #9DB1FF | Accent as text |

Signature: the **electric glow** rising from the bottom of dark panels (`glow`), plus `dots` and thin ring lines.

## Type
Inter Tight (display, 600) + Inter (text) — the closest open-licence match to Apple's SF Pro, which may only be used on
Apple platforms. Tight tracking on headlines (-0.035 to -0.045em), one word in electric blue.

## Shape
Panels inset from the viewport edge with 22–40px radius (`panel`); cards 28px (`rounded-card`); everything clickable is a pill ≥44px tall.

## Motion
| Where | Recipe / pattern |
|---|---|
| Hero name | motion-effects 09 *Masked type* — every project drifts inside the letters of DERBIN |
| Headlines | masked line rise (in-view check on the unclipped wrapper) |
| Project images | 12 *Image reveal* — staggered shutter slats |
| "Curious what else I've created?" | curved 3D carousel; drifts, pauses on hover, drag to scrub |
| Services | 15 *Flowing paths* — a pulse travels the pill snake and each pill rings as it arrives |
| Work list | cover preview springs after the cursor |
| Toolkit | 08 *Magnetic dock* |
| Cursor | precise dot + spring ring; grows on links, becomes **View** on work and **Drag** on the gallery; off for touch, reduced motion and text fields |
