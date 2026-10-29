# Cyber Aliens Studio Design System: Kinetic Void

Imported directly from Stitch Project `Cyber Aliens Studio Website` (`projects/13418672454072631669`).

---

## Brand & Style

This design system establishes an avant-garde editorial presence tailored for a high-end design and technology studio. Merging the restrained discipline of Swiss modernism with speculative, cinematic futurism, the visual tone is poised, razor-sharp, and deliberate. It avoids decorative techno-kitsch in favor of stark contrast: ultra-refined typography, expansive spatial voids, and deep black monolith surfaces set against an organic warm cream ground.

The system communicates extreme creative precision and technological authority. The audience comprises visionary founders, enterprise design leaders, and boundary-pushing brands seeking transformational creative engineering.

Key aesthetic drivers:
- **Monolithic Inversions:** Massive shifts between luminous warm fields and impenetrable, obsidian black surfaces.
- **Cinematic Tension:** Generous negative space punctuated by visceral, razor-thin highlights in vivid red-coral.
- **Micro-Futurism:** Subtle typographic telemetry, crisp monospaced coordinates, and floating obsidian pills that evoke orbital interfaces without drifting into sci-fi caricature.

---

## Color Tokens & Palette

| Token Name | Hex Code | Role / Usage |
| :--- | :--- | :--- |
| `surface` | `#FAF9F5` | Base warm off-white canvas for the entire platform |
| `surface-dim` | `#DADAD6` | Dimmed surface contrast |
| `surface-bright` | `#FAF9F5` | Bright canvas element |
| `surface-container-lowest` | `#FFFFFF` | Pure white card surfaces, modals, popovers |
| `surface-container-low` | `#F4F4F0` | Subdued container wells, subtle data rows |
| `surface-container` | `#EEEEEA` | Secondary card containers, segmented controls |
| `surface-container-high` | `#E8E8E4` | Interactive hover wells, pill containers |
| `surface-container-highest` | `#E2E3DF` | Highest contrast neutral container tier |
| `on-surface` | `#1A1C1A` | Primary high-density near-black body and heading text |
| `on-surface-variant` | `#444748` | Secondary neutral gray typography, metadata, subheads |
| `inverse-surface` | `#2F312E` | Dark contrast elevated elements |
| `inverse-on-surface` | `#F1F1ED` | Inverse light text on dark surfaces |
| `outline` | `#747878` | Crisp structural borders and table lines |
| `outline-variant` | `#C4C7C7` | Muted hairline dividing strokes |
| `primary` | `#000000` | Deep obsidian black (sidebar, primary monoliths, dark cards) |
| `on-primary` | `#FFFFFF` | Optical white text for dark monoliths and primary buttons |
| `primary-container` | `#1C1B1B` | Secondary dark elevated surface |
| `on-primary-container` | `#858383` | Secondary text on dark surfaces |
| `secondary` | `#B90538` | Deep studio crimson / hot coral focal accent |
| `on-secondary` | `#FFFFFF` | White text on secondary buttons/badges |
| `secondary-container` | `#DC2C4F` | High-voltage kinetic red-coral accent |
| `on-secondary-container` | `#FFFBFF` | Pure white highlight text on secondary container |
| `tertiary` | `#000000` | Monolith telemetry backing |
| `tertiary-container` | `#1C1B1B` | Deep obsidian container / HUD backdrops |
| `error` | `#BA1A1A` | Critical alerts, geofence breaches, overdue blockers |
| `error-container` | `#FFDAD6` | Soft reddish error container background |
| `on-error-container` | `#93000A` | Text for critical alert labels |

---

## Typography

- **Headlines & Display:** `Syne` (Weight: 700, 800)
- **Body & Functional UI:** `Plus Jakarta Sans` (Weight: 400, 500, 600, 700)
- **Icons:** `Material Symbols Outlined`

### Typographic Scale
- `display-xl`: 112px / line-height: 104px / letter-spacing: -0.04em (Syne 800)
- `headline-lg`: 72px / line-height: 76px / letter-spacing: -0.035em (Syne 700)
- `headline-md`: 44px / line-height: 48px / letter-spacing: -0.03em (Syne 700)
- `headline-sm`: 24px / line-height: 32px / letter-spacing: -0.02em (Plus Jakarta Sans 700)
- `body-lg`: 18px / line-height: 28px / letter-spacing: -0.01em (Plus Jakarta Sans 400)
- `body-md`: 16px / line-height: 26px / letter-spacing: 0em (Plus Jakarta Sans 400)
- `body-sm`: 14px / line-height: 20px / letter-spacing: 0em (Plus Jakarta Sans 400)
- `label-md`: 13px / line-height: 16px / letter-spacing: 0.02em (Plus Jakarta Sans 600)
- `label-caps`: 11px / line-height: 14px / letter-spacing: 0.08em uppercase (Plus Jakarta Sans 700)

---

## Spatial Rhythm & Borders

- **Border Radii:**
  - `sm`: `0.5rem` (8px)
  - `DEFAULT`: `1rem` (16px)
  - `lg`: `2rem` (32px)
  - `xl`: `3rem` (48px)
  - `full`: `9999px` (Pill shapes)
- **Spacing Scale:**
  - `space-xs`: `0.25rem` (4px)
  - `space-sm`: `0.5rem` (8px)
  - `space-md`: `1rem` (16px)
  - `space-lg`: `1.5rem` (24px)
  - `space-xl`: `2.5rem` (40px)
  - `space-2xl`: `4rem` (64px)
  - `space-3xl`: `6rem` (96px)
  - `gutter`: `1.5rem` (24px)
  - `gutter-lg`: `2.5rem` (40px)

---

## Elevation & Depth

- **Ambient Subtle (`elevation-subtle`):** `0 12px 36px -8px rgba(17, 17, 17, 0.04), 0 4px 12px -2px rgba(17, 17, 17, 0.02)`
- **Monolith Prominent (`elevation-prominent`):** `0 24px 64px -12px rgba(0, 0, 0, 0.12), 0 8px 24px -4px rgba(0, 0, 0, 0.04)`
- **Frosted Translucency:** `rgba(10, 10, 10, 0.88)` with `backdrop-filter: blur(24px)` and `1px solid rgba(255, 255, 255, 0.12)`

