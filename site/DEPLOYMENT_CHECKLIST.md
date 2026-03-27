# SEO Docs Deployment Checklist

1. Install dependencies:
   - `cd site && npm install`
2. Validate generated content and metadata:
   - `npm run generate-content`
   - `npm run validate-seo`
   - `npm test`
3. Verify production build:
   - `npm run build`
4. Configure GitHub Pages SEO environment:
   - `NEXT_PUBLIC_SITE_ORIGIN=https://<your-github-username>.github.io`
   - `NEXT_PUBLIC_REPO_NAME=<repository-name>`
   - Optional override: `NEXT_PUBLIC_BASE_PATH=/<repository-name>`
5. Build static export:
   - `npm run build`
   - Deploy generated static output from `site/out/`
6. Submit indexing:
   - Google Search Console: submit `/sitemap.xml`
   - Bing Webmaster Tools: submit `/sitemap.xml`
7. Post-deploy checks:
   - Confirm `/robots.txt` and `/sitemap.xml` are reachable
   - Confirm `/llms.txt` is reachable
   - Smoke-test `problems`, `tags`, `languages`, and `learning-paths` routes
