# Script Work Private Workflow

File-based working area for building Byron's private `Script Work` library.

This folder is intentionally separate from `data/scriptwork/private/`, which is
the publish-only app library. Drafts, sourced text, raw responses, rejected
items, and review notes belong here.

Preferred real-world workflow:

- Byron gets texts manually in browser Grok
- Byron saves those outputs in small local batch files
- the Script Curator cleans those files and imports the usable passages here

## Files

- `sourcing_index.csv` is the editable dashboard.
- `sourced_texts/*.json` stores one full source record per index row.
- `extracts/*.extracts.json` stores candidate practice excerpts per source.

## Commands

Run from the repo root:

```bash
node scripts/scriptwork_private_pipeline.js init
node scripts/scriptwork_private_pipeline.js check-grok
node scripts/scriptwork_private_pipeline.js add --id gettysburg-address --category famous_speeches --source-type speech --title "Gettysburg Address" --author "Abraham Lincoln" --source-context "full address" --priority high
node scripts/scriptwork_private_pipeline.js make-source --id gettysburg-address
node scripts/scriptwork_private_pipeline.js source-grok --id gettysburg-address
node scripts/scriptwork_private_pipeline.js make-extracts --id gettysburg-address
node scripts/scriptwork_private_pipeline.js sync-status
node scripts/scriptwork_private_pipeline.js publish
```

## Grok Sourcing

The API path still exists, but it is optional support.
It is not required if Byron is getting better results by using Grok in the
browser and saving the outputs locally.

Preferred setup: create an untracked `.env.local` file in the repo root:

```dotenv
XAI_API_KEY="your_xai_api_key"
XAI_MODEL="grok-4.20"
XAI_BASE_URL="https://api.x.ai/v1"
```

The pipeline automatically reads `.env.local` when it starts. If the same
variables are already set in your shell, the shell values take priority.

Before sourcing an item, use:

```bash
node scripts/scriptwork_private_pipeline.js check-grok
```

That gives a fast yes/no check for config plus outbound API access.

Use `source-grok` for one source item at a time:

```bash
node scripts/scriptwork_private_pipeline.js source-grok --id gettysburg-address
```

`source-grok` now uses xAI Responses API with `web_search` by default. This is
meant to behave more like Grok in the browser instead of relying only on model
memory. If you ever want the older memory-only behavior, set
`XAI_USE_WEB_SEARCH=false` locally before running the command.

Useful retry options:

```bash
node scripts/scriptwork_private_pipeline.js source-grok --id gettysburg-address --force
node scripts/scriptwork_private_pipeline.js source-grok --id gettysburg-address --dry-run
```

The command stores:

- `promptUsed`
- `rawResponse`
- `cleanedSourceText`
- `sourceNotes`
- `sourceStatus`
- retry errors in `lastError`
- `grokSourcesUsed` when web search is enabled

`source-grok` now uses a plain-language Grok request and then normalizes the
reply into the source record locally. `cleanedSourceText` can be either a full
text or a usable excerpt. For private practice purposes, a strong excerpt is
acceptable.

If Grok replies in a chat-style format instead of strict JSON, the pipeline will
try to extract the usable passage automatically from the response.

The automation does not publish anything and does not mark extracts approved.
Human review is still required.

If `.env.local` is missing, non-Grok commands still work normally. `source-grok`
will only fail if `XAI_API_KEY` is unavailable from both `.env.local` and the
shell environment.

`source-grok` also retries transient failures automatically. If it still fails,
inspect `lastError` in the relevant `sourced_texts/<id>.json` file.

The current workflow is intentionally forgiving. If Grok can confidently provide
a useful passage from retrieval or memory, that is acceptable for this private
practice library as long as the result reads cleanly and you approve it.

## Human Checkpoints

1. After `make-source` or `source-grok`, review the sourced text in `sourced_texts/<id>.json`.
2. After `make-extracts`, edit candidate extracts and mark only approved items with `"status": "approved"`.
3. Run `publish` to write only approved excerpts into `data/scriptwork/private/*.json`.
