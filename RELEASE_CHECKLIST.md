# Final release checklist

## Local follow-up — October 27, 2026

Owner confirmation: after a specific follow-up asking whether the owner can open
`hello@bojangolic.com` and read messages, the owner answered yes. Retain that
address as the public contact. This confirms owner-reported mailbox access;
it does not establish hosted form submission or notification delivery (G4).
The owner also confirmed the canonical domain and LinkedIn URL in the contact
review response. Signed-in LinkedIn identity review remains unverified.

Continued local preparation with larger auxiliary form/help/consent text and
explicit new-tab accessible names for the remaining active links. This partially
addresses L1 and addresses L3 for screen-reader announcements; deeper screenshots
(L2), other small auxiliary typography, and visible new-tab wording remain
follow-ups. See [verification](docs/VERIFICATION.md) for checks and visual review.
Production release gates G1–G6 below remain open, with the owner-reported contact
confirmations recorded above. The owner subsequently authorized a Git push of
the current reviewed branch. Production deployment and merging remain outside
that instruction; owner content approval and hosted verification remain pending.

## Release candidate status — October 26, 2026 (authoritative update)

**Local release candidate: ready for owner and hosted review. Production launch:
blocked pending the gates below.** Branch:
`release/portfolio-rc-2026-10-26-reviewed`. No push or deployment performed.
The earlier audit below is historical; this update supersedes its open M1/M2/M4,
test counts, link-check scope, and statement that no commit was made.

### Resolved and verified locally

- [x] M1: navigation moves focus to fragment headings or destination main content,
  including hero, back-to-work, case-study outline, and history navigation.
- [x] M2: case-study navigation derives one exclusive current item; homepage
  observer state resets when the pathname changes.
- [x] M4 implementation: removed the Netlify SPA 200 catch-all; all known routes
  remain pre-rendered, and missing routes use native `404.html`. Vite production
  preview now returns actual 404 status and noindex error HTML, including missing
  `.html` paths and JavaScript-disabled navigation. Hosted behavior remains a gate.
- [x] All three case studies reviewed against available source and public demos.
  Names, links, technologies, captions, and structure are consistent. BokiGym
  anatomy is explicitly unfinished. Unverified outcomes are not asserted.
- [x] Résumé identifies Bojan Golic, professional positioning, email, portfolio,
  and LinkedIn. NACD title agrees with the homepage. No personal dates, employment,
  education, outcomes, or numeric experience claims were invented.
- [x] All 18 project demo/repository/source links verified for intended identity,
  final URL, rendered content, repository owner/name, and file path, beyond HTTP
  status. Six demo screenshots also inspected. Evidence:
  [external link review](docs/EXTERNAL-LINK-REVIEW.md) and
  [machine record](docs/verification/external-links.json).
- [x] Netlify hidden detection form, honeypot, field parity, encoding, and POST
  configuration reviewed. Hosted submission/inbox test prepared, not executed.
- [x] Full checks after code changes: **19/19 browser tests**, **4/4 data tests**,
  build (nine routes), lint, formatting, and dependency audit (zero reported
  vulnerabilities) passed. No skipped/flaky browser tests. Lighthouse was not rerun.

### Remaining production release blockers

- [ ] **G1 — owner content approval (M3):** confirm precise contributions and dates
  for all three projects; approve final case-study wording. Confirm NACD role,
  `2023 - Present`, responsibilities, tool claims, and all three education entries.
  Approve the résumé as a skills summary or supply exact chronology/education
  for a chronological version. Source review cannot verify personal work history.
- [ ] **G2 — identity/contact:** approve canonical `https://bojangolic.com`, confirm
  `hello@bojangolic.com` is owned and monitored, and confirm LinkedIn points to
  the intended person in a normal signed-in browser (previous automation blocked).
- [ ] **G3 — hosted routing/security:** on the approved Netlify preview, verify
  direct routes, refresh, static assets, genuine 404 responses/HTML without JS,
  configured security/cache headers, preview noindex, and matching deploy SHA.
  Validate production-domain canonical redirect separately when authorized.
