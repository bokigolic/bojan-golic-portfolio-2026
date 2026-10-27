# Review and verification

## UX refinement review — October 27, 2026

The current local review change refines hero composition, screenshot inspection,
project-card distinction, linked expertise evidence, NACD hierarchy, and page
rhythm. Build, lint, formatting, 4 data tests, and 21 browser tests passed, with
a focused 320px test after the final narrow-screen typography correction.
Screenshots and local performance observations are recorded in the
[UX refinement review](UX-REFINEMENT-REVIEW.md). No push or deployment is
authorized for this phase; earlier Git-push authorization applied to `97c5220`.

## Local follow-up — October 27, 2026

Improved contact-form labels, optional-field hints, validation messages, privacy
copy, command help, mobile-menu supporting copy, and cookie notice typography.
Contact labels remain 13px on mobile; validation and privacy text use 12px.
Added explicit new-tab accessible names to the footer résumé/GitHub links,
LinkedIn contact link, and case-study source links. Project demo/GitHub actions
already include new-tab wording. Visible links retain their existing arrows.

Lint, formatting, all four data tests, build (nine routes), and all 19 browser
tests passed. After removing the mobile label-size override, rebuilt and reran
the 320px responsive, contact interaction, and both axe tests: all four passed.
Confirmed computed mobile form sizes and visually reviewed the 320px contact
dialog with validation errors. No new tests or dependencies were added.

Owner content/identity approval, hosted routing/security, real form delivery,
and device/assistive-technology coverage remain pending. No remote push,
deployment, or real contact submission was performed.

## Release candidate update — October 26, 2026

The final candidate passes build (nine routes), lint, formatting, all four data
tests, and all 19 browser tests (54.7 seconds, no skipped/flaky tests). The full
suite was rerun after the focus/404 changes. `npm audit --json` reports zero
vulnerabilities. All 18 external project URLs passed identity-aware rendered
destination checks; see [EXTERNAL-LINK-REVIEW.md](EXTERNAL-LINK-REVIEW.md).
The local missing-HTML 404 regression found during this review was corrected
before that final run. Lighthouse results below remain historical local results.

Case-study outline links now use the shared focus-aware navigation. The candidate
also includes the existing focus/history, exclusive active-marker, static Netlify
404, and BokiGym anatomy-scope corrections. Owner content confirmations and hosted
verification remain open: see [RELEASE-CANDIDATE.md](RELEASE-CANDIDATE.md) and the
authoritative update in [RELEASE_CHECKLIST.md](../RELEASE_CHECKLIST.md).
No hosted delivery, push, or deployment is claimed.

## Previous implementation verification (historical)

Completed locally on October 26, 2026. Preview: http://127.0.0.1:4173/.
No remote push, deployment, external form submission, or production inbox change.

## Executed checks

| Check | Result |
| --- | --- |
| `npm run build` | Passed; nine pre-rendered documents with route-specific content and metadata |
| `npm run lint` | Passed, zero warnings |
| `npm run format:check` | Passed for the active application, scripts, and tests |
| `npm run test:unit` | 4 passed |
| `npm run test:e2e` | 14 passed, zero skipped, zero flaky, about 40 seconds |
| `npm audit` | Zero reported vulnerabilities across installed dependencies |
| `git diff --check` | Passed; only normal Windows LF/CRLF notices |
| Credential-pattern source scan | No credential-like strings found in reviewed source and docs |

The browser suite uses Playwright with local Microsoft Edge. Tests cover:

- Homepage and three primary case studies at 320, 375, 390, 430, 768, 1024,
  and 1440 CSS pixels: no horizontal overflow, missing images, or console errors.
- Three main projects, expandable additional projects, original product names,
  public demo/source links, and all documented routes.
- Project-tab selection using arrow keys, Home/End, selected states, and mobile
  screenshot switching.
