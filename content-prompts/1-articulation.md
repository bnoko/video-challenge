# Articulation Passages — Content Generation Brief

## Context

You are generating articulation practice passages for a mobile video recording warm-up app.
Users read these passages aloud as a speaking warm-up before recording. The passages are designed
to challenge articulation by being dense with specific sounds or consonant clusters.

## Your task

Generate new articulation passages and append them to `data/articulation.json` (relative to the
repository root). The file is a JSON array of objects. Keep it valid JSON at all times.

## Autonomous workflow

Repeat until the file contains ≥ 150 items:

1. Read `data/articulation.json` and count existing items
2. If count ≥ 150, print "✓ Complete — [count] passages total" and stop
3. Generate a batch of 10 new passages (following all rules below)
4. Append the 10 items to the array in the file
5. Return to step 1

Do not pause or ask for confirmation between batches. Complete all batches in a single run.

## Seed words (choose fresh ones for each passage)

Before writing each passage, silently choose three seed words:
- 1 concrete noun (a physical object, animal, place, or person)
- 1 dynamic verb (something physical or active — not just "walk" or "run")
- 1 sensory adjective (something you can see, hear, feel, taste, or smell)

Use these as creative inspiration for the scene, character, or setting of the passage.
The words don't need to appear literally in the text — they're just creative ignition.
New seeds for every passage are what guarantee variety across a large set.

## Sound focus

Every passage must be built around one primary sound focus. Rotate through these so each batch
covers a spread, and the full set covers all of them roughly equally:

| Focus | Examples of the target sounds |
|---|---|
| S / SH / SL | hiss, flash, slide, slash |
| P / B / BL / PL | pop, burst, blend, plunge |
| TH / TR / DR | through, thread, drive, drift |
| R / L | roll, lurch, reel, lull |
| K / G / CL / GL | crack, grip, clatter, glide |
| CH / J | crunch, jolt, charge, jab |
| W / V | wave, vault, weave, vivid |
| F / V | flare, fade, vault, vivid |
| M / N | hum, murmur, kneel, narrow |
| ST / SP / SK | sting, sprawl, skull, steep |
| STR | stride, stream, stretch, strong |
| Mixed | blend two or three focus categories |

## Style

- **Tongue-twister density is welcome and encouraged for some passages** — rich, relentless
  repetition of the target sound is part of the fun (see Shell Sorter example below)
- Other passages can be more narrative and natural — the sound should feel woven in, not
  forced (see Rory's Ridge and The Music Machine examples below)
- Aim for variety across the batch: some tongue-twister dense, some more story-driven
- Vivid scenes, interesting characters, and unexpected settings work best
- Varied sentence lengths: mix short punchy lines with longer flowing ones
- Natural spoken English — not poetic, not written prose, not a list

## Length

Each passage should be approximately 100–120 words. Calibrate from the examples below.

## Output format

Each item must be a JSON object in this exact shape:

```json
{ "name": "Short Title", "text": "Full passage text here." }
```

The `name` is a short 2–4 word title. The `text` is the full passage, no newlines inside the string.

---

## Examples

Use these to calibrate tone, density, length, and style.

**Shell Sorter** *(S / SH / SL — tongue-twister style)*
> Sally swiftly sorted several slippery, slanted shells along the sunlit seashore, selecting
> specific shells she suspected were smoother, shinier, and slightly more suitable for stacking.
> She silently shuffled smaller shells beside larger shells, sliding sandy shells across slick
> stone surfaces, while shallow seawater surged softly, splashing and spraying scattered specks
> of salt across her steadily shifting setup. She struggled slightly, since several shells slipped
> suddenly, spinning sideways and scattering small shards across the sloping shore. Still, Sally
> stubbornly sustained her sorting, stacking, sliding, and reshuffling sequence, seeking some
> sense of structured symmetry among the scattered shells she'd so selectively secured.

**Rory's Ridge** *(R / L — narrative style)*
> Rory relentlessly rolled along the rugged rural road, rapidly realigning his rhythm while
> repeatedly rebalancing long, rolling strides against loose, irregular ridges. He leaned left,
> then right, recalibrating leg rotation, lowering resistance while lifting his relaxed but
> resilient frame through relentless repetition. Along the route, rolling lorries rattled loudly,
> releasing lingering roars that reverberated across lowland ridges, while Rory remained locked
> into a layered, rolling rhythm, rarely relinquishing control. Still, his breathing grew laboured,
> and his legs reluctantly resisted longer rotations, yet Rory resolutely reasserted control,
> re-lengthening each stride, re-leveling his line, and relentlessly reclaiming the resilient,
> rolling cadence he relied on.

**The Music Machine** *(M / N — character-focused)*
> Millicent methodically managed multiple moving mechanisms within her meticulously maintained
> mechanical music machine, monitoring minute movements while making necessary modifications.
> Meanwhile, Meredith maintained minimal noise, managing murmuring museum members milling nearby,
> many noting the machine's mesmerising motion. Millicent's mind moved nonstop, measuring,
> matching, and modifying minor misalignments, ensuring no mechanism malfunctioned mid-melody.
> Nearing completion, she made one more minute modification, then nodded modestly as the machine
> moved smoothly, producing a mellow, mesmerising melody that moved many members into momentary,
> meaningful silence.
