---
planStatus:
  planId: plan-feedback-cycle-prototype
  title: Feedback Cycle Prototype
  status: complete
  planType: feature
  priority: high
  owner: lars
  stakeholders: []
  tags:
    - prototype
    - feedback
    - release-notes
    - walkthrough
  created: "2026-03-02"
  updated: "2026-03-03"
  progress: 100
---
# Feedback Cycle Prototype — Plan

## Overview

A clickable desktop-web prototype demonstrating three connected capabilities:
1. **Interactive Release Notes** — notify users about new features
2. **Step-by-step Walkthroughs** — guide users through features using Driver.js
3. **Feedback Collection** — gather user feedback via three trigger types

Built on top of a dummy app (extracted from showcase.html Section 7) using the existing wireframe style guide.

---

## Decisions Log

| Decision | Outcome |
| --- | --- |
| Icon for release notes (outgoing) | `ri-megaphone-line` |
| Icon for feedback (incoming) | `ri-feedback-line` |
| Walkthrough library | **Driver.js** (open-source, lightweight) |
| Multi-screen walkthroughs | Yes — persist step state in `sessionStorage` across pages |
| Survey trigger simulation | First click on "Error Rate" card triggers survey; reset via manual button |
| Analytics/counters display | No admin dashboard — data logged to `localStorage` / console only |
| Debug/trigger buttons | Ugly-duckling buttons at the bottom of the sidebar nav |
| Star rating component | Added to style guide — greyscale only, using `--control-accent` and `--status-neutral` |
| Persistence | `sessionStorage` for walkthrough state; `localStorage` for survey-seen flags and counters |
| Route normalisation | `npx serve` strips `.html` from URLs — all route comparisons normalise with `.html` suffix |

---

## Pre-work: Style Guide Addition

### Star Rating Component

Before building the prototype, add a star rating component to the style guide.

