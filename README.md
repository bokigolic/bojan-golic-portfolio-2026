# Bojan Golic portfolio

React + Vite portfolio for a Web Producer & Digital Experience Specialist.
Three primary personal projects: LWR Local, BokiGym / Gym Master, and Be Fluent.
Additional projects and their approved public demo/source links remain accessible.

## Develop and review

Use Node.js 22.12 or newer (CI uses Node 22).

```sh
npm ci
npm run dev
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

The build pre-renders the homepage, seven project routes, and a 404 document.
It writes both directory index and extensionless-friendly HTML files. Each route
contains its own title, description, canonical URL, structured data, and content
before JavaScript runs. The client hydrates matching documents and handles
internal navigation without a new framework.

## Checks

```sh
npm run lint
npm run format:check
npm run test:unit
npm run build
npm run test:e2e
```

Local browser tests use installed Microsoft Edge. CI installs Playwright Chromium.
On another local environment, set CI=1 after installing Chromium with
`npx playwright install chromium`, or adjust the channel in playwright.config.js.
Tests include seven widths, direct URLs, image loading, keyboard tabs, modal
focus, mocked contact delivery, reduced motion, and axe WCAG 2.2 AA checks.
These checks complement manual review; they are not an accessibility certification.

## Main files

- `src/App.jsx`: page composition and route selection.
- `src/data/projects.js`: public content, verified technologies, screenshot paths,
  approved links, evidence notes, case-study text, and primary/secondary ordering.
- `src/data/profile.js`: expertise, process, and professional experience topics.
- `src/data/site.js`: canonical origin and shared metadata generation.
- `src/styles/portfolio.css`: the only loaded stylesheet, with shared tokens.
- `src/components/HeroIllustration.jsx`: accessible, stateful project workbench.
- `src/components/ProjectMedia.jsx`: real responsive screenshot presentation.
- `src/components/Modal.jsx`: shared native dialog, focus, and Escape behavior.
- `scripts/prerender.mjs`: static project documents and metadata.
- `tests/`: registry, browser, responsive, and accessibility checks.

Legacy CSS and inactive components are retained for reference but are not loaded.
Do not add another CSS override layer. Use the active design tokens instead.

## Media and evidence

Original JPEG captures and optimized WebP variants are in `public/projects`.
The UI selects 640px or 1280px desktop captures with responsive srcset. To refresh:

```sh
node scripts/capture-project-media.mjs
node scripts/optimize-project-media.mjs
```

This opens only the public applications and uses an isolated local learning
preference in Be Fluent. It does not create accounts or submit messages. Review
new captures visually and update the dates in the registry. Missing images use
clearly identified placeholders, not simulated live interfaces.

The local Manrope WOFF2 is accompanied by its SIL Open Font License. The social
image can be regenerated while the preview server is running on port 4173:

```sh
node scripts/generate-og.mjs
```

Source review and information still missing are documented in
[PROJECT-EVIDENCE.md](docs/PROJECT-EVIDENCE.md). Audit and decisions are in
[PORTFOLIO-AUDIT.md](docs/PORTFOLIO-AUDIT.md). Final checks are recorded in
[VERIFICATION.md](docs/VERIFICATION.md).

## Contact, analytics, and hosting

Netlify builds with `npm run build` and publishes `dist`. Static form detection
is preserved in index.html; the contact form posts URL-encoded data to `/`.
An optional `window.FORM_ENDPOINT` supports a separately configured form service.
Local default submissions show an honest hosted-delivery notice, not a false success.
Automated tests intercept requests; no real message is sent.

Analytics loads only when VITE_GA_MEASUREMENT_ID is configured and consent is
granted. Without that setting no cookie prompt is shown. Configured users can
reopen preferences from the footer and revoke analytics consent.

The canonical origin remains https://bojangolic.com. Confirm it before deploying
to another domain. Existing Netlify security headers remain. Known routes are
static documents; missing paths use Netlify's native 404.html handling.
Do not deploy or push this phase until the owner explicitly approves it.

Release status and remaining gates: [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md).
Deploy Preview review and hosted form test: [RELEASE-CANDIDATE.md](docs/RELEASE-CANDIDATE.md).
