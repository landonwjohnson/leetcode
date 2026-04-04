# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Changed
- [`roadmap.md`](roadmap.md): roadmap tables link each **LeetCode Problem** (and AI **LeetCode Anchors**) to `https://leetcode.com/problems/<slug>/`.
- Homepage cards match wireframe flow: career/problem mini-cards use a fixed icon slot and title + mono count only (description on `title` tooltip); feature cards use top row icon + `ALGOS` badge then left-aligned copy; list rows add useful accent bar, pattern `N USES`, and recent `+` chip ([`site/components/home/*`](site/components/home/), [`site/app/globals.css`](site/app/globals.css)).
- [`site/next.config.mjs`](site/next.config.mjs) sets `outputFileTracingRoot` to this package so Next does not treat a parent-folder lockfile as the repo root (fixes flaky dev manifests / missing chunk paths).
- [`site/pages/_app.jsx`](site/pages/_app.jsx) uses relative imports for `globals.css` and `lib/fonts` instead of `@/` so resolution stays tied to `site/` when aliases mis-target.
- Feature routes: [`site/lib/content.ts`](site/lib/content.ts) `getFeatureStaticParams` / `resolveFeaturePageEntry` union reference [`features.json`](site/content/reference/features.json) with generated indexes so slugs like `search-autocomplete` pre-render under `output: "export"` ([`site/app/feature/[slug]/page.tsx`](site/app/feature/[slug]/page.tsx)).
- Centralized `next/font` Inter + JetBrains Mono in [`site/lib/fonts.ts`](site/lib/fonts.ts); App Router uses `inter.className` on `<body>`; Pages/Nextra wraps with the same variables + Inter via [`site/pages/_app.jsx`](site/pages/_app.jsx) and [`site/app/globals.css`](site/app/globals.css) (form controls inherit font; syntax highlighter uses `--font-mono`).
- Homepage and global chrome align with the AlgoRef dark wireframe: `next/font` Inter + JetBrains Mono, grid header/footer, wide hero search shell, taxonomy cards with Lucide icons and accent glows, horizontal “Real-World Features” cards, and list column dots (`site/app/layout.tsx`, `site/app/globals.css`, `site/components/SiteHeader*.tsx`, `site/components/home/*`, `site/lib/homepage.ts`).
- Site brand and metadata use **AlgoRef**; GitHub links use `repoGithubUrl` / `NEXT_PUBLIC_GITHUB_OWNER` (`site/lib/seo-config.ts`, `site/theme.config.jsx`).
- Problem detail “What This Problem Is Asking” uses a readable prose layout (summary callout, labeled sections, inline `code` styling) instead of a monospace code block (`site/app/problems/[slug]/page.tsx`, `site/components/ProblemPromptBody.tsx`, `site/app/globals.css`).
- Code blocks for solution snippets and interactive demos include a **Copy** control (`site/components/CopyCodeButton.tsx`, `site/components/SnippetTabs.tsx`, `site/components/InteractiveConcatenationDemo.tsx`, `site/components/visualizers/TwoSumVisualizer.tsx`, `site/app/globals.css`).

### Added
- Pre-commit and PR guards against committing `node_modules/`, Next build/export output, `.DS_Store`, and blobs over 10 MiB ([`scripts/git/pre-commit-blocklist.sh`](scripts/git/pre-commit-blocklist.sh), [`scripts/git/install-hooks.sh`](scripts/git/install-hooks.sh), [`scripts/git/check-pr-no-junk.sh`](scripts/git/check-pr-no-junk.sh), [`.github/workflows/no-junk-in-diff.yml`](.github/workflows/no-junk-in-diff.yml)); [README](README.md) documents `./scripts/git/install-hooks.sh`.
- Root [`.gitignore`](.gitignore) ignores `.DS_Store`, `node_modules/`, [`site/.next/`](site/.next/), [`site/out/`](site/out/), `site/.env*.local`, `*.log`, and Playwright output under `site/` (`test-results/`, `playwright-report/`, `blob-report/`).
- React demo for longest substring without repeating characters ([`problems/longest-substring-without-repeating-characters/examples/react/LongestSubstringWithoutRepeatingDemo.component.tsx`](problems/longest-substring-without-repeating-characters/examples/react/LongestSubstringWithoutRepeatingDemo.component.tsx)) (sliding-window helper + `useMemo`-backed input UI).
- Hero search field cycles typewriter-style placeholder suggestions until focus or typing (`site/components/SearchBarInput.tsx`, `site/components/SearchBar.tsx`, `site/components/home/HeroSearchSection.tsx`).
- `prompt.md` for every problem under `problems/*` (including `add-two-numbers`, `concatenation-of-array`, `search-suggestions-system`; `two-sum` already had one).
- `meta.yaml` for `problems/add-two-numbers/` so taxonomy and copy match the linked-list addition prompt.

