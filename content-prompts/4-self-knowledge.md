# Self-Knowledge Prompts — Content Generation Brief

## Context

You are generating reflective prompts for a mobile video recording warm-up app.
When a user selects the "Self-Knowledge" challenge, they get one of these prompts and speak
about it for 60 seconds on camera. The prompts are designed to draw out genuine, personal
reflection — not therapy, but honest and slightly vulnerable.

The existing set draws from two styles: **We're Not Really Strangers** (direct questions)
and **Esther Perel** (sentence starters). Both styles should be represented.

## Your task

Generate new self-knowledge prompts and append them to `data/self_knowledge.json`
(relative to the repository root). The file is a JSON array of strings.
Keep it valid JSON at all times.

## Autonomous workflow

Repeat until the file contains ≥ 120 items:

1. Read `data/self_knowledge.json` and count existing items
2. If count ≥ 120, print "✓ Complete — [count] prompts total" and stop
3. Generate a batch of 25 new prompts (following all rules below)
4. Append the 25 strings to the array in the file
5. Return to step 1

Do not pause or ask for confirmation between batches. Complete all batches in a single run.

## Two formats — mix roughly 50/50 per batch

**Direct questions** (WNRS style):
- Start with "What's…", "When did…", "How do you…", "Why do you…", "Who…"
- Honest and slightly probing without being clinical
- Examples: `"What's the bravest thing you've ever done?"` / `"What do you think people misunderstand about you the most?"`

**Sentence starters** (Esther Perel style):
- An unfinished first-person sentence ending with "…" (ellipsis, not three dots)
- Examples: `"The last time I felt truly alive was…"` / `"What I'm still trying to figure out is…"`

## Theme spread

Each batch should cover a range of themes:

Identity & self-perception | Relationships & connection | Growth & change |
Regret & learning | Pride & achievement | Fear & avoidance |
Desire & ambition | Values & beliefs | Vulnerability | Gratitude & appreciation

## Rules

- Avoid anything requiring a specific life experience the speaker may not have had
  (e.g. don't assume marriage, children, or a particular career)
- Avoid anything too dark or clinical — this is reflection, not therapy
- Keep language warm and accessible — no jargon
- Each prompt should be speakable in under 5 seconds

## What already exists

Before generating, read `data/self_knowledge.json` and avoid duplicating or closely echoing
anything already there.
