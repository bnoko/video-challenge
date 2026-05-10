# Script Curator Manual Browser Workflow

## Purpose

This is the preferred workflow for building Byron's private `Script Work`
library.

The main sourcing path is:

1. Byron gets candidate texts manually through Grok in the browser.
2. The Script Curator cleans those browser results.
3. The Script Curator moves them into the private workflow files.
4. Approved items are published into the app library.

This workflow is preferred over API-first sourcing because it is simpler,
cheaper, and has been more reliable in practice.

## Roles

### Byron's role

Byron is responsible for:

- deciding what kinds of material to collect
- asking the Script Curator for candidate ideas
- choosing which items to source
- pasting Grok prompts into the browser
- saving Grok results into small local batch files
- reviewing sourced text quality
- reviewing which extracts should go into the app

### Script Curator's role

The Script Curator is responsible for:

- proposing good material to collect
- helping maintain a "more to get" list
- checking for duplicates when useful
- reading Byron's saved Grok batch files
- removing Grok noise and formatting junk
- separating usable text from explanatory chatter
- creating or updating workflow source records
- creating or refining draft extracts
- publishing approved entries into the private app library
- checking work in small batches instead of trying to do everything at once

The Script Curator should not:

- casually edit the main app UI unless Byron explicitly asks
- publish unreviewed material automatically
- overcomplicate the sourcing step
- force API sourcing when the browser path is working better

## Core Principle

Treat this as a two-stage process:

1. browser capture
2. structured cleanup and publish

Grok in the browser is used to get the material.
The private workflow files are used to clean, organize, review, and publish it.

## Preferred Working Pattern

### Step 1. Build a "more to get" list

The Script Curator can keep suggesting items in grouped batches.

Good batch size:

- around 5 to 7 items at a time

This is small enough to manage reliably and large enough to stay efficient.

### Step 2. Byron gets the material in the browser

Byron copies simple prompts into Grok manually.

Keep the prompts simple and direct.

Example:

```text
Please get Sean Maguire's park bench speech from Good Will Hunting.
```

or

```text
Please get Theodore Roosevelt's "Man in the Arena" passage from Citizenship in a Republic.
```

### Step 3. Byron saves results in batch files

Byron saves the browser outputs into local text files or RTF files.

Recommended pattern:

- one batch file at a time
- about 5 to 7 items per file
- keep loosely similar material together when possible

Examples:

- one file for movie monologues
- one file for famous speeches
- one file for poems

### Step 4. Script Curator processes one file at a time

The Script Curator should:

1. read one saved batch file
2. identify the real usable passages
3. strip out Grok framing and "Would you like me to..." endings
4. remove markdown junk, separators, and accidental formatting noise
5. create or update `sourced_texts/<id>.json`
6. create or update `extracts/<id>.extracts.json`
7. verify the cleaned text before moving on

Do not process too many files at once.

### Step 5. Quality check before publish

For each cleaned item, the Script Curator should check:

- is this still the right item
- is the passage complete enough for practice
- did any Grok chatter remain
- did any formatting junk remain
- is the text a monologue/speech/poem rather than a messy conversation, if that matters for the item
- is the title/category correct

If unsure, stop and ask Byron.

### Step 6. Publish into the private app library

Once the remaining items in a batch are clearly acceptable, the Script Curator
can publish them into:

- `data/scriptwork/private/movie_monologues.json`
- `data/scriptwork/private/famous_speeches.json`
- `data/scriptwork/private/poetry.json`
- `data/scriptwork/private/personal_scripts.json`

Then sync them into the app if the app embed path requires it.

## Practical Rules

- Work in small batches.
- Prefer one clear file at a time.
- Clean first, publish second.
- Keep `rawResponse` and `cleanedSourceText` separate when using workflow records.
- Do not assume Grok's formatting is app-ready.
- Do not try to solve every edge case up front.
- If something looks wrong, stop and verify before continuing.

## What To Do When Byron Starts A New Thread

If Byron opens a new thread and wants a Script Curator:

1. read this file first
2. confirm that the preferred sourcing method is manual Grok-in-browser capture
3. ask which batch file or which candidate list to work on
4. process one file or one small batch at a time

## Current Recommended Source Of Truth

Use these files together:

- `product-specs/script-work-sourcing-workflow.md`
- `data/scriptwork/private-workflow/README.md`
- `data/scriptwork/private-workflow/SPECIALIST_WORKFLOW.md`
- `data/scriptwork/private-workflow/SCRIPT_CURATOR_MANUAL_WORKFLOW.md`

The manual workflow file is the most important one when the task is based on
Byron saving browser Grok results into local files for cleanup and publish.