- [ ] **G4 — real contact delivery:** confirm Forms detection is enabled,
  `contact` is recognized, and recipient notification settings are correct. After
  explicit test-message authorization, verify one real hosted POST, the matching
  Netlify submission, and inbox receipt. **Delivery is not yet established.**
- [ ] **G5 — coverage acceptance:** complete or explicitly accept physical-device
  Safari/Firefox and NVDA/VoiceOver gaps. If analytics is enabled in the hosted
  environment, verify consent/revocation there before launch.
- [ ] **G6 — production authorization:** approve the reviewed immutable candidate
  and production release separately. No push, remote preview creation, merge, or
  production deployment is authorized by preparing this candidate.

### Retained limitations (not additional implementation blockers)

LWR repository sharing approval is only needed before exposing a source link; none
is currently exposed. Full LWR directory/map/business journeys, BokiGym generated
workouts/persistence/profiles/assistant, and Be Fluent complete practice/offline/AI
journeys remain outside verified behavior. These limit stronger future claims;
current case studies disclose them. No outcome metrics were added.

L1 small auxiliary typography, L2 deeper product screenshots, and L3 external-link
new-tab wording remain low-severity follow-ups. No redesign was introduced.

Exact local/Deploy Preview review steps, hosted form protocol, and content approval
record: [RELEASE-CANDIDATE.md](docs/RELEASE-CANDIDATE.md).

---

## Previous final audit (historical)

Audit date: October 26, 2026. Target: the current local production build at
http://127.0.0.1:4173/. Browser: Microsoft Edge / Chromium through Playwright.

**Decision: READY FOR PRODUCTION REVIEW. Public release remains conditional on
owner content approval and the hosted checks below.** No push or deployment was
performed. No redesign, new visual effects, or dependencies were introduced.
Existing uncommitted implementation work was preserved.

## Severity findings

### Critical

None confirmed in the reviewed homepage, primary case studies, navigation,
workbench, contact UI, or generated production artifacts.

### High

| ID | Finding | Resolution |
| --- | --- | --- |
| H1 | The linked resume had no candidate name or direct contact information, so a saved/printed copy could not identify or contact its owner. It also repeated an unconfirmed `4+ years` duration. | FIXED. Added the existing public name, preferred professional identity, email, portfolio, and LinkedIn links. Removed the unsupported duration without inventing replacement history. Kept the existing resume layout and remaining content. |

No confirmed High issues remain open. Regression coverage is in
`tests/release-audit.spec.js` and includes screen, print, and 320px reflow.

### Medium ? documented, not changed in this audit

| ID | Finding and evidence | Follow-up |
| --- | --- | --- |
| M1 | The hero's Explore my work action scrolls to Featured Work but leaves keyboard focus on its original link. The next Tab moves to the hero's Get in touch button rather than into the destination. Back-to-work navigation also leaves focus on the body, although its next Tab reaches the first project. | Move focus/sequential navigation to the destination heading or section when handling internal fragments. This is a usability issue, not a keyboard trap. |
| M2 | Header selection can retain a homepage observer state after entering a case study. Reproduced `Work` and `About` both marked `aria-current=location`. | Make the case-study current item exclusive and reset the homepage observer state on route changes. All links remain functional. |
| M3 | The case studies carefully distinguish source evidence from verified demo behavior, but role/timeline text still reads as a review rather than a fully owner-confirmed personal account. The resume also needs an owner-approved chronological employment/education review. | Confirm precise personal contributions and dates before refining copy. Do not invent project outcomes, employment history, or numeric experience claims. |
| M4 | Unknown local URLs receive the homepage HTML with HTTP 200 before JavaScript renders a noindex 404 view. The Netlify catch-all is also configured as a 200 rewrite. Known project routes have correct pre-rendered content. | Decide and validate server-side 404 handling on the approved host. The generated `404.html` exists; its presence alone does not prove a 404 HTTP response. |

### Low ? polish, not release blockers

- L1: Several screenshot captions, technology labels, and eyebrow labels are
  approximately 7?10 CSS pixels. Core copy and controls remain readable, and
  enlarged text-spacing checks passed, but auxiliary metadata is difficult to
  read on a phone. Consider a later typography-only adjustment.
