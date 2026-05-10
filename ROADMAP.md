# Video Challenge App — Roadmap

> Last updated: May 2026.
> Single file app: `challenge.html`
> Live: https://bnoko.github.io/video-challenge/challenge.html

---

## Now

- **Nothing urgent**
  The app is in a stable enough place to pause and use it.

- **Self-Knowledge review**
  Likely next area to revisit when development resumes. Main questions:
  - does it need frameworks at all?
  - are the current prompts strong enough in practice?
  - would one or two simple structures improve it without making it heavy?

---

## Later

- **Interview Practice** *(currently disabled)*
  Revisit if it becomes personally useful again or if the app expands for other
  users. Re-enable via CONFIG.interview.enabled.

- **More storytelling frameworks / prompt types**
  There is still room for more variety here, but nothing pressing right now.

- **Session summary**
  A lightweight summary after repeated takes could still be useful later.

- **Instagram / creator layout refinements**
  Optional future polish if creator workflows become a bigger focus.

- **Framework library screen**
  Only relevant if framework count grows significantly.

---

## Backlog / ideas to keep in mind

- **Custom duration selector**
  Per-challenge duration picker on the intro screen. Low urgency because
  framework defaults and overrides already cover most needs.

- **Simpler storytelling framework**
  A shorter entry-point framework could still be useful as a future ramp.

- **Prompt type selectors for Interview Practice**
  Potentially useful later, but not important now.

- **Articulation — consider deleting** *(currently disabled)*
  Script Work now covers the core benefit. If Articulation stays unused, remove
  it entirely rather than leaving it parked. Re-enable via
  CONFIG.articulation2.enabled to reassess.

- **Script Curator workflow cleanup**
  The manual browser-Grok sourcing workflow is now the preferred Script Work
  process. If that continues to hold up, later cleanup could remove or simplify
  the optional API-sourcing path and related tech debt in the private pipeline.

---

## Design decisions

These are settled enough that they should not be casually revisited.

- **Single-file architecture is still acceptable**
  `challenge.html` remains a viable structure for the app at its current size.
  Small validation and metadata improvements were enough; no framework migration
  is justified.

- **Parallel mode is one-tap only**
  Once tapped, an item is done. This keeps the interaction clearer and more
  consistent with the rest of the app.

- **Parallel post-challenge reflects what the user actually did**
  Completion-timed cards show tap order rather than defined order.

- **Sequential mode uses time distribution**
  Parallel and sequential frameworks communicate progress differently and should
  keep different result formats.

- **Prompt type and framework are independent**
  Prompt type = what you're responding to. Framework = how you structure it.

- **Prompt fades are gone**
  Prompts remain visible for the full duration.

- **Content authoring lives in `data/*.json`**
  The app runtime still ships as a self-contained HTML file, but authored
  content now syncs into the embedded arrays before deploy.

- **Creator tooling is part of the product direction**
  Interface hiding, take counter, and creator markers are valid app features,
  not hacks to be removed later.

---

## Shipped

- [x] Full framework system — `FRAMEWORKS` config, parallel / sequential /
      counter modes, generic rendering
- [x] Framework selector — intro pill, picker sheet, live intro updates
- [x] Prompt type selector — currently Storytelling only
- [x] Prompt system — `promptText` as source of truth, intro/prep phrasing,
      fallback descriptions and times
- [x] Framework validation — startup checks for framework shape and compatibility
- [x] `CHALLENGES` metadata refactor — centralized challenge-level metadata
- [x] Content sync workflow — `data/*.json` authoring source synced into
      `challenge.html`
- [x] Gratitude frameworks
- [x] Random Topic frameworks, including **Get Specific**
- [x] Storytelling rebuild — prompt types + frameworks merged into one challenge
- [x] Storytelling ratings simplified to a single `Story` rating
- [x] Articulation (Art2) live and usable
- [x] Base challenges — Random Topic, Storytelling, Self-Knowledge, Interview
      Practice, Gratitude, Articulation
- [x] Prep timer
- [x] Times-up ratings and post-challenge framework zones
- [x] Interface hide mode
- [x] Take counter / intro text
- [x] Creator mode markers for recording/editing workflow
- [x] Do It Again / Return to Menu flow
- [x] GitHub Pages deployment + `deploy.sh`
- [x] iOS safe area handling and viewport fixes
- [x] Version display on select screen
- [x] Content generation infrastructure for prompt pools
