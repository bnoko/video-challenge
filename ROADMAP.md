# Video Challenge App — Roadmap

> Last updated: May 2026 (session 2).
> Single file: `challenge.html`. Live: https://bnoko.github.io/video-challenge/challenge.html

---

## 1. Recording tools ← do these first

- [ ] **Take counter / intro text** — pencil icon on challenge intro screen; user types any text with `[n]` auto-increment counters (e.g. `Day 3, take [4]`); includes a one-tap template link below the input showing the default format so it's easy to reset to; `[n]` increments on "Do it again"; persists in localStorage per challenge; discreet on-screen position (personal cue, not viewer content)
- [ ] **Interface visibility toggle** — persistent subtle icon bottom-right (thumb-reachable; typically hidden by Instagram/TikTok UI anyway); tap = instant hide all UI, pauses active timer; swipe from that icon = slide-left animation, all elements sweep off-screen left; tap anywhere to restore. Same icon handles both gestures — detected by horizontal movement distance on touchend.

---

## 2. Challenge rebuilds

For any challenge receiving frameworks: **build fresh using Gratitude as the template**, mining existing prompt content as needed. Don't retrofit.

Art2 is done (shipped). Plot and Tongue Twister: **delete both**. Plot becomes a prompt type inside Storytelling; Tongue Twister is superseded by Articulation.

---

### Parallel mode post-challenge — standard pattern

The `completion-timed` post-challenge type (already used by Person/Place/Feeling) is the standard for all parallel frameworks. Behaviour:

- **One-tap only** — once tapped, an element cannot be untapped
- **Auto-complete** — when all elements are tapped, challenge ends immediately (same as → on the last sequential step)
- **Times-up display** — elements shown **in the order the user tapped them**, not the defined order. Tapped items show a tick + duration spent on that slot. Untapped items shown last, in red with a cross and no time.
- **Duration** = time between consecutive taps (or between last tap and challenge end). Not absolute elapsed time — the actual seconds spent on each part.

Two changes needed on Person/Place/Feeling before building any new parallel frameworks:
1. Render in tap order (currently renders in defined order)
2. Show duration per slot (currently shows absolute elapsed time)

---

### Random Topic

**Prompt format change needed before frameworks land:** update the launch path so the topic is wrapped in an action sentence — `"Talk about [topic]."` — rather than rendered as raw large text. This makes it consistent with all other challenges and lets it flow naturally into `getIntroDesc()` ("You'll get 60 seconds to talk about cucumbers.") and `getPrepDesc()` ("Prep time for talking about cucumbers."). The `promptText` field in the framework config should use the same sentence shape.

| Framework | Mode | Post-challenge |
|---|---|---|
| Rule of Three | Parallel — Point 1, Point 2, Point 3 | Completion-timed cards in tap order |
| Opinion + Justify | Parallel — 2 boxes, visually sized ~¼ Opinion / ~¾ Justify | Completion-timed cards in tap order |
| PREP | Sequential — Point → Reason → Example → Point (callback) | Time distribution bar, 4 segments |
| Specific Detail | Counter — tap each time you land a specific detail | Count result |

**Challenge zone:** Clarity ⭐ + Confidence ⭐

---

### Storytelling

**Merged rebuild.** Retire Storytelling (3 words) and Story Plot as separate challenges. One "Storytelling" challenge with two independent selectors on the intro screen: a **prompt type pill** and a **framework pill**. Any prompt type can combine with any framework.

Default pill text: "Add prompt type" (matches "Add framework" styling — unselected state).

| Prompt type | Description |
|---|---|
| *(none)* | No constraint — just tell a story |
| 3 random words | Current Storytelling behaviour |
| Basic plot | Current Story Plot behaviour |
| *(more later)* | |

| Framework | Mode | Post-challenge |
|---|---|---|
| Character Arc | Sequential — 8 steps: Introduce character + 3 details / Fatal flaw / Everyday situation / Make it exceptional / Introduce danger / Heighten peril / Use flaw to resolve / Moral | Time distribution, 8 segments |
| Pixar Story Spine | Sequential — 7 beats: Once upon a time / Every day / Until one day / Because of that (×2) / Until finally / Ever since then | Time distribution, 7 segments |

*Carousel mode abandoned — sequential numbered list (collapse on advance) is the right fit.*

**Three-word display:** the current giant stacked text won't work once frameworks land — the overlay would sit right at face height. As part of this rebuild, significantly reduce the font size and reconsider the layout (words inline or at least much smaller). Whether to also adopt an action-sentence format ("Tell a story including the words X, Y and Z.") is an open decision — settle it at rebuild time. Don't lose the visual character of the words entirely; they read like a constraint, not a sentence.

