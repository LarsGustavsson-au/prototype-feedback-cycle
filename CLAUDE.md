# Project: Feedback Cycle

## User Context

The user is a **product manager**, not a developer. He has broad experience with software concepts (architecture, data structures, design patterns) but is not across modern tooling details like CI/CD pipelines, GitHub workflows, npm, or OOP specifics. When communicating:


- **Explain the "why"**, not the syntax — he gets the concepts, just not the tool-specific bits
- **Avoid jargon** without brief context (e.g. don't just say "utility classes" or "build pipeline")
- **Show visual results** whenever possible — rendered output beats code snippets
- **Don't assume** knowledge of git commands, framework conventions, or dev tools
- **Do assume** he understands software architecture, trade-offs, and can reason about design decisions
- **Tone**: direct, plain-spoken, no waffle. Friendly but not corporate. Think "senior engineer at a Melbourne café" not "Silicon Valley pitch deck"

## Language & Locale
- **Australian English throughout** — colour not color, organisation not organization, behaviour not behavior
- **Australian date format**: DD/MM/YYYY (e.g. 24/02/2026), day before month
- **time:** AM/PM
- **Metric units**: mm, cm, m, km, kg, °C

## Project Context
This is a **prototype project** — not a commercial product. That means:

- **Good enough is good enough** — don't over-engineer for scale, edge cases, or enterprise patterns
- **Speed of iteration matters more** than architectural purity
- Favour simple, obvious solutions over "proper" ones
- Skip things like exhaustive error handling, internationalisation, or accessibility audits unless specifically asked
- It's fine to use CDN links, single-file setups, and shortcuts that wouldn't fly in production

## Planning First

1. **Always start with a plan** before writing code. Use a `plan.md` (or similar) with checkboxes so progress can be tracked visually in Nimbalyst
2. **Review the plan** at the start of each session — check what's done, what's next
3. **Scope changes during planning** — if a task grows beyond the original plan, stop and re-plan rather than winging it

## UI
1. **Before building any UI component**, re-check the style guide for an existing pattern that fits. If the component involves buttons, modals, or multi-step flows, confirm the exact class names and HTML structure before writing code. Don't build from memory.
2. Read **style-guide.md** first before deciding or making any visual changes
3. Look for **showcase.html **in the docs folder, which will show how the style guide has been applied.
4. Never hardcode colours or sizes in HTML — always use the Tailwind classes defined in the style guide
5. If a needed component is missing from the style guide, raise it — do not invent styles.

### Things That Must Be Discussed During Planning

Don't implement these silently — raise them in the planning stage first:

- Changes to a **data schema** (database models, API contracts, data structures)
- A needed UI component that is **not in the style guide** (don't invent it — add it to the style guide first)
- Changes to a **language/locale guide**
- **Architectural decisions** (new dependencies, framework choices, folder restructuring)
- **Large refactors**, deleting files, or swapping out frameworks
- **Deployment to Vercel** (or any hosting) — confirm timing, target environment, and that tests pass

## Development Pattern: Test-Driven Development (TDD)

Every feature follows the **red → green → refactor** cycle:

1. **Red** — Write a failing test that describes the expected behaviour
2. **Green** — Write the minimum code to make the test pass
3. **Refactor** — Clean up without changing behaviour, keeping tests green

### Self-Testing Rules

- No feature code without a corresponding test
- Run the test suite after every meaningful change
- If a test breaks, fix it before moving on — don't accumulate failures
- Integration tests for critical paths (API calls, database operations, auth flows)
- Unit tests for business logic and utility functions

## Code Quality

### Readability Over Cleverness

- Code should read like well-written prose — a new developer should be able to follow it without a decoder ring
- **Short functions**: each function does one thing. If you can't describe it in one sentence, it's too long. Aim for under 20 lines as a rule of thumb
- **Descriptive names**: classes, functions, variables, and constants should say what they are. `calculateMonthlyRevenue()` not `calcRev()`. `isUserAuthenticated` not `flag`
- **No magic numbers or strings**: use named constants. `MAX_RETRY_ATTEMPTS = 3` not just `3`

### Commenting

- **Comment the why, not the what** — the code itself should explain what it does
- Add comments for: business logic rationale, workarounds, non-obvious design decisions
- Don't add comments that just restate the code (e.g. `// increment counter` above `counter++`)
- Keep comments up to date — a stale comment is worse than no comment

### Don't Make Drastic Changes Without Asking

- If something looks like it needs a big change, **flag it and discuss** before proceeding
- Small, focused changes are always preferred over sweeping rewrites

## External Dependencies

- Prefer well-maintained, widely-used packages
- Document why each dependency was added (a one-line note in the plan is enough)
- Avoid adding dependencies for things that can be done simply with built-in language features

## Session Workflow

1. Check `CLAUDE.md` and any plan files for current state
2. Review what was done in previous sessions
3. Confirm today's goals with the user
4. Plan first, then build
5. Test as you go
6. Summarise what was done at the end
