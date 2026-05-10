# Script Work Private Sourcing Specialist Workflow

## Role

The specialist helps maintain Byron's private `Script Work` source pipeline.
The role is not to change the app UI. It moves items through the file-based
workflow from candidate idea to approved private excerpt.

## Files Touched

- `data/scriptwork/private-workflow/sourcing_index.csv`
- `data/scriptwork/private-workflow/sourced_texts/<id>.json`
- `data/scriptwork/private-workflow/extracts/<id>.extracts.json`
- `data/scriptwork/private/<category>.json` only through the publish command

Do not edit `data/scriptwork/public/*` for private sourcing work.
Do not edit `challenge.html` for this workflow unless the user explicitly asks
for app integration.

## Normal Workflow

1. Propose or receive a candidate item.
2. Check for duplicates:

```bash
node scripts/scriptwork_private_pipeline.js check-duplicates \
  --category famous_speeches \
  --title "Gettysburg Address" \
  --author "Abraham Lincoln" \
  --source-context "full address"
```

3. Add the chosen item to the index:

```bash
node scripts/scriptwork_private_pipeline.js add \
  --id gettysburg-address \
  --category famous_speeches \
  --source-type speech \
  --title "Gettysburg Address" \
  --author "Abraham Lincoln" \
  --source-context "full address" \
  --priority high
```

4. Create or source the source record:

```bash
node scripts/scriptwork_private_pipeline.js make-source --id gettysburg-address
node scripts/scriptwork_private_pipeline.js source-grok --id gettysburg-address
```

5. Human checkpoint: Byron reviews `sourced_texts/<id>.json`.
   Byron may approve the source, edit `cleanedSourceText`, request retry, defer,
   or reject the item.

6. Create an extract draft:

```bash
node scripts/scriptwork_private_pipeline.js make-extracts --id gettysburg-address
```

7. Draft 1 to 3 candidate excerpts in `extracts/<id>.extracts.json`.
   Fill `text`, `label`, `lengthWords`, `lengthSeconds`, `tags`, `tone`,
   `performanceFocus`, `difficulty`, and `notes`.

For this workflow, the sourced text may already be a usable excerpt rather than
the entire original work. That is acceptable if it is strong, clearly labeled,
and good enough for practice.

8. Human checkpoint: Byron reviews the extracts.
   Only approved excerpts should have `"status": "approved"`.

9. Publish approved extracts:

```bash
node scripts/scriptwork_private_pipeline.js publish
```

10. Confirm status:

```bash
node scripts/scriptwork_private_pipeline.js list
```

## Grok API Configuration

Preferred setup: use a local untracked `.env.local` file in the repo root.
Never commit API keys.

```dotenv
XAI_API_KEY="your_xai_api_key"
XAI_MODEL="grok-4.20"
XAI_BASE_URL="https://api.x.ai/v1"
```

The pipeline reads `.env.local` automatically. If the same variables are
already set in the shell, the shell values take priority.

Before sourcing a specific item, run:

```bash
node scripts/scriptwork_private_pipeline.js check-grok
```

Use that as the first diagnostic step when Grok seems unavailable.

Use `--dry-run` before sourcing if you want to inspect the prompt:

```bash
node scripts/scriptwork_private_pipeline.js source-grok --id gettysburg-address --dry-run
```

Use `--force` to retry and replace a prior automated response:

```bash
node scripts/scriptwork_private_pipeline.js source-grok --id gettysburg-address --force
```

The pipeline automatically retries transient network and timeout failures. If a
request still fails, review `lastError` in the source record for the reason.

The Grok request itself should stay simple. The pipeline now treats Grok more
like a normal chat source request, then saves the raw reply and extracts the
usable passage into the JSON record locally.

`source-grok` now uses xAI web search by default so the API path behaves more
like browser Grok. You can disable that fallback behavior locally by setting
`XAI_USE_WEB_SEARCH=false`.

## Approval Rules

- Do not publish directly from sourced text.
- Do not approve extracts without Byron's review.
- Keep `rawResponse` and `cleanedSourceText` separate.
- Publish only approved extracts.
- Preserve failed/retried records for traceability.

Fallback behavior:

- if `.env.local` is missing, normal non-Grok workflow commands still work
- `source-grok` can still use shell-provided variables
- if no `XAI_API_KEY` is available from either source, `source-grok` stops with a clear error

## Copyright / Authorization Boundary

Automated Grok sourcing should request full text only for public-domain,
user-owned, or otherwise authorized material. For copyrighted monologues,
lyrics, poems, or scripts that are not safely reproducible, keep the source
record as a manual checkpoint and let Byron provide lawful text manually.

## Done Criteria

An item is complete when:

- the index row exists
- the source record has reviewed source text or clear rejection/defer notes
- one or more extract drafts have been reviewed
- approved extracts are published into `data/scriptwork/private/<category>.json`
- `sourcing_index.csv` shows `publish_status` as `published`