- L2: Real screenshots are authentic and consistent, but mainly demonstrate the
  landing/dictionary interfaces. More specific directory, workout-generation,
  and lesson/practice captures would strengthen the evidence without changing
  the current design. Their deeper behavior is not certified by this audit.
- L3: Project actions explicitly announce new tabs; footer/profile links use an
  arrow without the same explicit accessible wording. This is a consistency
  improvement rather than a blocked interaction.

Medium/Low items were left unchanged to preserve the approved design and the
requested Critical/High-only fix scope.

## Verified functionality

- [x] Three primary projects appear in the intended order: LWR Local, BokiGym /
  Gym Master, Be Fluent. Four additional projects remain available.
- [x] Workbench switches project title, description, technology tags, features,
  screenshots, links, and accent treatment using real state.
- [x] Project tabs work with mouse, arrow keys, Home/End, and selected states;
  desktop/mobile controls change the real screenshot.
- [x] Header, footer, project navigation, case-study outlines, and internal links
  resolve. The focus and current-location refinements above remain noted.
- [x] Mobile menu opens/closes, contains keyboard focus, supports Escape, and
  restores its trigger. Menu-to-contact handoff leaves exactly one open dialog,
  focuses the name field, locks background scrolling, and restores it on close.
- [x] Contact required-field validation, error focus, failure feedback, success
  feedback, Escape, focus containment, and URL-encoded POST construction work.
- [x] Form payload includes `form-name=contact`, the honeypot, and expected fields.
  Requests were intercepted locally; no real message or personal data was sent.
- [x] Local default form delivery shows an honest hosted-delivery notice.
- [x] Copy email reports `Email copied.` when clipboard permission is available;
  mailto links provide a direct alternative.
- [x] All 18 project demo/repository/source URLs checked returned HTTP 200.
  All three primary live demos and both public primary repositories are reachable.
- [x] Public GitHub profile and the configured canonical homepage returned HTTP 200.
- [x] Updated resume loads, identifies its owner, includes clickable contact
  information, remains visible in print media, and fits at 320px.

## Visual QA results

Reviewed actual rendered viewport captures and scrolled content, not just source
or Lighthouse. Captures and observations are local ignored artifacts under
`playwright-report/release-audit/`.

| Page | Desktop 1440 x 1000 | Tablet 768 x 1024 | Mobile 390 x 844 |
| --- | --- | --- | --- |
| Homepage | Pass | Pass | Pass |
| /projects/lwr-local | Pass | Pass | Pass |
| /projects/bokigym | Pass | Pass | Pass |
| /projects/english-learning | Pass | Pass | Pass |

- [x] Clear hero positioning: Web Developer & Digital Experience Specialist.
  Headline, supporting text, and primary/secondary actions have a clear hierarchy.
- [x] Warm paper, green/ink contrast, typography, buttons, dividers, and spacing
  form one consistent visual system. No redesign is recommended for release.
- [x] All three case studies share the same navigation, heading hierarchy,
  evidence layout, action treatment, and contact/footer components.
- [x] Real screenshots load in all reviewed layouts; no distortion, broken assets,
  horizontal overflow, or console errors were found in the 12 viewport/page runs.
- [x] Desktop/mobile evidence compositions are coherent. Screenshots keep their
  own product branding; their UI is correctly presented as static media.
- [x] Tablet reflow, mobile title wrapping, menu layout, dialog scrolling, feature
  stacking, contact layout, and footer were visually inspected.
- [x] Additional 320px text-spacing stress checks (letter spacing .12em, word
  spacing .16em, line height 1.5, paragraph spacing 2em) produced no page overflow
  or clipped text in the homepage and three primary case studies.
- [x] Focus indicators are visible, reduced motion remains usable, and native
  form labels/required state/error associations are present.

Visual pass does not resolve the separately listed Medium/Low UX/content findings.

## Automated test results after the fix

