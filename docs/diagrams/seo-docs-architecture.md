# SEO Docs Website Architecture

```mermaid
flowchart TD
  problemsRoot[problemsFolders] --> generatorScript[generateContentScript]
  generatorScript --> generatedJson[generatedProblemsJson]
  generatedJson --> contentLib[siteLibContent]
  contentLib --> problemPage[problemDetailPage]
  contentLib --> indexPages[tagLanguageLearningPathPages]
  problemPage --> seoOutputs[metadataJsonLdSitemapRobots]
  indexPages --> seoOutputs
```

## Notes

- Canonical source content remains in `problems/`.
- Build-time generation creates `site/generated/problems.json`.
- Next.js routes under `site/app/` render problem and discovery pages.
- Search engines consume metadata, sitemap, and robots outputs from the app.
