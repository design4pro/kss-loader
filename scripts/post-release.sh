#!/usr/bin/env bash

set -e

function log() {
  echo '\033[36m[post-release]\033[0m' "$@"
}

log "Generating and committing changelog"
npm run changelog
git add CHANGELOG.md
git commit -m "docs: Update CHANGELOG.md"
git push

echo ""

log "Done!"