| Command/check | Result |
| --- | --- |
| npm run build | PASS; nine pre-rendered routes; application asset sizes unchanged by resume fix |
| npm run test:e2e | PASS; 15/15, no skipped or flaky tests, 64.6 seconds |
| New resume regression alone | PASS; 1/1 |
| npm run test:unit | PASS; 4/4 registry, approved links, metadata, and Netlify/form checks |
| npm run lint | PASS; zero warnings |
| npm run format:check | PASS |
| Netlify TOML parse | PASS; Node 22, npm run build, dist publish directory |
| Manual external URL probe | 18/18 project/demo/source links returned HTTP 200 |

The browser suite includes 320, 375, 390, 430, 768, 1024, and 1440px, direct routes,
refresh/history, screenshot loading, console checks, workbench keyboard controls,
mobile menu, contact behavior, reduced motion, and automated WCAG 2.2 AA checks.
Axe reported zero violations on the homepage, three primary case studies, and
contact dialog at 390 and 1440px. This is not a manual screen-reader certification.

The previously measured local Lighthouse mobile result remains **99 Performance,
100 Accessibility, 100 Best Practices, 100 SEO**, with LCP 2.0 s, TBT 10 ms, CLS 0.
See `docs/verification/lighthouse-mobile.json`. It was not rerun for a static
resume-only content fix; it is not a measurement of the deployed host or field INP.

## SEO and deployment artifacts

- [x] Primary routes return their own pre-rendered titles, descriptions, canonical
  URLs, Open Graph URLs, structured data, and case-study content.
- [x] Both extensionless and trailing-slash primary URLs load locally.
- [x] robots.txt, sitemap.xml, social image, font, screenshot variants, manifest,
  and resume are present in the production output.
- [x] Existing Netlify static form-detection markup and field names are retained.
- [x] Existing security headers and immutable caching for hashed assets remain.
- [x] Dependencies and Node requirements remain pinned; no dependencies were added
  by this audit. CI runs formatting, lint, registry checks, build, and browser tests.
- [ ] Validate actual Netlify URL/status/header behavior after an approved release.
- [ ] Resolve the soft-404 decision above before claiming full server-side SEO readiness.

## Outstanding content confirmations

- [ ] Owner approval of precise roles, dates, contribution scope, resume chronology,
  and final first-person case-study wording.
- [ ] LWR Local public repository approval before showing a source link; none is
  exposed now. Verify the full live directory/map/business-detail journey.
- [ ] BokiGym exercise filters, generated workouts, saved progress, profiles,
  anatomy interactions, and assistant behavior beyond reviewed code/navigation.
- [ ] Be Fluent complete grammar/practice sessions, vocabulary persistence,
  offline recovery, lesson counts, and any AI integration.
- [ ] Any future user, revenue, traffic, training, or learning-outcome claims need
  separate evidence. This audit did not add such claims.

## Known limitations and release gates

- [ ] Confirm the desired canonical production origin remains https://bojangolic.com.
- [ ] Confirm Netlify Forms is enabled and recognizes the contact form in the
  actual hosting account. Successful production delivery/inbox receipt is NOT
  established by a mocked local test.
- [ ] Once authorized on a hosted version, perform one agreed end-to-end form
  delivery check. No message was sent during this audit.
- [ ] Manually verify the LinkedIn profile in a normal signed-in browser:
  automation returned HTTP 999 (a platform block, not proof of a broken link).
- [ ] Physical-device Safari/Firefox and NVDA/VoiceOver checks have not been run;
  the reviewed device sizes were emulated in Chromium/Edge.
- [ ] Optional analytics consent behavior needs a hosted check if analytics is
  configured; this build has no configured analytics prompt.

## Audit change scope and release decision

Only `public/resume-en.html` was changed in production content during this audit.
Added `tests/release-audit.spec.js` and this checklist. No application layout,
effects, project data, or dependencies were changed. All pre-existing working-tree
changes were preserved. No commit, push, or deployment was performed.

**Ready for production review: YES.** No confirmed Critical or open High defects
remain. **Unconditional public launch sign-off: NOT YET** ? complete the owner
content review and hosted delivery/configuration checks, and explicitly accept or
schedule the documented Medium/Low findings.