### Fixed
- Removed duplicate `problems/search-suggestions-system` vs `problems/search_suggestions_system` directories; canonical problem lives at `problems/search-suggestions-system/`.
- `site/scripts/check-metadata.mjs` now matches generated `problems.json` (`tagIds`, non-empty `prompt`) and fails on duplicate slugs.
- Multi-language LeetCode workspace structure under `problems/<slug>/<language>/`.
- Cross-language runner script at `scripts/run.sh` for Swift, Python, and JavaScript.
- Example `two-sum` problem with implementations in `problems/two-sum/`.
- Setup and usage documentation in `README.md`.
- SEO docs website scaffold with Next.js + Nextra in `site/` (`site/app`, `site/components`, `site/lib`).
- Build-time content generation and validation tooling for problem pages (`site/scripts/generate-content.mjs`, `site/scripts/check-*.mjs`).
- Canonical taxonomy reference datasets for career paths, question types, features, patterns, companies, roles, industries, and tags (`site/content/reference/*.json`).
- Added intent-first snippet artifacts (`site/generated/snippets.json`, `site/generated/snippet-index.json`) with token expansion map and precomputed lookups.

### Changed
- Interactive concatenation carousel demo starts with three slides, then an **Add next 3 (duplicate)** button appends the same triple to teach `nums + nums` (`site/components/InteractiveConcatenationDemo.tsx`).
- Root docs now include website development workflow and docs index references (`README.md`, `docs/README.md`).
- Added architecture/ADR documentation for the SEO docs system (`docs/diagrams/seo-docs-architecture.md`, `docs/adr/0001-seo-docs-site.md`).
- Solution code blocks now render with syntax highlighting across supported languages (`site/components/SolutionTabs.tsx`).
- Visual demos were modularized into per-problem visualizer components and a registry (`site/components/visualizers/*`, `site/components/VisualAlgorithmDemo.tsx`).
- Technical SEO now uses centralized GitHub Pages-aware URL/basePath config with route-level canonical metadata (`site/lib/seo-config.ts`, `site/app/*`).
- Next.js export and crawl routes were aligned for static GitHub Pages publishing (`site/next.config.mjs`, `site/app/sitemap.ts`, `site/app/robots.ts`, `site/app/llms.txt/route.ts`).
- Upgraded content generation to consume per-problem `meta.yaml` + `content.mdx` + `snippets/*`, validate taxonomy references, and emit index/search artifacts (`site/scripts/generate-content.mjs`, `site/generated/*`).
- Reworked frontend information architecture to include explorer/search/category routes and reusable browse/detail components (`site/app/*`, `site/components/*`, `site/lib/content.ts`).
- Homepage now uses a dedicated view-model mapper and sectionized component architecture to mirror the new browse-first IA (`site/lib/homepage.ts`, `site/app/page.tsx`, `site/components/home/*`).
- Search UI and homepage styling were updated with chip-based quick links, compact browse strips, and responsive three-column list panels (`site/components/SearchBar.tsx`, `site/app/globals.css`).
- Extended content/search types and loaders to support rich snippet metadata, grouped suggestions, and snippet index access (`site/types/content.ts`, `site/lib/content.ts`).
- Upgraded search logic from simple document scoring to weighted intent-based snippet ranking and grouped autosuggest APIs (`site/lib/search.ts`).
- Updated search page rendering to show intent groups plus snippet results alongside problem results (`site/app/search/page.tsx`, `site/components/SearchResultsClient.tsx`).

### Fixed
- Ensured the SEO docs website successfully typechecks, validates generated metadata/links, tests content shape, and passes production build.
- Stabilized local dev startup with host/port defaults and watcher polling for environments where `localhost:3000` crashed (`site/package.json`).
- Hardened SEO validation to check route metadata/schema coverage and crawl-route completeness in CI (`site/scripts/check-route-seo.mjs`, `.github/workflows/site-validation.yml`).
- Restored static export compatibility for search/explorer pages while keeping frontend-only querying (`site/app/problems/page.tsx`, `site/app/search/page.tsx`, `site/components/SearchResultsClient.tsx`).
- Fixed runtime rendering failures caused by missing generated artifacts and undefined related-problem data by adding safe loader fallbacks (`site/lib/content.ts`).
- Resolved intermittent problem-page render crashes by cleaning stale multi-server dev state and validating route responses for `/`, `/problems/`, `/problems/concatenation-of-array/`, and `/problems/two-sum/`.
- Restored homepage build stability after the IA refactor by validating typecheck/tests/build against generated content artifacts (`site/generated/*`, `site/lib/homepage.ts`).
- Hardened content generation against non-canonical taxonomy IDs by normalizing invalid references to valid defaults instead of failing generation (`site/scripts/generate-content.mjs`).