- Mobile menu opening, focus containment, Escape, trigger restoration, and anchors.
- Contact required fields, initial/error focus, focus containment, local delivery
  notice, mocked server failure, and mocked success. No real message is sent.
- Axe WCAG 2.2 AA checks at 390 and 1440 pixels for the homepage, three primary
  case studies, and the contact modal: zero automated violations.
- Direct case URLs with and without trailing slashes, correct server HTML,
  refresh/history navigation, canonical metadata, and unknown-page noindex behavior.
- Quick navigation, keyboard selection, and reduced-motion behavior.

## Visual review

Reviewed actual screenshots of the desktop hero, project collection, mobile hero,
mobile menu, LWR Local case study, real application captures, and social preview.
Original screenshots remain in public/projects alongside content-preserving WebP
copies. Additional projects intentionally show a media placeholder until captures
are supplied. Screenshot variants do not embed or simulate another application.

## Production bundle and assets

The active design now loads one stylesheet instead of eight layers. Vite output:

- CSS: approximately 32.36 KB / 7.35 KB gzip (previously 133.14 / 26.69 KB).
- Main JavaScript: approximately 235.05 KB / 73.13 KB gzip.
- Contact form: separate lazy-loaded chunk, approximately 4.60 KB / 1.79 KB gzip.
- Self-hosted variable font: about 25 KB; no Google Fonts requests at runtime.
- Social image: 54 KB, replacing the previous 1.27 MB PNG.
- Real screenshots: WebP variants with a 640px option; source JPEGs are retained.

Final Lighthouse 13.5 mobile scores: Performance 99, Accessibility 100,
Best Practices 100, SEO 100. FCP 1.2 s, LCP 2.0 s, TBT 10 ms, CLS 0, Speed Index
1.2 s. Final run had no warnings. Results are recorded in
verification/lighthouse-mobile.json.
These are local simulated mobile measurements, not production field data.
INP cannot be inferred from this lab run. No field Core Web Vitals are claimed.

## Remaining evidence and release checks

- LWR Local: public repository sharing approval, complete live directory/map
  walkthrough, precise contribution timeline, and measured outcomes.
- BokiGym: end-to-end filtering and generated workout documentation; independent
  verification of saved progress, profile persistence, anatomy interaction, and AI.
- Be Fluent: complete lesson/practice walkthrough, offline and persistence checks,
  verified lesson counts, and documentation of any AI integration.
- All projects: no user, revenue, training, learning, or traffic metrics are asserted.
- Before release, review case-study wording and confirm the canonical origin.
  After an approved deployment, test the actual Netlify direct URLs and submit one
  owner-approved form delivery check. These external checks are not simulated as done.

See PROJECT-EVIDENCE.md for the exact reviewed materials, and PORTFOLIO-AUDIT.md
for the technical debt findings and implementation decisions. Build and test output
is reproducible with the commands in README.md. Automated checks supplement manual
and physical-device testing; they do not certify accessibility or real-world performance.

## Main changed files

Modified application entry points: src/App.jsx, src/main.jsx, and index.html.
Modified existing UI: Header, Hero, HeroIllustration, FeaturedProjects,
ProjectCaseStudy, ContactSection, ContactModal, CommandPalette, CookieConsent.

Created shared UI: ProjectMedia, ProjectActions, SiteLink, Modal,
ProfileSections, ErrorBoundary. Created data/profile.js, data/site.js, and
hooks/useMetadata.js; replaced data/projects.js and refined hooks/usePathname.js.

Created styles/portfolio.css; legacy styling files remain untouched and unloaded.
Added real screenshot sources, WebP variants, licensed local font, updated social
image, sitemap, and manifest colors. Refined analytics consent revocation.

Created scripts/prerender.mjs, capture-project-media.mjs,
optimize-project-media.mjs, generate-og.mjs; added registry and browser tests,
playwright.config.js, and audit/evidence/verification documents. Updated package
scripts and lockfile, ESLint, CI, Netlify Node version, README, and ignored QA outputs.
