# Docs Index

This folder contains architecture and operational documentation for the LeetCodeSwift repository.

## Architecture

- [SEO docs website architecture](./diagrams/seo-docs-architecture.md)

## Navigation

- The SEO website route structure is documented in `site/app/`:
  - `site/app/problems/[slug]/page.tsx`
  - `site/app/tags/[tag]/page.tsx`
  - `site/app/languages/[language]/page.tsx`
  - `site/app/learning-paths/page.tsx`

## Data Model

- Generated content model:
  - `site/generated/problems.json`
  - `site/lib/content.ts`

## API

- No external runtime API endpoints are required; content is generated at build time from `problems/`.

## UI / Design System

- Reusable UI blocks for problem pages:
  - `site/components/SolutionTabs.tsx`
  - `site/components/UseCaseExample.tsx`
  - `site/components/RelatedProblems.tsx`
  - `site/components/VisualAlgorithmDemo.tsx`
  - `site/components/visualizers/*`

## Runbooks

- Build and SEO validation:
  - `cd site && npm run build`
  - `cd site && npm run validate-seo`
  - `cd site && npm test`
- Deployment checklist:
  - `site/DEPLOYMENT_CHECKLIST.md`
