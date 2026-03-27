# ADR 0001: Build SEO docs site from problems content

## Status

Accepted

## Context

The repository stores LeetCode problem prompts and solutions by language under `problems/`. We need a public website optimized for search discovery and practical learning use-cases without duplicating source content manually.

## Decision

Adopt a Next.js + Nextra website in `site/` and generate a normalized content artifact (`site/generated/problems.json`) from `problems/` at build time.

## Consequences

- Canonical data stays in one place (`problems/`).
- SEO pages can be generated consistently with metadata and internal linking.
- Build process adds a generation step before dev/build/test.
- Future additions of problems automatically become website pages after regeneration.
