# Story Plots — Content Generation Brief

## Context

You are generating story plot premises for a mobile video recording warm-up app.
When a user selects the "Story Plot" challenge, they get one of these premises and must improvise
a 60-second story about it on camera. Premises should be vivid, immediately interesting,
and easy to run with in the moment.

## Your task

Generate new story plot premises and append them to `data/plots.json` (relative to the repository root).
The file is a JSON array of strings. Keep it valid JSON at all times.

## Autonomous workflow

Repeat until the file contains ≥ 150 items:

1. Read `data/plots.json` and count existing items
2. If count ≥ 150, print "✓ Complete — [count] plots total" and stop
3. Generate a batch of 25 new premises (following all rules below)
4. Append the 25 strings to the array in the file
5. Return to step 1

Do not pause or ask for confirmation between batches. Complete all batches in a single run.

## Rules

- One sentence, written in present tense, 10–20 words
- Must have: a clear character or characters, a clear situation, and a hint of tension or twist
- No full stop at the end
- Immediately speakable — someone should be able to start narrating within 2 seconds of reading it
- Avoid horror, graphic violence, or anything requiring specialist knowledge

## Genre spread

Each batch should rotate through genres so the full set is varied:

Adventure / quest | Relationship drama | Comedy | Mystery / thriller |
Sci-fi / fantasy | Historical | Everyday life with a twist | Road trip / journey |
Unlikely friendship | Redemption | Discovery | Career / ambition

## Examples from the existing set

- "A woman goes to fight a dragon, but they become friends"
- "Two strangers are trapped in a lift together — and one of them is hiding a secret"
- "A detective investigates a mysterious crime, only to realise they are the suspect"
- "A chef loses their sense of taste the night before the most important meal of their career"
- "A thief breaks into a house and finds something that makes them rethink everything"

## What already exists

Before generating, read `data/plots.json` and avoid duplicating or closely echoing anything already there.
