# Prototype Wireframe Style Guide
### v1.3 — 2026-03-02

This document defines the shared visual language for wireframe prototypes. It uses a greyscale-first approach inspired by Balsamiq, with sparse colour accents for primary actions, errors, and warnings. All tokens use **semantic component classes** (e.g. `.btn-primary`, `.card-standard`). In HTML you use the semantic class name — never raw Tailwind. All colours and the brand font are defined as **CSS custom properties** (`:root` variables). To rebrand, you change the `:root` variables block — all component classes and the HTML stay untouched.

---

## CDN Boilerplate

Add this to the `<head>` of any prototype HTML file:

```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Balsamiq Sans Font (swap this CDN link when re-branding) -->
<!-- Redacted Script Font (wireframe placeholder squiggles) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@400;700&family=Redacted+Script:wght@300;400;700&display=swap" rel="stylesheet">

<!-- Remix Icons -->
<link href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css" rel="stylesheet">

<!-- Chart.js (for prototypes with charts) -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- Apply brand font globally via Tailwind config -->
<script>
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['var(--brand-font)', 'cursive'],
        }
      }
    }
  }
</script>
```

---

## Brand Variables

All colours and the brand font are defined as CSS custom properties in a single `:root` block. Variables are named by **role** (e.g. `--surface-card`, `--text-heading`, `--control-border`) — never by colour. Every semantic component class references these variables. To re-brand, change this block (see [How to Re-brand](#how-to-re-brand) below).

```css
:root {
  /* ── Brand Accent Colours ── */
  --brand-primary:       #047857;  /* emerald-700 — primary actions, positive status */
  --brand-primary-hover: #065F46;  /* emerald-800 — primary button hover */
  --brand-danger:        #9F1239;  /* rose-800 — negative/error actions */
  --brand-danger-hover:  #881337;  /* rose-900 — danger button hover */
  --brand-warning:       #F97316;  /* orange-500 — warning status only */

  /* ── Text on Accent Backgrounds ── */
  --brand-on-primary:    #FFFFFF;
  --brand-on-danger:     #FFFFFF;

  /* ── Subtle Accent Backgrounds (validation) ── */
  --brand-primary-subtle: #ECFDF5;  /* emerald-50 */
  --brand-danger-subtle:  #FFF1F2;  /* rose-50 */

  /* ── Surfaces (backgrounds) ── */
  --surface-page:            #FAFAF9;  /* full page background */
  --surface-card:            #FFFFFF;  /* cards, modals, navbar, content body, form inputs, panels */
  --surface-card-alt:        #FAFAF9;  /* light card bg, table striped rows */
  --surface-inset:           #F5F5F4;  /* footer areas, disabled bg, subtle hover bg */
  --surface-sidebar:         #27272A;  /* left sidebar background */
  --surface-footer:          #27272A;  /* page footer background */
  --surface-section-header:  #3F3F46;  /* content-section header bar */
  --surface-table-header:    #52525B;  /* report table column header */
  --surface-overlay:         rgba(24, 24, 27, 0.5);  /* modal backdrop */
  --surface-overlay-light:   rgba(24, 24, 27, 0.3);  /* panel backdrop */

  /* ── Borders ── */
  --border-light:            #E7E5E4;  /* card edges, dividers, panel/navbar borders */
  --border-default:          #D1D5DB;  /* input borders, button borders, modal dividers */
  --border-strong:           #3F3F46;  /* sidebar internal borders */
  --border-section:          #27272A;  /* section divider (thick rule) */

  /* ── Text ── */
  --text-title:              #27272A;  /* page titles, modal titles, navbar brand */
  --text-heading:            #3F3F46;  /* section headings, emphasis, form labels */
  --text-body:               #52525B;  /* body copy, links, table cells */
  --text-caption:            #71717A;  /* captions, helper text, secondary labels */
  --text-placeholder:        #9CA3AF;  /* placeholders, disabled text, muted text */
  --text-on-dark:            #FFFFFF;  /* text on dark surfaces (sidebar, footer, headers) */
  --text-on-dark-muted:      #D1D5DB;  /* sidebar nav items (unselected) */
  --text-on-dark-faint:      #71717A;  /* sidebar section labels */
  --text-max-contrast:       #18181B;  /* link hover, maximum emphasis */

  /* ── Interactive / Controls ── */
  --control-bg:              #E7E5E4;  /* secondary, next, previous button bg */
  --control-bg-hover:        #D1D5DB;  /* secondary, next, previous button hover */
  --control-bg-strong:       #D1D5DB;  /* cancel button bg */
  --control-bg-strong-hover: #9CA3AF;  /* cancel button hover */
  --control-border:          #D1D5DB;  /* form input & button borders */
  --control-border-strong:   #9CA3AF;  /* cancel button border */
  --control-focus-border:    #71717A;  /* input focus border */
  --control-focus-ring:      #D1D5DB;  /* input focus ring / shadow */
  --control-accent:          #52525B;  /* checkbox, radio, toggle fill */
  --control-icon-muted:      #9CA3AF;  /* close buttons, sidebar toggle (rest) */
  --control-icon-muted-hover:#3F3F46;  /* close button hover */

  /* ── Status (non-accent) ── */
  --status-neutral:          #D1D5DB;  /* neutral status dot, inactive step bg, connectors */
  --status-inactive-text:    #71717A;  /* inactive step number text */

  /* ── Chart Data Series ── */
  --chart-series-1:          #3F3F46;  /* primary/first data series */
  --chart-series-2:          #71717A;  /* second data series */
  --chart-series-3:          #D1D5DB;  /* third data series */
  --chart-series-4:          #E7E5E4;  /* fourth data series */
  --chart-axis-label:        #71717A;  /* axis labels, legend text */
  --chart-gridline:          #E7E5E4;  /* gridlines */
  --chart-segment-border:    #FFFFFF;  /* pie/doughnut segment borders */

  /* ── Table-specific ── */
  --table-sort-icon:         #D1D5DB;  /* sort arrow icons (inactive) */

  /* ── Brand Font ── */
  --brand-font: "Balsamiq Sans";
}
```

### Variable Naming Convention

| Prefix | Purpose |
| --- | --- |
| `--brand-*` | Accent colours that carry meaning (primary, danger, warning) |
| `--surface-*` | Background colours for pages, cards, sidebars, footers, overlays |
| `--border-*` | Border and divider colours at different emphasis levels |
| `--text-*` | Text colours by role (title, body, caption, on-dark, etc.) |
| `--control-*` | Interactive element colours (button bg, focus ring, checkbox accent) |
| `--status-*` | Non-accent status indicators (neutral dot, inactive step) |
| `--chart-*` | Data visualisation colours (series 1–4, gridlines, axis labels) |
| `--table-*` | Table-specific colours (sort icons) |

### How Semantic Classes Use Variables

Component classes use a **hybrid approach**:
- **Tailwind \****`@apply`** for layout, spacing, sizing, and border-radius (these don't change per brand)
- **Raw CSS properties** for colours and fonts (these reference semantic `var(--surface-*)`, `var(--text-*)`, `var(--control-*)`, `var(--brand-*)`, etc.)

Example:
```css
.btn-primary {
  @apply font-bold px-6 py-2.5 rounded-lg shadow-sm transition-colors duration-150 cursor-pointer border-none;
  background-color: var(--brand-primary);
  color: var(--brand-on-primary);
}
.btn-primary:hover {
  background-color: var(--brand-primary-hover);
}
```

---

## Colour Palette

> **Note:** All colours are defined as CSS custom properties in the `:root` block (see [Brand Variables](#brand-variables) above). Variables are named by **role**, not by colour. The "Default Hex" column shows the wireframe prototype's value — a re-branded app would have different values here.

### Surface Tokens (backgrounds)

| CSS Variable | Default Hex | Role |
| --- | --- | --- |
| `--surface-page` | #FAFAF9 | Full page background |
| `--surface-card` | #FFFFFF | Cards, modals, navbar, content body, form inputs, panels |
| `--surface-card-alt` | #FAFAF9 | Light card bg, table striped rows |
| `--surface-inset` | #F5F5F4 | Footer areas, disabled bg, subtle hover |
| `--surface-sidebar` | #27272A | Left sidebar background |
| `--surface-footer` | #27272A | Page footer background |
| `--surface-section-header` | #3F3F46 | Content-section header bar |
| `--surface-table-header` | #52525B | Report table column header |
| `--surface-overlay` | rgba(24,24,27,0.5) | Modal backdrop |
| `--surface-overlay-light` | rgba(24,24,27,0.3) | Panel backdrop |

### Border Tokens

| CSS Variable | Default Hex | Role |
| --- | --- | --- |
| `--border-light` | #E7E5E4 | Card edges, dividers, panel/navbar borders |
| `--border-default` | #D1D5DB | Input borders, button borders, modal dividers |
| `--border-strong` | #3F3F46 | Sidebar internal borders |
| `--border-section` | #27272A | Section divider (thick rule) |

### Text Tokens

Collapsible navigation sidebar for multi-screen applications. Sits on the left edge of the screen. Two states: **expanded** (icons + labels) and **collapsed** (icons only, narrower).
| CSS Variable | Default Hex | Role |
| --- | --- | --- |
| `--text-title` | #27272A | Page titles, modal titles, navbar brand |
| `--text-heading` | #3F3F46 | Section headings, emphasis, form labels |
| `--text-body` | #52525B | Body copy, links, table cells |
| `--text-caption` | #71717A | Captions, helper text, secondary labels |
| `--text-placeholder` | #9CA3AF | Placeholders, disabled text, muted text |
| `--text-on-dark` | #FFFFFF | Text on dark surfaces (sidebar, footer, headers) |
| `--text-on-dark-muted` | #D1D5DB | Sidebar nav items (unselected) |
| `--text-on-dark-faint` | #71717A | Sidebar section labels |
| `--text-max-contrast` | #18181B | Link hover, maximum emphasis |

### Control Tokens (interactive elements)

| CSS Variable | Default Hex | Role |
| --- | --- | --- |
| `--control-bg` | #E7E5E4 | Secondary, next, previous button bg |
| `--control-bg-hover` | #D1D5DB | Secondary, next, previous button hover |
| `--control-bg-strong` | #D1D5DB | Cancel button bg |
| `--control-bg-strong-hover` | #9CA3AF | Cancel button hover |
| `--control-border` | #D1D5DB | Form input & button borders |
| `--control-border-strong` | #9CA3AF | Cancel button border |
| `--control-focus-border` | #71717A | Input focus border |
| `--control-focus-ring` | #D1D5DB | Input focus ring / shadow |
| `--control-accent` | #52525B | Checkbox, radio, toggle fill |
| `--control-icon-muted` | #9CA3AF | Close buttons, sidebar toggle (rest) |
| `--control-icon-muted-hover` | #3F3F46 | Close button hover |

### Status Tokens (non-accent)

| CSS Variable | Default Hex | Role |
| --- | --- | --- |
| `--status-neutral` | #D1D5DB | Neutral status dot, inactive step bg, connectors |
| `--status-inactive-text` | #71717A | Inactive step number text |

### Chart Tokens (data visualisation)

| CSS Variable | Default Hex | Role |
| --- | --- | --- |
| `--chart-series-1` | #3F3F46 | Primary/first data series |
| `--chart-series-2` | #71717A | Second data series |
| `--chart-series-3` | #D1D5DB | Third data series |
| `--chart-series-4` | #E7E5E4 | Fourth data series |
| `--chart-axis-label` | #71717A | Axis labels, legend text |
| `--chart-gridline` | #E7E5E4 | Gridlines |
| `--chart-segment-border` | #FFFFFF | Pie/doughnut segment borders |

### Table Tokens

| CSS Variable | Default Hex | Role |
| --- | --- | --- |
| `--table-sort-icon` | #D1D5DB | Sort arrow icons (inactive) |

### Accent Tokens (sparse use only)

These colours carry **meaning** and should only appear for their designated purpose. Never use them decoratively.

| CSS Variable | Default Hex | Role |
| --- | --- | --- |
| `--brand-primary` | #047857 | Primary actions, positive status |
| `--brand-danger` | #9F1239 | Negative/error actions, negative status |
| `--brand-warning` | #F97316 | Warning status lights only |

Supporting shades for hover/focus states:

| CSS Variable | Default Hex | Role |
| --- | --- | --- |
| `--brand-primary-hover` | #065F46 | Primary button hover |
| `--brand-danger-hover` | #881337 | Danger button hover |
| `--brand-primary-subtle` | #ECFDF5 | Subtle positive background (validation) |
| `--brand-danger-subtle` | #FFF1F2 | Subtle negative background (validation) |

---

## Typography

All text uses the brand font (default: **Balsamiq Sans** via Google Fonts). This gives the wireframe its hand-drawn, lo-fi aesthetic.

| Class Name | Size | Weight | Colour Variable | Notes |
| --- | --- | --- | --- | --- |
| `type-title` | `text-2xl` | `font-bold` | `--text-title` | Main page titles |
| `type-modal-title` | `text-xl` | `font-bold` | `--text-title` | Modal/dialog headings |
| `type-heading` | `text-lg` | `font-bold` | `--text-heading` | Section headings |
| `type-body` | `text-base` | `font-normal` | `--text-body` | General body text |
| `type-body-emphasis` | `text-base` | `font-bold` | `--text-heading` | Emphasized body text |
| `type-caption` | `text-sm` | `font-normal` | `--text-caption` | Labels, helper text |
| `type-muted` | `text-sm` | `font-normal` | `--text-placeholder` | Disabled/inactive text |

### Wireframe Placeholder Text (Squiggles)

For rapid prototyping, use **Redacted Script** (Google Fonts) to render text as hand-drawn squiggly lines — exactly like Balsamiq or hand-drawn wireframes. The text you type controls the *amount* of squiggle: more words = more squiggle. No need to craft real copy during early wireframing.

Add the `wire-` prefix to any type class to switch it from readable text to squiggles:

| Class Name | Matches | Notes |
| --- | --- | --- |
| `wire-title` | `type-title` | Squiggle at title size |
| `wire-modal-title` | `type-modal-title` | Squiggle at modal title size |
| `wire-heading` | `type-heading` | Squiggle at heading size |
| `wire-body` | `type-body` | Squiggle at body size |
| `wire-body-emphasis` | `type-body-emphasis` | Squiggle at bold body size |
| `wire-caption` | `type-caption` | Squiggle at caption size |
| `wire-muted` | `type-muted` | Squiggle at muted size |

**Usage:** Type any words — they render as squiggles. Swap `wire-` for `type-` when you're ready to add real copy.

```html
<!-- Early wireframe — squiggles -->
<h2 class="wire-title">Some title placeholder text here</h2>
<p class="wire-body">A paragraph of description text that shows the approximate amount of content expected in this area of the screen.</p>

<!-- Later — swap to real text -->
<h2 class="type-title">Account Settings</h2>
<p class="type-body">Manage your profile, security preferences, and notification settings.</p>
```

---

## Buttons


### Primary Button — `.btn-primary`
Main call-to-action. The only button with brand colour. Always includes a leading check icon.

| Property | Value |
| --- | --- |
| Background | `--brand-primary` → hover: `--brand-primary-hover` |
| Text | `--brand-on-primary` |
| Border | none |
| Layout | `font-bold px-6 py-2.5 rounded-lg shadow-sm` |

Icon + label pattern: `<i class="ri-check-line"></i> Action Label`

### Secondary Button — `.btn-secondary`
Alternative or less prominent action.

| Property | Value |
| --- | --- |
| Background | `--control-bg` → hover: `--control-bg-hover` |
| Text | `--text-heading` |
| Border | `--control-border` |
| Layout | `font-bold px-6 py-2.5 rounded-lg shadow-sm` |

### Danger Button — `.btn-danger`
Destructive or negative action. Used sparingly.

| Property | Value |
| --- | --- |
| Background | `--brand-danger` → hover: `--brand-danger-hover` |
| Text | `--brand-on-danger` |
| Border | none |
| Layout | `font-bold px-6 py-2.5 rounded-lg shadow-sm` |

### Ghost Button — `.btn-ghost`
Minimal emphasis, transparent background. Always has a border so it's visible on card backgrounds.

| Property | Value |
| --- | --- |
| Background | transparent → hover: `--surface-inset` |
| Text | `--text-body` |
| Border | `--control-border` |
| Layout | `font-bold px-6 py-2.5 rounded-lg` |

### Cancel Button — `.btn-cancel`
Dismisses a dialog or backs out of a flow. Always paired with a primary action. Uses `ri-arrow-go-back-line` icon.

| Property | Value |
| --- | --- |
| Background | `--control-bg-strong` → hover: `--control-bg-strong-hover` |
| Text | `--text-heading` |
| Border | `--control-border-strong` |
| Layout | `font-bold px-6 py-2.5 rounded-lg` |

Icon + label pattern: `<i class="ri-arrow-go-back-line"></i> Cancel`

### Next Button — `.btn-next`
Advances to the next step in a multi-step flow. Secondary style with a trailing arrow-right icon. Always sits to the right of Previous.

| Property | Value |
| --- | --- |
| Background | `--control-bg` → hover: `--control-bg-hover` |
| Text | `--text-heading` |
| Border | `--control-border` |
| Layout | `font-bold px-6 py-2.5 rounded-lg shadow-sm` |

Icon + label pattern: `Next <i class="ri-arrow-right-line"></i>`

### Previous Button — `.btn-previous`
Returns to the prior step in a multi-step flow. Secondary style with a leading arrow-left icon. Same styling as Next.

Icon + label pattern: `<i class="ri-arrow-left-line"></i> Previous`

### Disabled Button — `.btn-disabled`
Inactive state for any button.

| Property | Value |
| --- | --- |
| Background | `--surface-inset` |
| Text | `--text-placeholder` |
| Border | `--border-light` |
| Layout | `cursor-not-allowed px-6 py-2.5 rounded-lg` |

---

## Text Links — `.text-link`

Inline clickable text. Uses underline for universal affordance. Uses body text colour — not blue.

| Property | Value |
| --- | --- |
| Colour | `--text-body` → hover: `--text-max-contrast` |
| Layout | `underline underline-offset-2` |

Usage: `<a href="#" class="text-link">link text</a>`

---

## Form Elements

### Text Input (default) — `.form-input`

| Property | Value |
| --- | --- |
| Background | `--surface-card` |
| Text | `--text-heading` |
| Placeholder | `--text-placeholder` |
| Border | `--control-border` |
| Focus border | `--control-focus-border` |
| Focus ring | `--control-focus-ring` |
| Layout | `w-full rounded-lg px-3 py-2` |

### Text Input (error state) — `.form-input-error`
Overrides border to `--brand-danger`. Pair with error message (`.form-error`).

### Text Input (success state) — `.form-input-success`
Overrides border to `--brand-primary`.

### Text Input (disabled) — `.form-input-disabled`

| Property | Value |
| --- | --- |
| Background | `--surface-inset` |
| Text | `--text-placeholder` |
| Border | `--border-light` |

### Label — `.form-label`
`text-sm font-bold mb-1 block` — colour: `--text-heading`

### Helper Text — `.form-helper`
`text-sm mt-1` — colour: `--text-caption`

Error message: `.form-error` — `text-sm mt-1` colour: `--brand-danger`
Success message: `.form-success` — `text-sm mt-1` colour: `--brand-primary`

### Select Dropdown — `.form-select`
Same styling as text input, with `appearance-none` and a chevron icon.

### Textarea — `.form-textarea`
Same styling as text input, with `resize-y min-h-[80px]`.

### Checkbox — `.form-checkbox`
`w-4 h-4 rounded` — border: `--control-border`, accent: `--control-accent`

Label inline: `.form-check-label` — `text-base ml-2` colour: `--text-body`

### Radio Button — `.form-radio`
`w-4 h-4` — border: `--control-border`, accent: `--control-accent`

### Toggle Switch
Use a styled checkbox with peer classes. Active state: `--control-accent`, inactive: `--status-neutral`.

### Star Rating — `.star-rating`

A 1–5 star rating input for feedback forms and surveys. Greyscale only — no coloured stars.

| Property | Value |
| --- | --- |
| Filled star icon | `ri-star-fill` |
| Empty star icon | `ri-star-line` |
| Filled colour | `--control-accent` — Zinc-600 (#52525B) |
| Empty colour | `--status-neutral` — Gray-300 (#D1D5DB) |
| Hover colour | `--control-icon-muted-hover` — Zinc-700 (#3F3F46) |
| Size | `text-xl` |
| Layout | `inline-flex gap-1 cursor-pointer` |

Behaviour:
- Stars fill from left to right up to the selected value
- On hover, stars preview the would-be selection (using hover colour)
- Clicking a star sets the rating value (1–5)
- Clicking the same star again deselects it (resets to 0)

All colours reference existing CSS variables — no new variables needed.

```html
<div class="star-rating" data-value="0">
  <i class="ri-star-line"></i>
  <i class="ri-star-line"></i>
  <i class="ri-star-line"></i>
  <i class="ri-star-line"></i>
  <i class="ri-star-line"></i>
</div>
```

Pair with a label: `<label class="form-label">How useful is this feature?</label>` above the rating.

---

## Status Lights

Small coloured dots to indicate state. Use inline with text or in tables/lists. Base class: `.status-dot`

| State | Semantic Class | Colour Variable | Icon alternative |
| --- | --- | --- | --- |
| Positive | `.status-positive` | `--brand-primary` | `ri-checkbox-circle-fill` |
| Negative | `.status-negative` | `--brand-danger` | `ri-close-circle-fill` |
| Warning | `.status-warning` | `--brand-warning` | `ri-alert-fill` |
| Neutral | `.status-neutral` | `--status-neutral` | `ri-checkbox-blank-circle-fill` |

Usage: `<span class="status-dot status-positive"></span>`

### Inline Status — icon + text (user supplies only the copy)

These classes bundle icon, colour, and sizing. You just write the text — the icon appears automatically.

| State | Semantic Class | Icon (auto) | Colour Variable |
| --- | --- | --- | --- |
| Positive | `.inline-positive` | `ri-checkbox-circle-fill` | `--brand-primary` |
| Negative | `.inline-negative` | `ri-close-circle-fill` | `--brand-danger` |
| Warning | `.inline-warning` | `ri-alert-fill` | `--brand-warning` |

Usage: `<span class="inline-positive">Verified</span>` — renders as the tick icon followed by "Verified".

---

## Cards & Containers

### Card Standard — `.card-standard`
Standard content container.

| Property | Value |
| --- | --- |
| Background | `--surface-card` |
| Border | `--border-light` |
| Layout | `rounded-xl shadow-sm p-4` |

### Card Light — `.card-light`
Lightweight container, minimal elevation.

| Property | Value |
| --- | --- |
| Background | `--surface-card-alt` |
| Border | `--border-light` |
| Layout | `rounded-lg px-6 py-3` |

### Card Prominent (Dialogs & Modals) — `.card-prominent`
High-emphasis container for modals and overlays. Width is `max-w-lg`.

| Property | Value |
| --- | --- |
| Background | `--surface-card` |
| Border | `--border-light` |
| Layout | `rounded-xl shadow-lg w-full max-w-lg mx-4 text-left` |

Modal overlay backdrop — `.modal-overlay`: background `--surface-overlay`, layout `fixed inset-0 flex items-center justify-center`

Modal internal structure (all semantic classes):
- **Header** — `.modal-header` (`px-6 py-3`): heading only above the divider.
- **Divider** — `.modal-divider`: `<hr class="modal-divider">`
- **Body** — `.modal-body` (`px-6 py-4`): body text, content area, then button row.
- **Button row** — `.modal-actions` (`flex justify-end gap-3`): buttons right-aligned. For split layout (Cancel left, Next/Previous right): `.modal-actions-split` (`flex justify-between gap-3`).
- Primary button always sits rightmost.

---

## Modal Patterns

Four named modal patterns. Each uses the same structural classes above — only the interior content differs. Copy the relevant skeleton into your prototype and fill in the content.

### 1. Confirmation Modal

Use for: success messages, simple confirmations that need a single acknowledgement action.

```html
<div id="modal-confirm" class="hidden modal-overlay">
  <div class="card-prominent">
    <div class="modal-header">
      <h3 class="type-modal-title">Modal Title</h3>
    </div>
    <hr class="modal-divider">
    <div class="modal-body">
      <p class="type-body mb-5">Body message goes here.</p>
      <div class="modal-actions">
        <button class="btn-primary">
          <span class="flex items-center gap-2"><i class="ri-check-line"></i> Continue</span>
        </button>
      </div>
    </div>
  </div>
</div>
```

For a two-button confirmation (e.g. "Are you sure?"): use `.modal-actions-split` with `.btn-cancel` left and `.btn-primary` right.

---

### 2. Error Modal

Use for: failure messages, system errors, anything that requires the user to acknowledge a problem before continuing. Uses `btn-danger` for the action button.

```html
<div id="modal-error" class="hidden modal-overlay">
  <div class="card-prominent">
    <div class="modal-header">
      <h3 class="type-modal-title">Something went wrong</h3>
    </div>
    <hr class="modal-divider">
    <div class="modal-body">
      <p class="type-body mb-5">Describe what failed and what the user should do next.</p>
      <div class="modal-actions">
        <button class="btn-danger">
          <span class="flex items-center gap-2"><i class="ri-close-line"></i> Ok</span>
        </button>
      </div>
    </div>
  </div>
</div>
```

For a destructive confirmation (e.g. "Delete this item?"): use `.modal-actions-split` with `.btn-cancel` left and `.btn-danger` right.


---

### 3. Procedural Modal (Step-by-Step)

Use for: multi-step setup wizards, onboarding flows, guided tasks.

```html
<div id="modal-procedural" class="hidden modal-overlay">
  <div class="card-prominent">
    <div class="modal-header">
      <h3 class="type-modal-title">Flow Title</h3>
    </div>
    <hr class="modal-divider">
    <div class="modal-body">
      <!-- Step indicators — first element below the divider -->
      <div class="flex items-center gap-2 mb-4">
        <span class="step-active">1</span>
        <div class="step-connector"></div>
        <span class="step-inactive">2</span>
        <div class="step-connector"></div>
        <span class="step-inactive">3</span>
        <span class="type-caption ml-2">Step 1 of 3</span>
      </div>
      <!-- Step content -->
      <p class="type-body mb-4">Step description goes here.</p>
      <div class="card-light mb-5 type-caption">Step content area.</div>
      <!-- Navigation: Cancel far left | Previous + Next/Finish far right -->
      <div class="modal-actions-split">
        <button class="btn-cancel">
          <span class="flex items-center gap-2"><i class="ri-arrow-go-back-line"></i> Cancel</span>
        </button>
        <div class="flex gap-2">
          <button class="btn-previous" disabled>
            <span class="flex items-center gap-1"><i class="ri-arrow-left-line"></i> Previous</span>
          </button>
          <button class="btn-next">
            <span class="flex items-center gap-2">Next <i class="ri-arrow-right-line"></i></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```


---

### 4. Verbose Decision Modal

Use for: choosing between 2–3 options that each need explanation before the user decides.

```html
<div id="modal-decision" class="hidden modal-overlay">
  <div class="card-prominent">
    <div class="modal-header">
      <h3 class="type-modal-title">How would you like to proceed?</h3>
    </div>
    <hr class="modal-divider">
    <div class="modal-body">
      <h4 class="type-heading mb-2">Subheading</h4>
      <p class="type-body mb-5">Explanatory paragraph giving context before the user chooses.</p>
      <!-- For 2 options use grid-cols-2; for 3 options use grid-cols-3 -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <label class="flex items-start gap-3 cursor-pointer">
          <input type="radio" name="decision-option" value="a" checked class="form-radio mt-1 shrink-0">
          <div>
            <span class="form-check-label font-bold block mb-1">Option A</span>
            <p class="type-caption">Description of this option and when to use it.</p>
          </div>
        </label>
        <label class="flex items-start gap-3 cursor-pointer">
          <input type="radio" name="decision-option" value="b" class="form-radio mt-1 shrink-0">
          <div>
            <span class="form-check-label font-bold block mb-1">Option B</span>
            <p class="type-caption">Description of this option and when to use it.</p>
          </div>
        </label>
      </div>
      <div class="modal-actions-split">
        <button class="btn-cancel">
          <span class="flex items-center gap-2"><i class="ri-arrow-go-back-line"></i> Cancel</span>
        </button>
        <button class="btn-primary">
          <span class="flex items-center gap-2"><i class="ri-check-line"></i> Continue</span>
        </button>
      </div>
    </div>
  </div>
</div>
```

---

## Icons (Remix Icons)

Use [Remix Icons](https://remixicon.com/) via CDN. Each icon has `-line` (outlined) and `-fill` (solid) variants. Prefer `-line` for wireframes; use `-fill` for active/selected states.

### Recommended Prototype Icons

| Purpose | Icon Class | Preview |
| --- | --- | --- |
| Home | `ri-home-line` | Home |
| Search | `ri-search-line` | Search |
| User/Profile | `ri-user-line` | User |
| Settings | `ri-settings-3-line` | Gear |
| Menu | `ri-menu-line` | Hamburger |
| Close | `ri-close-line` | X |
| Add/Create | `ri-add-line` | Plus |
| Edit | `ri-pencil-line` | Pencil |
| Delete/Trash | `ri-delete-bin-line` | Trash |
| Check/Success | `ri-check-line` | Check |
| Warning | `ri-alert-line` | Alert |
| Info | `ri-information-line` | Info |
| Error | `ri-error-warning-line` | Error |
| Arrow Right | `ri-arrow-right-line` | Arrow |
| Arrow Left | `ri-arrow-left-line` | Arrow |
| Chevron Down | `ri-arrow-down-s-line` | Chevron |
| Notification | `ri-notification-line` | Bell |
| Calendar | `ri-calendar-line` | Calendar |
| Download | `ri-download-line` | Download |
| Upload | `ri-upload-line` | Upload |

### Icon Sizing

| Size | Class | Usage |
| --- | --- | --- |
| Small | `text-base` | Inline with body text |
| Medium | `text-xl` | Buttons, list items |
| Large | `text-3xl` | Feature icons, empty states |
| XLarge | `text-5xl` | Hero icons, modal status |

Icon colour follows the same rules as text — grey by default, accent colours only for status meaning.

---

## Spacing

| Token | Value | Usage |
| --- | --- | --- |
| `spacing-page` | `p-4` | Page-level padding |
| `spacing-section` | `gap-6` | Gap between major sections |
| `spacing-items` | `gap-3` | Gap between related items (e.g. buttons) |
| `spacing-internal` | `p-4` | Internal padding for containers |

---

## Transitions & Animations

| Token | Duration | Easing | Usage |
| --- | --- | --- | --- |
| `transition-fast` | 150ms | `ease-in-out` | Hover states, colour changes |
| `transition-standard` | 200ms | `ease-out` | Element appear/disappear |

Keep transitions minimal for a wireframe feel. Avoid elaborate animations.

---

## Responsive Behaviour

- Minimum supported width: 320px
- On narrow screens: stack sections vertically
- Button touch targets: minimum 44px height
- Content scales proportionally on smaller screens

---

## Nav Bar — `.navbar`

Top navigation bar with brand, links, and optional action button.

| Property | Value |
| --- | --- |
| Background | `--surface-card` |
| Border | bottom `--border-light` |
| Layout | `px-8 py-3 flex items-center justify-between shadow-sm` |

| Element | Semantic Class | Colour Variable |
| --- | --- | --- |
| Brand text | `.navbar-brand` | `--text-title` (`font-bold text-lg`) |
| Nav link | `.navbar-link` | `--text-body` → hover: `--text-max-contrast` |

---

## Footer — `.footer`

Page footer with copyright and links.

| Property | Value |
| --- | --- |
| Background | `--surface-footer` |
| Text | `--text-placeholder` |
| Layout | `px-8 py-6 flex items-center justify-between text-sm` |

Footer links: `.footer-link` — hover: `--text-on-dark`

---

## Step Indicators

Used in procedural modals for multi-step flows.

| Element | Semantic Class | Background | Text | Layout |
| --- | --- | --- | --- | --- |
| Active | `.step-active` | `--brand-primary` | `--brand-on-primary` | `w-7 h-7 rounded-full text-sm font-bold` |
| Inactive | `.step-inactive` | `--status-neutral` | `--status-inactive-text` | `w-7 h-7 rounded-full text-sm font-bold` |
| Connector | `.step-connector` | `--status-neutral` | — | `w-8 h-0.5` |
---

## Tables

### Small Table — `.table-simple`

A compact, minimal table for inline data display. No frills — just clean rows of data.

| Element | Semantic Class | Colour / Border Variables | Layout |
| --- | --- | --- | --- |
| Table wrapper | `.table-simple` | — | `w-auto text-sm border-collapse` |
| Header cell | `.table-simple th` | text: `--text-heading`, border-bottom: `--border-default` | `font-bold text-left py-2 px-3` |
| Body cell | `.table-simple td` | text: `--text-body` | `py-2 px-3` |
| Totals row | `.table-simple .table-totals td` | text: `--text-heading`, border-top: `--border-default` | `font-bold` |
| Number cell | `.table-num` | — | `text-right` (apply to both `th` and `td`) |

Rules:
- Numbers right-aligned, text left-aligned
- One thin horizontal rule below headers, one above totals row
- No row dividers, no zebra striping, no sorting
- Regular text size for data, bold for column headers and totals row

```html
<table class="table-simple">
  <thead>
    <tr>
      <th>Item</th>
      <th class="table-num">Qty</th>
      <th class="table-num">Price</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Widget A</td><td class="table-num">12</td><td class="table-num">$48.00</td></tr>
    <tr class="table-totals"><td>Total</td><td class="table-num">12</td><td class="table-num">$48.00</td></tr>
  </tbody>
</table>
```

---

### Large Table — `.table-report`

A full-width report table for data-heavy screens. Always placed inside a Content Section (see below).

| Element | Semantic Class | Colour / Border Variables | Layout |
| --- | --- | --- | --- |
| Table wrapper | `.table-report` | — | `w-full text-sm border-collapse` |
| Header cell | `.table-report th` | bg: `--surface-table-header`, text: `--text-on-dark` | `font-bold text-left py-2.5 px-3 sticky top-0` |
| Body row (even) | `tr:nth-child(even)` | bg: `--surface-card-alt` | — |
| Body row (odd) | `tr:nth-child(odd)` | bg: `--surface-card` | — |
| Body cell | `.table-report td` | text: `--text-body` | `py-2 px-3` |
| Sort icon | `.table-sort` | `--table-sort-icon` | Append `ri-arrow-up-s-line` / `ri-arrow-down-s-line` |
| Number cell | `.table-num` | — | `text-right` |
| Footer | `.content-section-footer` | bg: `--surface-inset`, border: `--border-light` | `px-4 py-3` |

Rules:
- Full width, inside a Content Section container
- Zebra striping: alternating `--surface-card` / `--surface-card-alt` rows
- Sticky header row (stays visible on scroll)
- Sortable columns show up/down chevrons next to header text
- Number columns right-aligned
- Results/totals sit in a **non-scrollable footer** below the scrollable table body
- Content section header uses `--surface-section-header` (darker); table column headers use `--surface-table-header` (lighter) — two distinct levels

```html
<div class="content-section">
  <div class="content-section-header">Sales Report</div>
  <div class="content-section-body p-0 overflow-auto max-h-64">
    <table class="table-report">
      <thead>
        <tr>
          <th>Product <i class="ri-arrow-up-s-line table-sort"></i></th>
          <th class="table-num">Revenue</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Widget A</td><td class="table-num">$12,400</td></tr>
        <tr><td>Widget B</td><td class="table-num">$8,200</td></tr>
      </tbody>
    </table>
  </div>
  <div class="content-section-footer">
    <span class="type-body-emphasis">Total Revenue: $20,600</span>
  </div>
</div>
```

On the final step, replace `btn-next` with `btn-primary` and label it "Finish" with `ri-check-line`.
---

## Charts

CDN dependency: **Chart.js** — a single lightweight charting library, no build tools required. Can be swapped for more powerful alternatives (D3.js, Apache ECharts) if the prototype evolves into production.

### Chart Data Series

Charts use the `--chart-series-*` variables. These default to a spread of neutral tones for the wireframe aesthetic, but a re-branded app could use coloured series.

| Variable | Default Hex | Usage |
| --- | --- | --- |
| `--chart-series-1` | #3F3F46 | Primary/first data series |
| `--chart-series-2` | #71717A | Second data series |
| `--chart-series-3` | #D1D5DB | Third data series |
| `--chart-series-4` | #E7E5E4 | Fourth data series |
| `--chart-axis-label` | #71717A | Axis labels, legend text |
| `--chart-gridline` | #E7E5E4 | Gridlines |
| `--chart-segment-border` | #FFFFFF | Pie/doughnut segment borders |

All button colours come from CSS variables. Layout (padding, radius, shadows) uses Tailwind `@apply`.
### Defined Chart Types

**Bar Chart**
- Bars: `--chart-series-2`
- Gridlines: `--chart-gridline`
- X-axis labels visible, Y-axis with grid

**Line Chart**
- Line & points: `--chart-series-1`, 2px weight
- Gridlines: `--chart-gridline`

**Pie Chart**
- Segments: `--chart-series-1` through `--chart-series-4` (in order, supports up to 4)
- Segment borders: `--chart-segment-border`
- Legend below chart

### Chart.js Configuration Defaults

```javascript
// Read brand variables from CSS at runtime
const rootStyle = getComputedStyle(document.documentElement);
const cv = (name) => rootStyle.getPropertyValue(name).trim();

Chart.defaults.font.family = `${cv('--brand-font')}, cursive`;
Chart.defaults.color = cv('--chart-axis-label');
Chart.defaults.borderColor = cv('--chart-gridline');
Chart.defaults.plugins.legend.labels.usePointStyle = true;
```

---

## Content Sections

### Content Section — `.content-section`

A grouping container for form fields, tables, or mixed content on busy screens. Gives visual structure with a coloured header bar.

| Element | Semantic Class | Colour / Border Variables | Layout |
| --- | --- | --- | --- |
| Wrapper | `.content-section` | border: `--border-light` | `rounded-lg overflow-hidden` |
| Header | `.content-section-header` | bg: `--surface-section-header`, text: `--text-on-dark` | `font-bold text-sm px-4 py-2` |
| Body | `.content-section-body` | bg: `--surface-card` | `px-4 py-4` |
| Footer | `.content-section-footer` | bg: `--surface-inset`, border-top: `--border-light` | `px-4 py-3` |

Layout rules:
- **Single section**: full width
- **Two sections side by side**: use `grid grid-cols-1 md:grid-cols-2 gap-6`
- A section never wraps mid-content to a second column
- Responsive: two-column sections stack vertically on mobile

```html
<!-- Two side-by-side content sections -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div class="content-section">
    <div class="content-section-header">Personal Information</div>
    <div class="content-section-body">
      <!-- form fields here -->
    </div>
  </div>
  <div class="content-section">
    <div class="content-section-header">Address</div>
    <div class="content-section-body">
      <!-- form fields here -->
    </div>
  </div>
</div>
```

---

## Field Rows

### Field Row — `.field-row`

Inline grouping for related form fields that belong on the same line (e.g. First + Last name, City + State + Postcode).

| Element | Semantic Class | Tailwind |
| --- | --- | --- |
| Row wrapper | `.field-row` | `flex flex-col sm:flex-row gap-4` |
| Equal-width child | (default) | `flex-1` on each child `<div>` |
| Unequal widths | utility override | e.g. `flex-[3]` + `flex-[2]` for 60/40 split |

Rules:
- Children grow equally by default (each gets `flex-1`)
- For unequal widths, use `flex-[N]` on the child wrapper
- Collapses to stacked layout on narrow screens (below `sm:` breakpoint)
- Each child contains a standard `form-label` + `form-input` pair

```html
<!-- Equal widths: First Name + Last Name -->
<div class="field-row">
  <div class="flex-1">
    <label class="form-label">First Name</label>
    <input type="text" class="form-input" placeholder="Jane">
  </div>
  <div class="flex-1">
    <label class="form-label">Last Name</label>
    <input type="text" class="form-input" placeholder="Smith">
  </div>
</div>

<!-- Unequal widths: City (wider) + State + Postcode -->
<div class="field-row">
  <div class="flex-[3]">
    <label class="form-label">City</label>
    <input type="text" class="form-input" placeholder="Melbourne">
  </div>
  <div class="flex-[2]">
    <label class="form-label">State</label>
    <input type="text" class="form-input" placeholder="VIC">
  </div>
  <div class="flex-[1]">
    <label class="form-label">Postcode</label>
    <input type="text" class="form-input" placeholder="3000">
  </div>
</div>
```

---

## Layout Utilities

Semantic classes for page structure (used in showcase, reusable in projects):

| Element | Semantic Class | Colour Variables | Layout |
| --- | --- | --- | --- |
| Page body | `.page-bg` | bg: `--surface-page`, text: `--text-heading` | `text-base` |
| Section divider | `.section-divider` | border: `--border-section` | `border-b-4` |
| Section label | `.section-label` | bg: `--surface-section-header`, text: `--text-on-dark` | `px-8 py-2` |
| Label text | `.section-label-text` | — | `text-sm font-bold tracking-widest uppercase` |

---

## Left Sidebar — `.sidebar`


### Sidebar Container

| Element | Semantic Class | Colour Variables | Layout |
| --- | --- | --- | --- |
| Sidebar (expanded) | `.sidebar` | bg: `--surface-sidebar`, text: `--text-on-dark` | `w-56 flex flex-col h-full transition-all duration-200` |
| Sidebar (collapsed) | `.sidebar.sidebar-collapsed` | (inherited) | `w-16` (overrides width only) |

### Sidebar Elements

| Element | Semantic Class | Colour Variables | Layout |
| --- | --- | --- | --- |
| Brand area | `.sidebar-brand` | text: `--text-on-dark`, border: `--border-strong` | `px-4 py-4 font-bold text-lg flex items-center gap-3` |
| Nav item | `.sidebar-item` | text: `--text-on-dark-muted` → hover bg: `--surface-section-header`, text: `--text-on-dark` | `flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg mx-2` |
| Nav item (active) | `.sidebar-item-active` | bg: `--surface-section-header`, text: `--text-on-dark` | `font-bold` |
| Section label | `.sidebar-section-label` | text: `--text-on-dark-faint` | `text-xs font-bold uppercase tracking-wider px-4 pt-4 pb-1` |
| Collapse toggle | `.sidebar-toggle` | text: `--control-icon-muted` → hover: `--text-on-dark` | `flex items-center justify-center p-2 cursor-pointer` |
| Item icon | `.sidebar-item i` | — | `text-lg w-5 text-center shrink-0` |

### Collapsed State Behaviour

When `.sidebar-collapsed` is applied:
- Labels and section labels are hidden (`display: none` or `opacity: 0`)
- Icons remain centred in the narrow sidebar
- Brand area shows only icon/logo, no text
- Tooltips (optional) can show label on hover — not required for wireframes

### Responsive Rule

On screens below `lg:` breakpoint (tablet and smaller):
- Sidebar is hidden by default
- A hamburger icon (`.sidebar-mobile-trigger`, using `ri-menu-line`) in the top bar opens the sidebar as an overlay
- Overlay sidebar uses `position: fixed; z-index: 40` with a backdrop

```html
<!-- Expanded sidebar -->
<aside class="sidebar">
  <div class="sidebar-brand">
    <i class="ri-layout-grid-line text-xl"></i>
    <span>AppName</span>
  </div>
  <div class="px-3 pt-2 pb-1">
    <button class="sidebar-toggle w-full">
      <i class="ri-arrow-left-double-line"></i>
      <span class="text-xs">Collapse</span>
    </button>
  </div>
  <nav class="flex flex-col gap-1 py-3">
    <span class="sidebar-section-label">Main</span>
    <a href="#" class="sidebar-item sidebar-item-active">
      <i class="ri-home-line"></i> <span>Dashboard</span>
    </a>
    <a href="#" class="sidebar-item">
      <i class="ri-file-list-line"></i> <span>Reports</span>
    </a>
    <span class="sidebar-section-label">Admin</span>
    <a href="#" class="sidebar-item">
      <i class="ri-settings-3-line"></i> <span>Settings</span>
    </a>
  </nav>
</aside>
```

---

## Right Panel (Slide-Out) — `.panel-right`

A slide-out panel for contextual configuration, filters, or settings. **Overlays** the content area (doesn't push it aside). Can be dismissed or kept open (pinned).

### Panel Container

| Element | Semantic Class | Colour Variables | Layout |
| --- | --- | --- | --- |
| Panel wrapper | `.panel-right` | bg: `--surface-card`, border: `--border-light` | `absolute top-0 right-0 h-full w-80 shadow-lg z-40 translate-x-full transition-transform duration-200` |
| Panel (open) | `.panel-right.panel-open` | — | `translate-x-0` (slides into view) |
| Panel backdrop | `.panel-backdrop` | bg: `--surface-overlay-light` | `absolute inset-0 z-30` (click to dismiss) |

### Panel Elements

| Element | Semantic Class | Colour Variables | Layout |
| --- | --- | --- | --- |
| Header | `.panel-right-header` | border-bottom: `--border-light` | `flex items-center justify-between px-5 py-3` |
| Header title | `.panel-right-title` | text: `--text-title` | `font-bold text-base` |
| Close button | `.panel-right-close` | text: `--control-icon-muted` → hover: `--control-icon-muted-hover` | `text-xl cursor-pointer` (uses `ri-close-line`) |
| Body | `.panel-right-body` | — | `px-5 py-4 overflow-y-auto flex-1` |
| Footer | `.panel-right-footer` | bg: `--surface-inset`, border-top: `--border-light` | `px-5 py-3` |

### Usage Convention — `panel-default-open`

This is a **prototype-level convention**, not a CSS class. When building a screen that has a right panel:
- If the panel should be visible when the user first arrives on the screen, add the `panel-open` class in the HTML (panel starts open)
- If the panel should be hidden until the user requests it, omit `panel-open` (panel starts closed)

Document this per-screen in your prototype's own notes. The trigger icon (typically `ri-filter-3-line` or `ri-settings-3-line`) should sit in the content area's top bar or header.

### Responsive Rule

The panel is always an overlay on all screen sizes — no special responsive changes needed. On narrow screens the backdrop ensures the panel doesn't obscure navigation.

```html
<!-- Right panel (hidden by default — add panel-open to show) -->
<div class="panel-backdrop hidden" id="panel-backdrop"></div>
<aside class="panel-right" id="config-panel">
  <div class="panel-right-header">
    <span class="panel-right-title">Report Filters</span>
    <button class="panel-right-close"><i class="ri-close-line"></i></button>
  </div>
  <div class="panel-right-body space-y-4">
    <!-- Filter controls go here (form-label + form-select, checkboxes, etc.) -->
    <div>
      <label class="form-label">Date Range</label>
      <select class="form-select">
        <option>Last 7 days</option>
        <option>Last 30 days</option>
        <option>This quarter</option>
      </select>
    </div>
  </div>
  <div class="panel-right-footer">
    <button class="btn-primary w-full">
      <span class="flex items-center justify-center gap-2"><i class="ri-check-line"></i> Apply Filters</span>
    </button>
  </div>
</aside>
```

---

## App Shell — `.app-shell`

The top-level layout that composes a left sidebar, main content area, and optional right panel into a full application frame. Use this as the starting structure for any multi-screen prototype.

### App Shell Container

| Element | Semantic Class | Colour Variables | Layout |
| --- | --- | --- | --- |
| Shell wrapper | `.app-shell` | bg: `--surface-page` | `flex h-screen overflow-hidden` |
| Sidebar slot | `.app-shell-sidebar` | (uses `.sidebar` styles) | First child |
| Content area | `.app-shell-content` | — | `flex-1 flex flex-col overflow-hidden` |
| Content header | `.app-shell-header` | bg: `--surface-card`, border: `--border-light` | `flex items-center justify-between px-6 py-3 shrink-0` |
| Content body | `.app-shell-body` | — | `flex-1 overflow-y-auto px-6 py-6` |
| Panel slot | `.app-shell-panel` | (uses `.panel-right` styles) | Overlays, not a grid slot |

### Layout Behaviour

- The sidebar and content area sit side by side using flexbox
- When the sidebar collapses, the content area automatically grows to fill the space
- The right panel overlays on top of everything (fixed position, z-index above content)
- The content header provides a place for page title, breadcrumbs, and trigger buttons (e.g. filter icon to open the right panel)

```html
<div class="app-shell">
  <!-- Left sidebar -->
  <aside class="sidebar">
    <!-- sidebar content (see Left Sidebar section) -->
  </aside>

  <!-- Main content -->
  <div class="app-shell-content">
    <header class="app-shell-header">
      <h1 class="type-title">Dashboard</h1>
      <button class="btn-ghost text-sm" id="filter-toggle">
        <span class="flex items-center gap-2"><i class="ri-filter-3-line"></i> Filters</span>
      </button>
    </header>
    <main class="app-shell-body">
      <!-- Page content goes here -->
    </main>
  </div>

  <!-- Right panel (overlay) -->
  <div class="panel-backdrop hidden" id="panel-backdrop"></div>
  <aside class="panel-right" id="config-panel">
    <!-- panel content (see Right Panel section) -->
  </aside>
</div>
```

---

## How to Re-brand

To take a prototype built with this style guide and apply your own brand, you only need to change the `:root` variables block. Every semantic class and all HTML stays untouched.

### Step 1: Swap the font

In the `<head>`, replace the Google Fonts `<link>` tag with your brand font's CDN link (or a local `@font-face`). Then update the variable:

```css
--brand-font: "Inter";  /* or whatever your brand font is */
```

The `tailwind.config` already reads from `var(--brand-font)`, so the font propagates everywhere automatically.

### Step 2: Change the accent colours

Update the `--brand-*` variables to your brand's colour palette:

```css
--brand-primary:       #2563EB;
--brand-primary-hover: #1D4ED8;
--brand-danger:        #DC2626;
--brand-danger-hover:  #B91C1C;
--brand-warning:       #D97706;
```

### Step 3: Adjust surfaces, text, borders, and controls

Because every variable is named by **role** (not by colour), you can go through each group and set the right value for your brand:

- **`--surface-*`**: Set page background, card background, sidebar/footer colours. If your brand has a dark sidebar, keep `--surface-sidebar` dark. If you want a light sidebar, change it — the text variables (`--text-on-dark`, `--text-on-dark-muted`) may need to flip to dark text.
- **`--text-*`**: Set your text hierarchy. Title should be your darkest text, placeholder your lightest.
- **`--border-*`**: Usually stays subtle — just pick borders that work with your surface colours.
- **`--control-*`**: Set button backgrounds, focus rings, checkbox accent. These are often close to your border and surface tones.
- **`--chart-*`**: Set your 4 data series colours. For a branded app, you might use brand-tinted colours instead of neutrals.

### Step 4: Update `--brand-on-primary` / `--brand-on-danger` if needed

If your new accent colours are light (e.g. a pastel primary), flip these to dark text:

```css
--brand-on-primary: #18181B;  /* dark text on light primary */
```

Similarly, if your sidebar/footer change from dark to light, swap `--text-on-dark` to a dark colour.

### What NOT to change

- **HTML structure** — all `class=""` references stay the same
- **Semantic class names** — `.btn-primary`, `.type-heading`, etc. are stable
- **Layout/spacing values** — `px-6`, `rounded-lg`, `gap-3` etc. are structural, not brand-specific
- **Tailwind \****`@apply`** lines in component classes — these handle layout only

### Quick test

After changing variables, open `showcase.html` in a browser and scroll through all 7 sections. Every component should reflect the new colours and font. If something looks wrong, check that the relevant component class references a semantic `var(--*)` instead of a hardcoded Tailwind colour.