- [x] Add `.star-rating` component to `style-guide.md`
  - Uses `ri-star-line` (empty) and `ri-star-fill` (filled)
  - Filled colour: `--control-accent` — Zinc-600 (#52525B)
  - Empty colour: `--status-neutral` — Gray-300 (#D1D5DB)
  - Hover state: `--control-icon-muted-hover` — Zinc-700 (#3F3F46)
  - 5 stars, clickable, stores value 1–5
  - Size: `text-xl` for form context
  - All colours reference existing CSS variables (no new variables needed) and align with Tailwind shade names
- [x] Add star rating to `showcase.html` (in the Form Elements section)
- [ ] Verify it looks right in the showcase (user to verify visually)

---

## Phase 1: Dummy App Shell

Extract and adapt the app shell from showcase.html (lines 1058–1455) into standalone screens.

### Screen 1: Dashboard (`index.html`)
- [x] Extract the app shell structure (sidebar, header, content area)
- [x] Copy the dashboard content: 3 summary cards (Total Users, Active Sessions, Error Rate) + Recent Activity table
- [x] Apply `wire-body` class to User, Action, and Time columns in the table (squiggle font) — Status column stays readable
- [x] ~~Keep the filter panel functional~~ — Removed per user feedback (adds no value)
- [x] Add sidebar nav items: Dashboard (active), Reports (links to reports.html)

### Screen 2: Reports Page (`reports.html`)
- [x] Same app shell (sidebar, header)
- [x] Reports nav item active in sidebar
- [x] Placeholder content — a content-section with squiggle text and a chart
- [x] This screen exists mainly so the multi-screen walkthrough has somewhere to go

### Shared across screens
- [x] Extract CSS (`:root` variables + all semantic classes) into a shared `styles.css`
- [x] Extract common HTML (sidebar, header) into a clean pattern that can be copied per page (no build tools — just copy-paste for a prototype)
- [x] Shared `app.js` for sidebar collapse, panel toggle, and other common interactions

---

## Phase 2: Interactive Release Notes

### Release Notes UI
- [x] **Navbar indicator**: `ri-megaphone-line` icon in the app-shell header, right side
- [x] **Notification dot**: Small badge/dot on the icon when there are unseen releases (greyscale — using `--control-accent` for the dot), with blink-twice animation
- [x] **Click behaviour**: Opens a right-side panel (reusing `.panel-right` pattern) showing release blurbs, external doc links, and "Start Walkthrough" buttons
- [x] **Route awareness**: Only show the notification dot on routes listed in `affectedRoutes`
- [x] **"Reset Release" debug button**: Resets the "seen" flag so the notification dot reappears

---

## Phase 3: Walkthroughs (Driver.js)

### Setup
- [x] Add Driver.js via CDN
- [x] Create walkthrough configs in `walkthroughs.js`

### Features
- [x] **Progress indicator**: Custom "Step X of Y" in popover description
- [x] **Multi-screen support**: Navigate to next/previous screen and resume via `sessionStorage`
- [x] **Cross-screen Previous**: Force-enable Driver.js Previous button when prior steps exist on another screen
- [x] **Squiggle text**: Use `wire-body` class for walkthrough copy (description text in the popovers)
- [x] **Start from release notes panel**: "Start Walkthrough" button triggers Driver.js
- [ ] **Manual start**: Can also be triggered from a help/guide section (future)
- [x] **Counters**: Track start/completion counts in `localStorage`
- [x] **Re-visit detection**: Second walkthrough start triggers Feedback Type 2
- [x] **Safety net**: Resume attempt counter prevents infinite reload loops (max 3 retries)

---

## Phase 4: Feedback Collection

### Feedback Type 1 — Passive (user-initiated)
- [x] **Feedback icon**: `ri-feedback-line` in the app-shell header, next to the megaphone
- [x] **Click behaviour**: Opens a decision modal with branching flow
- [x] **Problem report form**: 3 fields with readable English labels, follows Procedural Modal pattern (Cancel left, Previous + Submit right)
- [x] **Suggestion form**: Single textarea, same button pattern
- [x] Uses `.btn-cancel`, `.btn-previous`, `.btn-next`, `.btn-primary` per style guide

### Feedback Type 2 — Walkthrough re-visit
- [x] Prompt after second walkthrough: "Looking for something?"
- [x] Options: "I need help" → opens feedback Type 1 / "All good, just refreshing" → dismiss

### Feedback Type 3 — Triggered mini-survey
- [x] **Trigger**: First click on "Error Rate" card
- [x] **Tracking**: `localStorage` flag — "Not now" does NOT set flag (retriggers), only "Submit" marks complete
- [x] **Reset**: Debug button in sidebar clears the flag
- [x] **Survey UI**: Star rating, radio buttons, free text, contact permission checkbox

### Shared feedback elements
- [x] **Contact permission**: Checkbox with squiggle email placeholder
- [x] **Submission confirmation**: "Thanks for your feedback!" modal
- [x] **Metadata logged to localStorage**: type, timestamp, route, userId, appVersion, browser

---

## Phase 5: Debug / Prototype Controls

- [x] **"Reset Release"** — resets the seen flag (renamed from "New Release" — does not add releases)
- [x] **"Reset Survey"** — clears the `localStorage` flag so the Error Rate survey fires again
- [x] Styled as `.btn-debug` with dashed border, deliberately "not part of the real app"

---

## File Structure

```
prototype-feedbackcycle/
├── docs/
│   ├── PRD.md
│   ├── showcase.html
│   └── style-guide.md
├── plans/
│   └── feedback-cycle-prototype.md  (this file)
├── src/
│   ├── index.html          (Dashboard)
│   ├── reports.html         (Reports screen)
│   ├── styles.css           (shared :root vars + blink animation)
│   ├── app.js               (shared: sidebar, panel, nav interactions)
│   ├── releases.json        (release notes data)
│   ├── release-notes.js     (release notes panel logic)
│   ├── walkthroughs.js      (Driver.js walkthrough configs)
│   ├── walkthrough.js       (walkthrough engine: start, resume, track)
│   └── feedback.js          (all 3 feedback types + submission logic)
├── style-guide.md
└── CLAUDE.md
```

---

## External Dependencies

| Dependency | Why | Source |
| --- | --- | --- |
| Tailwind CSS | Layout & utility classes (existing) | CDN |
| Balsamiq Sans | Wireframe brand font (existing) | Google Fonts |
| Redacted Script | Squiggle placeholder text (existing) | Google Fonts |
| Remix Icons | Icon set (existing) | CDN |
| Chart.js | Charts in dummy app (existing) | CDN |
| **Driver.js** | Step-by-step walkthrough overlays | CDN — `https://cdn.jsdelivr.net/npm/driver.js@1.3.1/dist/driver.js.iife.js` + CSS |

---

## Resolved Issues

### Bug 1: Walkthrough "Previous" across screens — FIXED (03/03/2026)
Driver.js auto-disables the Previous button on the first local step. Fixed by force-enabling the button after render when prior steps exist on another screen, and using `onPrevClick` to handle cross-screen backward navigation.

### Bug 2: Feedback modal buttons — FIXED (03/03/2026)
Problem report and suggestion forms now follow the Procedural Modal pattern: `.modal-actions-split` with Cancel (`.btn-cancel`) left, Previous (`.btn-previous`) + Submit (`.btn-primary`) grouped right.

### Bug 3: Route normalisation — FIXED (03/03/2026)
`npx serve` strips `.html` from URLs, causing `currentRoute` to never match walkthrough config screen values. Fixed by normalising routes: `rawRoute.endsWith('.html') ? rawRoute : rawRoute + '.html'`. Applied to `walkthrough.js`, `release-notes.js`, and `feedback.js`.

---

## Future Considerations

- [ ] User hasn't visually verified the star rating in the showcase yet
- [ ] Dashboard is currently the landing page; user noted it should ideally be screen 2 with a proper landing page as screen 1 — deferred for now
- [ ] Manual walkthrough start from a help/guide section (not yet built)

---

## Open Questions (resolved)

All questions from the PRD review have been answered — see Decisions Log above.
