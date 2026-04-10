# CLAUDE.md — Forma Web Agency

## Read This First
Before writing any UI code, read these files in order:
1. `DESIGN_SYSTEM.md` — aesthetic rules, typography, colors, motion
2. `COMPONENTS.md` — full catalog of pre-built components with code locations

Do not skip this step. These files exist to prevent generic output.

---

## Session Start — Required Steps
At the start of every session (including after /compact):
1. Read `tasks/project.md` — full project context, goals, and current state
2. Read `tasks/lessons.md` — rules learned from past corrections
3. Read `tasks/todo.md` — current task status

Never ask the user to re-explain what the project is or what's being built. It's all in these files.

---



### Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity
- Never start implementation until the plan is agreed

### Subagent Strategy
- Use subagents to keep the main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### Self-Improvement Loop
- At session start: check if `tasks/lessons.md` exists — if not, create it with the header below
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review `tasks/lessons.md` at session start for the relevant project

**Initial `tasks/lessons.md` template (create if missing):**
```markdown
# Lessons Learned — [Project Name]

## Rules
<!-- Add rules here after corrections. Format: "Never do X. Do Y instead." -->

## Log
<!-- Date + what went wrong + what the fix was -->
```

### Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run the dev server, check the browser, demonstrate correctness

### Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

### Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, browser console — then resolve them
- Zero context switching required from the user
- Go fix failing builds without being told how

---

## Task Management

1. **Plan First** — Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan** — Check in before starting implementation
3. **Track Progress** — Mark items complete as you go
4. **Explain Changes** — High-level summary at each step
5. **Document Results** — Add review section to `tasks/todo.md`
6. **Capture Lessons** — Update `tasks/lessons.md` after corrections

---

## Core Principles

- **Simplicity First** — Make every change as simple as possible. Impact minimal code.
- **No Laziness** — Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact** — Only touch what's necessary. No side effects with new bugs.

---

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui — all primitives live in `/components/ui`
- **Animation:** motion/react (Framer Motion v11+)
- **Icons:** lucide-react only — no other icon libraries
- **Shaders:** WebGL via native canvas — no Three.js unless explicitly asked

## Project Structure
```
/components/ui/         ← shadcn primitives + all 21st.dev components
/components/blocks/     ← full page sections (Hero, Pricing, Nav, Footer)
/components/layout/     ← page shells, wrappers, containers
/lib/utils.ts           ← cn() utility — required by every component
/app/                   ← Next.js App Router pages and routes
/styles/                ← global CSS, CSS variables, Tailwind config
/tasks/todo.md          ← active task plan with checkable items
/tasks/lessons.md       ← self-improvement log — read at session start
/tasks/project.md       ← persistent project context — read at EVERY session start
```

## Hard Rules — Never Break These
- Always check `COMPONENTS.md` before building anything new
- Copy component code exactly as specified — never rewrite unless asked
- Install all npm dependencies listed per component before using it
- Never use `<form>` HTML elements — use `onSubmit` on `<div>` or React state
- Never use `localStorage` or `sessionStorage`
- Never use `Inter`, `Roboto`, `Arial`, or system fonts
- Never use purple gradients on white backgrounds
- Never add drop shadows to text
- Never use more than 2 font families per project
- `border-radius` max 8px unless component explicitly uses more
- Icons: lucide-react only

## Starting a New Client Project — Checklist
1. Read `DESIGN_SYSTEM.md` fully
2. Identify the client type (SaaS, agency, e-commerce, portfolio, etc.)
3. Pick the correct aesthetic mode from `DESIGN_SYSTEM.md`
4. Read `COMPONENTS.md` and select which components apply to this project
5. Set up shadcn: `npx shadcn@latest init`
6. Install shared deps: `npm install motion lucide-react clsx tailwind-merge class-variance-authority`
7. Copy chosen component files to `/components/ui`
8. Install component-specific deps as listed in `COMPONENTS.md`
9. Build blocks in `/components/blocks` by composing from `/components/ui`
10. Create `tasks/todo.md` and `tasks/lessons.md` at project root
11. Create `tasks/project.md` with full project context — see template below

**`tasks/project.md` template (create at project start, keep updated):**
```markdown
# Project Context — [Client Name]

## What We're Building
<!-- One paragraph: what is this site, who is it for, what's the goal -->

## Tech Stack
<!-- Any project-specific deviations from the agency default stack -->

## Design Direction
<!-- Which aesthetic mode, key colors, fonts, any client-specific constraints -->

## Current Status
<!-- What has been built, what works, what's in progress -->

## Open Issues
<!-- Known bugs, unresolved decisions, blockers -->

## Key Decisions Made
<!-- Architectural or design decisions already agreed with the client — don't revisit these -->

## Next Steps
<!-- What needs to happen next, in order -->
```

## Quality Bar
Every page built by this agency should feel like it could appear on awwwards.com.
The client is paying for perceived quality — spacing, motion timing, and typographic
hierarchy are as important as functionality. Never ship something that looks like a template.