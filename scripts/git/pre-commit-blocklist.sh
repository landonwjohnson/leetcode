#!/usr/bin/env bash
# Reject commits that stage dependencies, build output, macOS cruft, or huge blobs.
# Compatible with Bash 3.2 (macOS).
set -euo pipefail

MAX_BYTES=$((10 * 1024 * 1024)) # 10 MiB (GitHub hard limit is 100 MiB per file)

blocked_in_path() {
  local f="$1"
  if [[ "$f" == *"/node_modules/"* || "$f" == "node_modules/"* ]]; then
    return 0
  fi
  if [[ "$f" == *"/site/.next/"* || "$f" == "site/.next/"* ]]; then
    return 0
  fi
  if [[ "$f" == *"/site/out/"* || "$f" == "site/out/"* ]]; then
    return 0
  fi
  case "${f##*/}" in
    .DS_Store) return 0 ;;
  esac
  return 1
}

exit_block() {
  echo "pre-commit-blocklist: $*" >&2
  exit 1
}

if git diff --cached --quiet; then
  exit 0
fi

while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  if blocked_in_path "$f"; then
    exit_block "blocked path staged — remove from index: $f"
  fi
done < <(git diff --cached --name-only --diff-filter=ACMRT)

while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  hash=$(git rev-parse -q --verify ":$f" 2>/dev/null) || continue
  if [[ $(git cat-file -t "$hash" 2>/dev/null) != blob ]]; then
    continue
  fi
  size=$(git cat-file -s "$hash")
  if [[ "$size" -gt "$MAX_BYTES" ]]; then
    exit_block "staged blob too large (${size} bytes > ${MAX_BYTES}): $f"
  fi
done < <(git diff --cached --name-only --diff-filter=ACMRT)

exit 0
