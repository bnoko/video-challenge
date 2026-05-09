#!/bin/bash
# Run this any time you want to publish updates to your phone.
# Usage: just double-click or run in Terminal.

set -e

cd "$(dirname "$0")"
node scripts/sync_embedded_content.js
git add challenge.html data/*.json scripts/sync_embedded_content.js HOWTO.md deploy.sh
git commit -m "Update challenge app" 2>/dev/null || echo "(nothing new to commit)"
git push
echo ""
echo "✓ Live — refresh on your phone!"
echo ""