**Challenge zone:** Challenge ⭐ + Enjoyment ⭐
*(Watch Challenge decrease and Enjoyment increase over time — that's the progress signal.)*

---

### Interview Practice

Review and expand question pool. Prompt type selector (behavioral / situational / competency-based) is a natural future addition — defer for now, do basic rebuild first.

| Framework | Mode | Post-challenge |
|---|---|---|
| STAR Method | Sequential — Situation → Task → Action → Result | Time distribution |
| *(more TBD)* | | |

**Challenge zone:** Relevance ⭐ + Confidence ⭐

---

### Self-Knowledge

Review prompt pool. Frameworks TBD — assess after Interview Practice rebuild. May not need frameworks at all.

**Challenge zone:** Clarity ⭐ + Depth ⭐

---

### Articulation (Art2) — deferred, low urgency

Three changes needed. No prep screen (stays as-is).

1. **Intro screen text:** Change to "You'll get 30 seconds to read the text clearly and effectively." Remove the "tap anywhere on the screen to move to the next line" instruction — it no longer applies.

2. **Active screen — explicit next-line button:** Replace the tap-anywhere-to-advance interaction with a dedicated full-width button below the text (same pattern as Gratitude Blitz counter button). Label TBD — something like "Next line" or just a forward arrow. This resolves the conflict with the visibility toggle's restore tap and makes the interaction consistent with the rest of the app.

3. **Times-up screen:** No changes needed — progress bar and star ratings stay as-is.

**Why explicit button over tap-anywhere:** tap-anywhere is an outlier in the app's interaction model, conflicts with the visibility toggle restore, and would conflict with any future overlay that needs to capture taps. A large dedicated button is easy to hit by feel and consistent with Gratitude Blitz.

---

## 3. Backlog / future ideas

- **Bug — vis toggle swipe flicker:** When swiping left to activate the visibility toggle, UI elements slide left correctly but then briefly flash back to their original position before disappearing. This is distinct from the dark overlay issue (already fixed). Needs investigation — likely a timing issue between the slide-out animation completing and the `ui-hidden` class being applied.
- **Prompt type selectors for Interview Practice** — question categories by type, seniority, or industry. Defer until question pool is more developed.
- **Session summary** — after multiple "Do it again" takes, lightweight end-of-session view showing take count and self-rating patterns over time.
- **More storytelling prompt types / frameworks** — 3-act structure, "start with the ending", scene-based formats, etc.
- **Instagram layout mode** — adjusted element positions to account for in-app overlay areas on the right side.
- **Framework library screen** — browse all frameworks across challenges in one view. Only relevant once framework count grows significantly.

---

## Design decisions log

*Key settled decisions — don't re-litigate these.*

- **Parallel mode is one-tap only.** Toggling off felt unclear; consistency with sequential (advance = permanent) is cleaner.
- **Parallel post-challenge shows tap order, not defined order.** Reflects what the user actually did.
- **All parallel frameworks use completion cards.** Time distribution bar is for sequential only (strict-order steps where time-per-segment is meaningful).
- **Carousel mode abandoned.** Sequential numbered list (collapse on advance) works for storytelling frameworks with many steps.
- **Prompt type and framework are independent dimensions.** Prompt type = what you're responding to. Framework = how you structure it. Storytelling is the first challenge to expose both selectors.
- **Plot and Tongue Twister deleted.** Plot → Storytelling prompt type. Tongue Twister → superseded by Articulation.
- **Prompt fades removed.** Both prep screen fade (`schedulePrepFade`) and active screen word fade (`scheduleWordFade`) are gone. Prompts stay visible for the full duration.
- **Random Topic uses action sentence format.** "Talk about [topic]." — consistent with other challenges, feeds `getIntroDesc`/`getPrepDesc` naturally. Raw large text is gone for this challenge.
- **Three-word display decision deferred to Storytelling rebuild.** Font size + layout must shrink significantly before frameworks can work. Action sentence format ("Tell a story including the words…") is an open question — decide at rebuild time.

---

## Shipped

- [x] Full framework system — `FRAMEWORKS` config, parallel / sequential / counter modes, generic rendering
- [x] Framework selector — pill on intro screen, picker sheet, live intro-desc updates on selection change
- [x] Overlay ownership rule — framework overlay always clears `#prompt-display`; overlap is structurally impossible
- [x] Prompt system — `promptText` as single source of truth; `getIntroDesc()` ("You'll get X seconds to…"), `getPrepDesc()` ("Prep time for [gerund]…"), `toGerund()` helper; `CHALLENGE_DEFAULT_DESCS` + `CHALLENGE_DEFAULT_TIMES` fallbacks
- [x] `disablePrepTime` flag — hides prep toggle for frameworks where prep makes no sense
- [x] Times-up framework zone — time-distribution bar (no emojis in legend), completion-timed cards (emojis kept), counter result sentence
- [x] Times-up challenge zone — star ratings, generic and data-driven via `CHALLENGE_RATINGS`
- [x] Gratitude — Person / Place / Feeling (parallel + completion-timed), What / Why / Impact (sequential + time-distribution), Gratitude Blitz (counter, 30s override)
- [x] Framework design rules documented in CLAUDE.md
- [x] Articulation (Art2) — line-by-line navigation, tap-anywhere to advance (will become explicit button — see roadmap), progress bar + star ratings on times-up; stars bug fixed (curly quotes in SVG innerHTML)
- [x] All base challenges — Random Topic, Storytelling, Story Plot, Self-Knowledge, Interview Practice, Plot, Tongue Twister, Gratitude
- [x] Prep timer — toggle on intro, "Prep time for [gerund phrase]." format on prep screen
- [x] Prompt fades removed — prep screen fade and active screen word fade both gone
- [x] Multi-section help overlay (heading + items format)
- [x] Do It Again / Return to Menu on times-up
- [x] GitHub Pages deployment + deploy.sh
- [x] iOS safe area insets on all bottom-positioned elements
