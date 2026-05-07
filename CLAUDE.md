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

## Key architecture (read before editing)
- 9:16 aspect ratio container using `min()` CSS
- CONFIG object at top of JS controls which challenges are enabled/visible
- TIPS object holds help overlay content; supports both flat `items[]` and
  multi-section `sections: [{heading, items}]` format
- Timer uses requestAnimationFrame + performance.now() for accuracy
- Art2 (Articulation) uses scroll-based line navigation; tap anywhere on
  active screen advances one line
- `schedulePrepFade()` / `clearPrepFade()` and `scheduleWordFade()` /
  `cancelWordFade()` handle prompt fade-outs
- Times-up screen: add class `art2-mode` to `#screen-timesup` for the
  articulation scoring layout

## Challenges
| Key           | Display name       | Time | Notes                        |
|---------------|--------------------|------|------------------------------|
| story         | Storytelling       | 60s  | 3 random words, fade after 3s|
| tongue        | Tongue Twister     | 30s  | reroll ✓                     |
| topic         | Random Topic       | 60s  |                              |
| plot          | Story Plot         | 60s  |                              |
| selfknowledge | Self-Knowledge     | 60s  | prompt fades after 3s        |
| interview     | Interview Practice | 60s  |                              |
| gratitude     | Daily Gratitude    | 60s  | frameworks: parallel/sequential/counter |
| articulation  | (disabled)         | 30s  | CONFIG.articulation.enabled=false |
| articulation2 | Articulation       | 30s  | line-by-line, tap to advance |

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
  mode: 'parallel' | 'sequential' | 'counter',
  disablePrepTime: true,          // optional — hides prep toggle for this framework
  timeOverride: 30,               // optional — overrides challenge default time
  elements: [...],                // for parallel/sequential; each has label, emoji, hint
  buttonLabel: '…',              // counter mode only
  prepButtonLabel: '…',          // counter mode prep preview (optional)
  postChallenge: { type: '…' },  // 'time-distribution' | 'completion-timed' | 'counter'
}
```

### Prompt flow — always use promptText as the source
- **Intro screen**: `getIntroDesc()` → `"You'll get X seconds to [lowercase gerund phrase]."`
  - Time comes from `framework.timeOverride || CHALLENGE_DEFAULT_TIMES[challenge]`
  - `updateFrameworkPill()` calls `getIntroDesc()` whenever framework selection changes
- **Prep screen**: `getPrepDesc()` → `"Prep time for [gerund phrase]."`
  - Uses `toGerund(firstVerb)` — drops silent trailing 'e' then adds '-ing' (share→sharing,
    reflect→reflecting). Exceptions: see→seeing, agree→agreeing, etc.
- **Active screen**: overlay renders `promptText` directly as `.fwk-overlay-prompt` inside
  the framework wrap — never via `#prompt-display`

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

### Sequential mode UX
- Numbered list; active item is large/bold with inline `→` button; done items collapse
- Arrow button: full white, `font-weight: 700`, larger font, same text-shadow as active text
- Tapping `→` on the last step ends the challenge (calls `stopTimer()` + `showTimesUp()`)

### Times-up page — emoji rule
- **time-distribution legend**: no emojis (color swatch already identifies the segment)
- **completion / completion-timed cards**: emojis kept (add warmth, no confusion)

### disablePrepTime flag
Set `disablePrepTime: true` on frameworks where prep time makes no sense (e.g. Gratitude
Blitz counter). `updateFrameworkPill()` hides the prep toggle directly (not via
`setToggleVisibility`, to avoid a circular call through `setFrameworkPillVisibility`).
The launch code also guards: `if (prepTimeEnabled && !currentFramework?.disablePrepTime)`.

### Fallback constants
- `CHALLENGE_DEFAULT_DESCS` — base prompt text per challenge (no framework selected)
- `CHALLENGE_DEFAULT_TIMES` — base time per challenge used by `getIntroDesc()`
