# LeetCode Repo (Multi-Language)

This repo provides LeetCode **problems**, **solutions**, and **examples of how LeetCode-style code can be used in real-life situations**.

It is organized for multiple languages (not just Swift), so each problem can be solved side-by-side in the languages you want to use.

## Repository Structure

```text
problems/
  <problem-slug>/
    prompt.md
    swift/solution.swift
    python/solution.py
    javascript/solution.js
    c++/solution.cc
scripts/
  run.sh
```

- Each problem has its own folder under `problems/`.
- Each language has its own solution file.
- Add only the language folders you want for each problem.

## Quick Start

Create a new problem folder:

```bash
mkdir -p problems/valid-parentheses/{swift,python,javascript,c++}
```

Run a solution:

```bash
./scripts/run.sh two-sum swift
./scripts/run.sh two-sum python
./scripts/run.sh two-sum javascript
```

Run tests for a problem:

```bash
./scripts/test.sh concatenation-of-array
```

## SEO Docs Website

A Next.js + Nextra website is available under `site/` and is generated from the canonical `problems/` folder.

### Git: avoid committing dependencies and build output

Do not commit `node_modules/`, `site/.next/`, `site/out/`, or other generated artifacts. The root [`.gitignore`](.gitignore) ignores them; prefer `git add <paths>` or `git add -p` instead of blind `git add -A` from the repo root.

Install the shared pre-commit guard once per clone (blocks staging those paths and any file larger than 10 MiB):

```bash
./scripts/git/install-hooks.sh
```

CI runs [`.github/workflows/no-junk-in-diff.yml`](.github/workflows/no-junk-in-diff.yml) on pull requests for the same checks.

From the repository root:

```bash
cd site
npm install
npm run generate-content
npm run dev
```

By default the docs site runs at `http://127.0.0.1:3005` to avoid local port/watcher issues.
If you specifically want port 3000, run `npm run dev:3000`.

Useful commands in `site/`:

- `npm run build` - Generate content and build the production website.
- `npm run validate-seo` - Validate metadata, canonical wiring, and crawl route coverage.
- `npm test` - Run content-shape tests for generated problem pages.
- `npm run dev:3000` - Start local dev server on `127.0.0.1:3000`.

GitHub Pages SEO env vars:

- `NEXT_PUBLIC_SITE_ORIGIN` (example: `https://yourname.github.io`)
- `NEXT_PUBLIC_REPO_NAME` (example: `LeetCodeSwift`)
- Optional: `NEXT_PUBLIC_BASE_PATH` (defaults to `/<repo-name>`)

The website includes:

- SEO routes for each problem (`/problems/<slug>`).
- Language and tag index pages for discovery.
- Interactive examples for supported problems.
- Sitemap, robots, and `llms.txt` routes for crawler indexing.

## Why this repo

- Build and compare core algorithm patterns from LeetCode.
- Keep clean, comparable implementations across languages.
- Show practical ways these patterns can be applied in real code.
