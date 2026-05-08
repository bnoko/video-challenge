# Content Generation Prompts

This folder contains briefing documents for generating prompt content for the Video Challenge app.
Each file is a self-contained brief — share it with Codex (or ChatGPT) and it will generate content
autonomously in batches, writing directly to the corresponding file in `data/`.

## Files

| Brief | Data file | Current | Target |
|---|---|---|---|
| `1-articulation.md` | `data/articulation.json` | 16 | 150 |
| `2-topics.md` | `data/topics.json` | 104 | 300 |
| `3-plots.md` | `data/plots.json` | 40 | 150 |
| `4-self-knowledge.md` | `data/self_knowledge.json` | 33 | 120 |
| `5-interview-questions.md` | `data/interview_questions.json` | 30 | 120 |

## How to use with Codex

1. Give Codex access to this repository folder
2. Share the relevant brief file (e.g. `content-prompts/1-articulation.md`) as the prompt
3. Codex will read the existing data file, generate in batches, and write back autonomously
4. No manual batching needed — each brief manages its own loop until the target is reached

Run them one at a time. Articulation takes longest (passages are ~100 words each).
