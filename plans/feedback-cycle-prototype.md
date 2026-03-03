---
planStatus:
  planId: plan-feedback-cycle-prototype
  title: Feedback Cycle Prototype
  status: in-review
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
  updated: "2026-03-02T00:00:00.000Z"
  progress: 90
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

---

## Pre-work: Style Guide Addition

### Star Rating Component

Before building the prototype, add a star rating component to the style guide.

- [ ] Add `.star-rating` component to `style-guide.md`
  - Uses `ri-star-line` (empty) and `ri-star-fill` (filled)
  - Filled colour: `--control-accent` — Zinc-600 (#52525B)
  - Empty colour: `--status-neutral` — Gray-300 (#D1D5DB)
  - Hover state: `--control-icon-muted-hover` — Zinc-700 (#3F3F46)
  - 5 stars, clickable, stores value 1–5
  - Size: `text-xl` for form context
  - All colours reference existing CSS variables (no new variables needed) and align with Tailwind shade names
- [ ] Add star rating to `showcase.html` (in the Form Elements section)
- [ ] Verify it looks right in the showcase (user to verify visually)

---

## Phase 1: Dummy App Shell

Extract and adapt the app shell from showcase.html (lines 1058–1455) into standalone screens.

### Screen 1: Landing Page (`index.html`)
- [ ] Extract the app shell structure (sidebar, header, content area, right panel)
- [ ] Copy the dashboard content: 3 summary cards (Total Users, Active Sessions, Error Rate) + Recent Activity table
- [ ] Apply `wire-body` class to User, Action, and Time columns in the table (squiggle font) — Status column stays readable
- [ ] Keep the filter panel functional
- [ ] Add sidebar nav items: Dashboard (active), Reports (links to reports.html)

### Screen 2: Reports Page (`reports.html`)
- [ ] Same app shell (sidebar, header)
- [ ] Reports nav item active in sidebar
- [ ] Placeholder content — a content-section with squiggle text and maybe a chart
- [ ] This screen exists mainly so the multi-screen walkthrough has somewhere to go

### Shared across screens
- [ ] Extract CSS (`:root` variables + all semantic classes) into a shared `styles.css`
- [ ] Extract common HTML (sidebar, header) into a clean pattern that can be copied per page (no build tools — just copy-paste for a prototype)
- [ ] Shared `app.js` for sidebar collapse, panel toggle, and other common interactions

---

## Phase 2: Interactive Release Notes

### Data structure — `releases.json`
```json
{
  "maxVisibleReleases": 5,
  "releases": [
    {
      "id": "v1.2",
      "title": "New Dashboard Metrics",
      "date": "2026-02-28",
      "blurb": "We've added real-time error rate tracking...",
      "image": null,
      "externalLink": "https://example.com/release-notes/v1.2",
      "affectedRoutes": ["index.html", "reports.html"],
      "walkthrough": "dashboard-metrics"
    }
  ]
}
```

### Release Notes UI
- [ ] **Navbar indicator**: `ri-megaphone-line` icon in the app-shell header, right side
- [ ] **Notification dot**: Small badge/dot on the icon when there are unseen releases (greyscale — using `--control-accent` for the dot)
- [ ] **Click behaviour**: Opens a right-side panel (reusing `.panel-right` pattern) showing:
  - Latest release blurb (with optional image)
  - Link to external docs if provided
  - "Start Walkthrough" button if a walkthrough is linked
  - List of recent releases (limited by `maxVisibleReleases`)
- [ ] **Route awareness**: Only show the notification dot on routes listed in `affectedRoutes`
- [ ] **"New release" magic button**: At the bottom of the sidebar, a debug button that simulates a new release (adds a release entry and shows the notification dot)

---

## Phase 3: Walkthroughs (Driver.js)

### Setup
- [ ] Add Driver.js via CDN
- [ ] Create walkthrough configs in `walkthroughs.js`

### Walkthrough config structure
```javascript
const walkthroughs = {
  "dashboard-metrics": {
    steps: [
      { screen: "index.html", element: "#error-rate-card", title: "Error Rate", description: "...", popover: { side: "bottom" } },
      { screen: "index.html", element: "#activity-table", title: "Activity Log", description: "..." },
      { screen: "reports.html", element: "#reports-section", title: "Detailed Reports", description: "..." }
    ]
  }
};
```

### Features
- [ ] **Progress indicator**: Custom "Step X of Y" in popover description
- [ ] **Multi-screen support**: When a step targets a different screen, navigate to that screen and resume the walkthrough from `sessionStorage`
- [ ] **Squiggle text**: Use `wire-body` class for walkthrough copy (description text in the popovers)
- [ ] **Start from release notes panel**: "Start Walkthrough" button triggers Driver.js
- [ ] **Manual start**: Can also be triggered from a help/guide section (future)
- [ ] **Counters**: Track in `localStorage`:
  - Number of times walkthrough started
  - Number of times walkthrough completed (reached final step)
- [ ] **Re-visit detection**: If the user starts the same walkthrough a second time, trigger Feedback Type 2 (see Phase 4)

---

## Phase 4: Feedback Collection

### Feedback Type 1 — Passive (user-initiated)
- [ ] **Feedback icon**: `ri-feedback-line` in the app-shell header, next to the megaphone
- [ ] **Click behaviour**: Opens a modal with branching flow:
  - Step 1: "What brings you here?" — two options:
    - "I'm having a problem" → Problem report form
    - "I have a suggestion or question" → Free text form
  - **Problem report form**: 3 fields (all `wire-caption` squiggle labels):
    - "What were you trying to do?" (textarea)
    - "What did you expect to happen?" (textarea)
    - "What happened instead?" (textarea)
  - **Suggestion form**: Single large textarea
  - Both end with: contact permission checkbox + "Submit" button
- [ ] Uses decision modal + branching forms

### Feedback Type 2 — Walkthrough re-visit
- [ ] When a user starts a walkthrough for the second time, show a small prompt after the walkthrough completes (or when they dismiss it early):
  - "Looks like you've been through this before. Can we help?"
  - Options: "I need help" (→ opens feedback Type 1) / "All good, just refreshing" (→ dismiss)
- [ ] Uses a simple confirmation modal

### Feedback Type 3 — Triggered mini-survey
- [ ] **Trigger**: First time the user clicks the "Error Rate" card on the dashboard
- [ ] **Tracking**: `localStorage` flag `survey-errorrate-seen` — once submitted or dismissed, don't show again
- [ ] **Reset**: Magic button in the sidebar clears this flag
- [ ] **Survey UI** — modal with:
  - Short intro copy (squiggle — `wire-body`)
  - Star rating ("How useful is this metric?")
  - Radio buttons ("How often do you check this?") — labels in squiggle
  - "Anything else?" free text box
  - Contact permission checkbox
  - Submit button

### Shared feedback elements
- [ ] **Contact permission**: Checkbox — "It's OK to contact me about this at [email]" (email shown as squiggle placeholder)
- [ ] **Submission confirmation**: Simple confirmation modal — "Thanks for your feedback!"
- [ ] **Metadata logged to localStorage on every submission**:
  - Feedback type (1, 2, or 3)
  - Timestamp
  - Screen/route
  - UserID (fake, hardcoded)
  - App version (fake, hardcoded)
  - Browser info (`navigator.userAgent`)

---

## Phase 5: Debug / Prototype Controls

- [ ] **Sidebar bottom section**: Two ugly-duckling buttons at the very bottom of the sidebar nav, styled as debug controls (dashed border, muted text, small font):
  - "New Release" — adds a release entry, shows notification dot
  - "Reset Survey" — clears the `localStorage` flag so the Error Rate survey fires again
- [ ] These buttons look deliberately "not part of the real app" — `.btn-debug` class with dashed border

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
│   ├── index.html          (Landing/Dashboard)
│   ├── reports.html         (Reports screen)
│   ├── styles.css           (shared :root vars + all semantic classes)
│   ├── app.js               (shared: sidebar, panel, nav interactions)
│   ├── releases.json        (release notes data)
│   ├── release-notes.js     (release notes panel logic)
│   ├── walkthroughs.js      (Driver.js walkthrough configs)
│   ├── walkthrough.js       (walkthrough engine: start, resume, track)
│   ├── feedback.js          (all 3 feedback types + submission logic)
│   └── debug-controls.js    (magic buttons logic)
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
| **Driver.js** | Step-by-step walkthrough overlays | CDN — `https://cdn.jsdelivr.net/npm/driver.js/dist/driver.js.iife.js` + CSS |

---

## Build Order

1. Style guide addition (star rating)
2. Dummy app shell (Phase 1) — get two working screens
3. Release notes (Phase 2) — data + UI
4. Walkthroughs (Phase 3) — Driver.js integration
5. Feedback collection (Phase 4) — all three types
6. Debug controls (Phase 5) — magic buttons

Each phase follows TDD: write a test describing the expected behaviour, make it pass, then tidy up.

---

## Known Issues / Next Session

### Bug 1: Walkthrough "Previous" button doesn't cross screens

The walkthrough engine now correctly shows "Next →" when the next step is on another screen, and navigates there. However, **"Previous" does not work when crossing back** to the prior screen. If the user is on step 3 (reports.html) and clicks Previous, it should navigate back to the previous screen and resume at the correct step. This needs the same sessionStorage-based approach used for forward navigation, but in reverse.

**Files to change:** `src/walkthrough.js`

### Bug 2: Feedback modal buttons don't follow the style guide

The manually-triggered feedback workflow (Type 1 — passive) has button issues:

1. **"Next" button uses wrong class.** It should use `.btn-next` — the correct implementation is in `docs/showcase.html`. Currently it's just a plain element without the proper style.
2. **Step 2 (Problem Report) says "Back" instead of "Previous".** The style guide specifies `.btn-previous` with `ri-arrow-left-line` icon.
3. **Step 2 is missing a "Cancel" button.** The Procedural Modal pattern in the style guide shows `.modal-actions-split` with Cancel on the left, and Previous + Next/Submit grouped on the right.
4. **Same issues apply to the Suggestion form** (step 2 of the other branch).

**Reference:** Check the Procedural Modal section in `style-guide.md` and the working implementation in `docs/showcase.html` for the correct button layout and classes.

**Files to change:** `src/feedback.js`

### Other notes for next session

- [ ] Local git commit (no commit was made this session)
- [ ] User hasn't visually verified the star rating in the showcase yet
- [ ] "Reset Release" debug button now just resets the seen flag (doesn't add releases) — renamed from "New Release"
- [ ] Filter panel was removed from Dashboard per user feedback
- [ ] Dashboard is currently the landing page; user noted it should ideally be screen 2 with a proper landing page as screen 1 — deferred for now

---

## Open Questions (resolved)

All questions from the PRD review have been answered — see Decisions Log above.
