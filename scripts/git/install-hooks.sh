#!/usr/bin/env bash
# Symlink repo pre-commit guard into .git/hooks (run once per clone).
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
HOOK_SRC="${ROOT}/scripts/git/pre-commit-blocklist.sh"
HOOK_DST="${ROOT}/.git/hooks/pre-commit"

if [[ ! -f "$HOOK_SRC" ]]; then
  echo "install-hooks: missing ${HOOK_SRC}" >&2
  exit 1
fi

chmod +x "$HOOK_SRC"
mkdir -p "${ROOT}/.git/hooks"
ln -sf "$HOOK_SRC" "$HOOK_DST"
echo "Installed pre-commit hook -> ${HOOK_DST}"
