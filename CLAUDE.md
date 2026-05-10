# Video Challenge App — Claude Instructions

## Project
Single-file HTML app (`challenge.html`) for video recording warm-up challenges.
No build tools, no dependencies. All changes go in this one file.

## Live URL
https://bnoko.github.io/video-challenge/challenge.html
GitHub repo: https://github.com/bnoko/video-challenge

## Deployment workflow
After making any changes to challenge.html, ALWAYS run this in the bash tool
to stage and commit locally:

```
cd "/sessions/wizardly-pensive-dirac/mnt/Video challenges" && \
rm -f .git/HEAD.lock .git/index.lock 2>/dev/null || true && \
git add challenge.html && \
git commit -m "Update challenge app"
```

Then tell the user: **"Run `deploy.sh` in Terminal to publish."**

The bash sandbox has no outbound internet, so `git push` must be done by the
user from their Mac. `deploy.sh` in the workspace folder handles this.

---

## ⚠️ Implementation checklist — read this before adding any challenge or framework

Every challenge with frameworks must follow this exact pattern. Deviating causes
inconsistent behaviour. Gratitude + Topic are the reference implementations — match
them exactly unless there is a deliberate functional reason to differ, and document why.

### 1. Add to `CHALLENGE_DEFAULT_DESCS`
Every challenge that has frameworks (or a dynamic intro desc) must have an entry:
```js
topic: "Talk about a random topic.",
```
This drives `getIntroDesc()` when no framework is selected, and enables
`updateFrameworkPill()` to automatically update the intro desc when the framework changes.

### 2. Use `getIntroDesc()` in the btn onclick — never a hardcoded string
```js
currentChallenge = 'topic';
document.getElementById('intro-label').textContent = 'Random Topic';
document.getElementById('intro-desc').textContent = getIntroDesc();
```
This ensures the desc stays in sync when the framework pill changes. Also reset any
challenge-specific state here (e.g. `currentTopicSentence = null`).

### 3. Each framework needs a distinct `promptText`
`promptText` must describe the specific task the framework requires — NOT a copy of the
default desc. Changing the framework pill must visibly update the intro desc.
- ✓ `"Share a firm opinion on a random topic, then justify it."`
- ✗ `"Talk about a random topic."` — same as the default, invisible change

### 4. `launchChallenge` — use `prompt-text` CSS class, set `prep-prompt-display`
```js
} else if (currentChallenge === 'topic') {
  // ... pick prompt ...
  const html = `<p class="prompt-text">${promptSentence}</p>`;
  document.getElementById('prompt-label').textContent = '';
  document.getElementById('prompt-display').innerHTML = html;
  timerTotal = currentFramework?.timeOverride || CHALLENGE_DEFAULT_TIMES[currentChallenge];
  if (prepTimeEnabled && !currentFramework?.disablePrepTime) {
    document.getElementById('prep-prompt-label').textContent = '';
    document.getElementById('prep-prompt-display').innerHTML = html;
    showScreen('screen-prep');
    startPrepTimer();
    return;
  }
  startActiveChallenge();
  return;
}
```
Rules:
- Always use `<p class="prompt-text">` — never `word-item`, `plot-text`, or `twister-text`
- Set `prep-prompt-label` (usually `''`) and `prep-prompt-display` — **`prep-screen-desc` does not exist**
- `timerTotal` must use `CHALLENGE_DEFAULT_TIMES[currentChallenge]` with `timeOverride` applied

### 5. Dynamic prompts — use `getEffectivePromptText()` pattern
If the challenge picks a prompt at launch time (like Random Topic picks a topic),
store it in a dedicated variable and return it from `getEffectivePromptText()`:
```js
// At launch: currentTopicSentence = `Talk about ${topic}.`;
function getEffectivePromptText() {
  if (currentChallenge === 'topic' && currentTopicSentence) return currentTopicSentence;
  return currentFramework?.promptText || CHALLENGE_DEFAULT_DESCS[currentChallenge];
}
```
`getIntroDesc()`, `getPrepDesc()`, and all overlay prompt rendering use this function.
Clear the variable in the btn onclick so the intro screen shows the generic desc.

