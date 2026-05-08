# Random Topics — Content Generation Brief

## Context

You are generating conversation topics for a mobile video recording warm-up app.
When a user selects the "Random Topic" challenge, they get one of these items and must speak
about it for 60 seconds on camera. Topics should be accessible, interesting, and work for anyone
regardless of background or profession.

## Your task

Generate new topics and append them to `data/topics.json` (relative to the repository root).
The file is a JSON array of strings. Keep it valid JSON at all times.

## Autonomous workflow

Repeat until the file contains ≥ 300 items:

1. Read `data/topics.json` and count existing items
2. If count ≥ 300, print "✓ Complete — [count] topics total" and stop
3. Generate a batch of 25 new topics (following all rules below)
4. Append the 25 strings to the array in the file
5. Return to step 1

Do not pause or ask for confirmation between batches. Complete all batches in a single run.

## Rules

- Each topic is a short noun phrase or "if…" hypothetical — typically 2–8 words
- Lowercase (e.g. `"the smell of rain"` not `"The Smell of Rain"`)
- Specific and concrete beats vague and abstract — `"escalators"` beats `"transport"`
- Anyone should be able to talk about it for 60 seconds without specialist knowledge
- Avoid politics, religion, anything requiring personal experiences the speaker may not have had
- Avoid anything that could make someone uncomfortable on camera

## Category spread

Each batch of 25 should cover all of these roughly equally (2–3 per category):

| Category | Examples |
|---|---|
| Everyday objects | scissors, bubble wrap, revolving doors |
| Food & drink | avocado, hot sauce, the perfect sandwich |
| Animals | octopuses, pigeons, axolotls |
| Places & spaces | car parks, rooftops, the deep ocean |
| Activities | karaoke, people watching, daydreaming |
| Modern life | autocorrect fails, going viral, password fatigue |
| Abstract concepts | luck, boredom, first impressions |
| Hypotheticals | if you could fly, a world without sleep |
| Quirky / fun | why queuing exists, the smell of rain, things that are weirdly satisfying |
| Human behaviour | procrastination, nostalgia, coincidences |

## What already exists

Before generating, read `data/topics.json` and avoid duplicating anything already there.
Also avoid near-duplicates (e.g. don't add `"motorbikes"` if `"bicycles"` already exists).
