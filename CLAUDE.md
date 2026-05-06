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
| gratitude     | Daily Gratitude    | 60s  | "That's time" + Dickens quote|
| articulation  | (disabled)         | 30s  | CONFIG.articulation.enabled=false |
| articulation2 | Articulation       | 30s  | line-by-line, tap to advance |
