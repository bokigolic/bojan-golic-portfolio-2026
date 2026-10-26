# Portfolio implementation audit

Baseline: `1e1de2e`, reviewed October 26, 2026. Working tree was clean before this phase.
The user brief supersedes the earlier seven-project showcase direction: three primary
projects, LWR Local first, while keeping additional work accessible. React/Vite retained.
No remote push or deployment is part of this work.

## Findings before implementation

- Eight loaded CSS layers, about 187 KB of source CSS, 1,611 rules, 224 selectors
  repeated across files, and 77 `!important` declarations. `globals.css` began with
  a malformed `a:root` selector. Several fonts were imported more than once.
- Repeated experience and capability sections, an unused ProjectCard import,
  and a generic publishing/QA workbench competing with personal projects.
- All projects used similar presentation illustrations rather than real interfaces.
- Header lacked Escape handling and reliable focus containment on mobile.
- Contact dialog lacked a complete focus trap and reliable focus restoration;
  its service select was removed from keyboard and accessibility navigation.
- Command navigation could not navigate sections from a case study.
- Cookie prompt appeared even without a configured analytics integration.
- Case pages changed the title only. All server responses used homepage metadata;
  the sitemap omitted case studies. Client-only route fallback was present on Netlify.
- Per-page JavaScript was not split. Scroll parallax ignored reduced-motion settings.
- CI formatted source in place and explicitly ignored lint failures. There were no
  reproducible browser, accessibility, responsive, or project-registry checks.
- package.json used `latest` dependency ranges. The audit found three dependency
  advisories; compatible updates resolved them without a framework migration.

## Implementation decisions

- Load one token-based stylesheet. Keep legacy CSS and inactive components in Git
  as historical source, but do not ship them. Avoid adding another override layer.
- Use shared ProjectMedia, ProjectActions, SiteLink, and a native-dialog wrapper.
- Keep three featured projects in a central registry. Keep four additional projects
  and their existing detail URLs in an expandable secondary collection.
- Capture public, owner-provided applications without changing account data or
  submitting external forms. All six screenshot assets are real captures.
- Use React state for project/device selection and keyboard-accessible tabs.
- Keep contact delivery through Netlify Forms, plus the optional existing
  `window.FORM_ENDPOINT` configuration. Never claim a local POST sent a message.
- Use native modal dialogs with explicit initial focus and keyboard boundary handling,
  Escape, backdrop dismissal, scroll locking, and trigger restoration.
- Pre-render each route at build time with real content, unique metadata, canonical
  URLs, and structured data. Write extensionless-friendly `.html` and directory
  index artifacts. Unknown routes use a useful client 404 without hydration mismatch.
- Self-host one variable Latin font and its OFL license. Use no animation library
  in the portfolio. Respect reduced motion; keep content visible by default.
- Pin dependencies, use Node 22, and make CI formatting/lint/build/test failures real.

## Known verification boundaries

Netlify configuration and generated files are checked locally. Remote deployment
and the live Netlify Forms inbox are not tested because the brief prohibits deployment.
Mocked form submissions never send a real message. Automated axe results are not
an accessibility certification. Mobile widths use browser emulation, not physical devices.
