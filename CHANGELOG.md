# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Added
- Multi-language LeetCode workspace structure under `problems/<slug>/<language>/`.
- Cross-language runner script at `scripts/run.sh` for Swift, Python, and JavaScript.
- Example `two-sum` problem with implementations in `problems/two-sum/`.
- Setup and usage documentation in `README.md`.
- SEO docs website scaffold with Next.js + Nextra in `site/` (`site/app`, `site/components`, `site/lib`).
- Build-time content generation and validation tooling for problem pages (`site/scripts/generate-content.mjs`, `site/scripts/check-*.mjs`).

### Changed
- Root docs now include website development workflow and docs index references (`README.md`, `docs/README.md`).
- Added architecture/ADR documentation for the SEO docs system (`docs/diagrams/seo-docs-architecture.md`, `docs/adr/0001-seo-docs-site.md`).
- Solution code blocks now render with syntax highlighting across supported languages (`site/components/SolutionTabs.tsx`).
- Visual demos were modularized into per-problem visualizer components and a registry (`site/components/visualizers/*`, `site/components/VisualAlgorithmDemo.tsx`).
- Technical SEO now uses centralized GitHub Pages-aware URL/basePath config with route-level canonical metadata (`site/lib/seo-config.ts`, `site/app/*`).
- Next.js export and crawl routes were aligned for static GitHub Pages publishing (`site/next.config.mjs`, `site/app/sitemap.ts`, `site/app/robots.ts`, `site/app/llms.txt/route.ts`).

### Fixed
- Ensured the SEO docs website successfully typechecks, validates generated metadata/links, tests content shape, and passes production build.
- Stabilized local dev startup with host/port defaults and watcher polling for environments where `localhost:3000` crashed (`site/package.json`).
- Hardened SEO validation to check route metadata/schema coverage and crawl-route completeness in CI (`site/scripts/check-route-seo.mjs`, `.github/workflows/site-validation.yml`).