### 6. Framework validation — handled by `setFrameworkPillVisibility()`
`setFrameworkPillVisibility()` already clears `currentFramework` if it doesn't belong
to the current challenge. Don't add manual clears in each btn onclick — it's automatic.

### 7. Post-challenge types by mode
- `parallel` → `completion-timed` (tap order + duration per slot)
- `sequential` → `time-distribution` (time spent on each step)
- `counter` → `counter` (count result with `resultSentence`)

---

## Key architecture (read before editing)
- 9:16 aspect ratio container using `min()` CSS
- CONFIG object at top of JS controls which challenges are enabled/visible
- TIPS object holds help overlay content; supports both flat `items[]` and
  multi-section `sections: [{heading, items}]` format
- Timer uses requestAnimationFrame + performance.now() for accuracy
- `scriptwork` is a manual-finish challenge: no fixed countdown end; user
  finishes the passage and ends the run manually
- Art2 (Articulation) uses line-by-line navigation; explicit next-line button
  is planned but not yet implemented (see ROADMAP)
- Times-up screen: add class `art2-mode` to `#screen-timesup` for the
  articulation scoring layout
- Prompt fades have been removed — prompts stay visible for full duration

## Challenges
| Key           | Display name       | Time | Notes                                    |
|---------------|--------------------|------|------------------------------------------|
| story         | Storytelling       | 60s  | 3 random words                           |
| topic         | Random Topic       | 60s  | frameworks: parallel/sequential/counter  |
| plot          | Story Plot         | 60s  |                                          |
| scriptwork    | Script Work        | 60s  | manual finish; prompt types + focuses    |
| selfknowledge | Self-Knowledge     | 60s  |                                          |
| interview     | (disabled)         | 60s  | CONFIG.interview.enabled=false — parked for now      |
| gratitude     | Gratitude          | 60s  | frameworks: parallel/sequential/counter  |
| articulation  | (disabled)         | 30s  | CONFIG.articulation.enabled=false        |
| articulation2 | (disabled)         | 30s  | CONFIG.articulation2.enabled=false — parked for now  |

## Framework system
Frameworks are optional guided structures layered on top of a challenge.
Defined in `FRAMEWORKS[challengeKey]` — an array of framework objects.

### Framework object shape
```js
{
  id: 'unique-id',
  name: 'Display Name',           // shown in pill + picker
  description: 'Picker text',     // shown in the framework picker only
  promptText: 'Share one thing…', // SINGLE SOURCE OF TRUTH for the prompt —
                                  // flows to intro, prep, and active screens
  mode: 'parallel' | 'sequential' | 'counter' | 'focus',
  disablePrepTime: true,          // optional — hides prep toggle for this framework
  timeOverride: 30,               // optional — overrides challenge default time
  elements: [...],                // for parallel/sequential; each has label, emoji, hint
  buttonLabel: '…',              // counter mode only
  prepButtonLabel: '…',          // counter mode prep preview (optional)
  shortCue: '…',                 // focus mode only; always-visible coaching cue
  guidance: '…',                 // focus mode only; fuller help/prep guidance
  mistakeToAvoid: '…',           // focus mode only; common trap to avoid
  ratingLabel: '…',              // focus mode only; post-challenge self-rating label
  postChallenge: { type: '…' },  // 'time-distribution' | 'completion-timed' | 'counter'
}
```

### Prompt flow — always use getEffectivePromptText() as the source
- **Intro screen**: `getIntroDesc()` → `"You'll get X seconds to [lowercase gerund phrase]."`
  - Time comes from `framework.timeOverride || CHALLENGE_DEFAULT_TIMES[challenge]`
  - `updateFrameworkPill()` calls `getIntroDesc()` whenever framework selection changes
- **Prep screen**: `getPrepDesc()` → `"Prep time for [gerund phrase]."`
  - Uses `toGerund(firstVerb)` — drops silent trailing 'e' then adds '-ing' (share→sharing,
    reflect→reflecting). Exceptions: see→seeing, agree→agreeing, etc.
- **Active screen**: overlay renders `getEffectivePromptText()` as `.fwk-overlay-prompt`
  inside the framework wrap — never via `#prompt-display`

