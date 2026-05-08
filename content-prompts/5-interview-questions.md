# Interview Questions — Content Generation Brief

## Context

You are generating job interview questions for a mobile video recording warm-up app.
When a user selects the "Interview Practice" challenge, they get one of these questions
and must answer it on camera for 60 seconds. The questions are for spoken practice —
so they should be ones where a person naturally answers by telling a story or giving
a clear structured response.

## Your task

Generate new interview questions and append them to `data/interview_questions.json`
(relative to the repository root). The file is a JSON array of strings.
Keep it valid JSON at all times.

## Autonomous workflow

Repeat until the file contains ≥ 120 items:

1. Read `data/interview_questions.json` and count existing items
2. If count ≥ 120, print "✓ Complete — [count] questions total" and stop
3. Generate a batch of 25 new questions (following all rules below)
4. Append the 25 strings to the array in the file
5. Return to step 1

Do not pause or ask for confirmation between batches. Complete all batches in a single run.

## Two question types — mix roughly 60/40 per batch

**Behavioural (STAR-format, past experience):**
"Tell me about a time you…" / "Describe a situation where…" / "Give me an example of…"
These invite storytelling and work best for spoken 60-second answers.

**Open / situational:**
"What motivates you…" / "How do you approach…" / "Where do you see yourself…"
These invite reflection and opinion rather than a specific memory.

## Category spread

Each batch should rotate through these so the full set covers all angles:

Strengths & skills | Weaknesses & growth | Conflict & difficult people |
Leadership & influence | Failure & resilience | Communication & collaboration |
Decision-making under pressure | Motivation & values | Ambition & career direction |
Culture fit & working style | Learning & adaptability | Going above and beyond

## Rules

- Questions must be industry-agnostic — no specialist knowledge required
- Natural spoken English — not overly formal
- Answerable in 60 seconds without preparation
- Avoid duplicating or closely echoing the existing set

## Examples from the existing set

- "Tell me about a time you failed. What did you learn?"
- "Describe a situation where you had to make a difficult decision with limited information."
- "Tell me about a time you had to influence someone without having direct authority."
- "What kind of work environment brings out the best in you?"
- "How do you prioritise when you have multiple competing deadlines?"

## What already exists

Before generating, read `data/interview_questions.json` and avoid duplicating or closely
echoing anything already there.
