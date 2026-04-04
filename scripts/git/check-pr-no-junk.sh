#!/usr/bin/env bash
# Fail if the merge range touches forbidden paths or files >10MiB at HEAD tip.
# Intended for CI: run from repo root with full history (fetch-depth: 0).
set -euo pipefail

MAX_BYTES=$((10 * 1024 * 1024))

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

fail() {
  echo "check-pr-no-junk: $*" >&2
  exit 1
}

BASE_REF="${GITHUB_BASE_REF:-main}"

git fetch -q "origin" "$BASE_REF" || fail "could not fetch origin/${BASE_REF}"

BASE_SHA=$(git merge-base "origin/${BASE_REF}" HEAD) || fail "could not compute merge-base with origin/${BASE_REF}"

while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  if blocked_in_path "$f"; then
    fail "forbidden path in PR diff: $f"
  fi
done < <(git diff --name-only "$BASE_SHA" HEAD)

while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  git rev-parse -q --verify "HEAD:$f" >/dev/null 2>&1 || continue
  hash=$(git rev-parse "HEAD:$f")
  if [[ $(git cat-file -t "$hash") != blob ]]; then
    continue
  fi
  size=$(git cat-file -s "$hash")
  if [[ "$size" -gt "$MAX_BYTES" ]]; then
    fail "file at HEAD exceeds ${MAX_BYTES} bytes: $f (${size})"
  fi
done < <(git diff --name-only "$BASE_SHA" HEAD)

echo "check-pr-no-junk: ok (range ${BASE_SHA:0:7}..HEAD)"