### Overlay ownership rule (prevents all prompt overlap bugs)
When any framework is active, **the overlay owns the content area**:
- `#prompt-display` is always cleared (`innerHTML = ''`)
- The prompt is rendered inside `#framework-active-wrap` as a `.fwk-overlay-prompt` element
- This is structural — prompt length can never cause overlap with framework UI

### Screen-active classes (set/cleared by renderFrameworkOverlay / clearFrameworkOverlay)
- `has-framework` — any framework active
- `has-seq-framework` — sequential mode (overlay starts at 12%)
- `has-counter-framework` — counter mode (overlay starts at 12%)
- `has-parallel-framework` — parallel mode (overlay starts at 12%)
- All four must be in the `classList.remove()` call in `clearFrameworkOverlay()`

### Parallel mode — one-tap-only, auto-complete
- Once tapped, a box cannot be untapped
- When all boxes are tapped, challenge ends immediately (stopTimer → playEnd → showTimesUp)
- Guidance label: `'Tap as you move to each part'`

### Sequential mode UX
- Numbered list; active item is large/bold with inline `→` button; done items collapse
- Arrow button: full white, `font-weight: 700`, larger font, same text-shadow as active text
- Tapping `→` on the last step ends the challenge (calls `stopTimer()` + `showTimesUp()`)
- Header shows "Challenge name: Framework name" above the step list
- If `getEffectivePromptText()` returns a value, it's shown as `.fwk-overlay-prompt`
  between the header and the step list

### Times-up page — emoji rule
- **time-distribution legend**: no emojis (color swatch already identifies the segment)
- **completion-timed cards**: emojis kept (add warmth, no confusion)
- **completion-timed renders in tap order** with duration per slot (gap between
  consecutive taps); untapped items shown last with ✗ and no time

### disablePrepTime flag
Set `disablePrepTime: true` on frameworks where prep time makes no sense (e.g. Gratitude
Blitz counter). `updateFrameworkPill()` hides the prep toggle directly (not via
`setToggleVisibility`, to avoid a circular call through `setFrameworkPillVisibility`).
The launch code also guards: `if (prepTimeEnabled && !currentFramework?.disablePrepTime)`.

### Fallback constants
- `CHALLENGE_DEFAULT_DESCS` — base prompt text per challenge (no framework selected)
- `CHALLENGE_DEFAULT_TIMES` — base time per challenge used by `getIntroDesc()`

## Content workflow

- Authored content now lives in `data/*.json`
- The runtime app still ships as a self-contained `challenge.html`
- Content is synced from `data/*.json` into the embedded arrays in `challenge.html`
  before deploy
- `deploy.sh` handles this sync automatically

## Working setup

Use threads lightly as separate roles:

- **Manager**: planning, sequencing, architecture decisions, prompt-writing, and
  synthesizing outputs from other threads. Prefer keeping implementation work in
  dev threads unless there is a reason to do it directly here.
- **Dev**: straightforward implementation, scoped bug fixes, cleanup, and
  low-risk edits.
- **Senior Dev**: harder debugging, cross-cutting refactors, audits, and tasks
  where cleaner structural judgment matters.
- **QA**: smoke testing, browser verification, regression detection, and clear
  reporting of what passed, failed, or could not be verified.

### Routing guidance

- Use **Dev** for targeted fixes and normal feature work.
- Use **Senior Dev** for more ambiguous or architectural tasks.
- Use **Manager** to decide scope, ordering, and whether a task is worth doing now.
- Bring implementation results back to **Manager** when deciding what to do next.

### QA guidance

- QA should focus first on the area touched by the recent change, then do a
  small sanity pass if appropriate.
- QA should prefer in-browser verification where possible.
- If QA cannot complete the critical interaction path, it must say so clearly.
- Code inspection is fallback evidence, not full UI verification.
- QA should report:
  - what was tested
  - what passed
  - what failed
  - what was unclear
  - what was not checked

### Verification style

- For normal implementation tasks, ask the dev thread to say what should be
  manually verified.
- For broader or riskier changes, use QA as a second pass after implementation.
- Do not over-automate. Keep QA lightweight and focused on repeated smoke checks
  rather than trying to fully replace human judgment.
