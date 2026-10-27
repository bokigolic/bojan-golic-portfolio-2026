# Release candidate review

Prepared October 26, 2026. Branch: `release/portfolio-rc-2026-10-26-reviewed`.
This candidate includes the previously uncommitted main implementation and audit.
No push, pull request, Netlify configuration change, deployment, or real form
submission was performed. The production release is still gated by
[RELEASE_CHECKLIST.md](../RELEASE_CHECKLIST.md).

## Local review

```powershell
git switch release/portfolio-rc-2026-10-26-reviewed
git show --stat HEAD
npm ci
npm run format:check
npm run lint
npm run test:unit
npm run build
npm run test:e2e
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

Open http://127.0.0.1:4173/. Tests use Microsoft Edge locally; CI installs Chromium.
Do not point the local browser suite at a hosted site: its contact test assumes a
localhost safeguard before it installs interception. It is not a hosted delivery test.

## Obtain a Deploy Preview only after remote preview approval

These are future instructions, not executed actions. Approval must cover pushing
this branch and opening a PR, which may automatically trigger a Netlify preview.

1. In the connected Netlify project, verify the repository is
   `bokigolic/bojan-golic-portfolio-2026`. Inspect the actual production branch and
   Deploy Preview settings under **Project configuration > Developer settings >
   Continuous deployment > Branches and deploy contexts**. Confirm this RC branch
   is not configured as the production branch. Do not change the production branch.
2. After approval, push only this branch:
   `git push -u origin release/portfolio-rc-2026-10-26-reviewed`.
   Open a pull request from it into the verified production branch. Leave it unmerged.
3. Wait for GitHub CI and the Netlify Deploy Preview check to pass. In Netlify's
   deploy details, confirm the deploy context is **Deploy Preview**, the source SHA
   matches `git rev-parse HEAD`, build command is `npm run build`, publish directory
   is `dist`, and Node is 22. Review build logs for form detection/build errors.
4. Open the preview from the completed PR check or Netlify deploy details. Do not
   guess the site slug. The usual PR preview URL is
   `https://deploy-preview-<PR-number>--<actual-site-name>.netlify.app`.
   Record both this URL and the immutable deploy permalink plus commit SHA.
5. Do not merge, select **Publish deploy**, or promote to production during review.

Netlify documents the PR preview workflow and URL formats in its
[Deploy Preview documentation](https://docs.netlify.com/deploy/deploy-types/deploy-previews/).

## Review the authorized hosted preview

Use the exact preview origin, keeping all navigation on that host. Inspect at
1440px, 768px, and 390px; include 320px and browser zoom for narrow text reflow.

1. Open `/`, `/projects/lwr-local`, `/projects/bokigym`, and
   `/projects/english-learning` directly, with a trailing slash, and on refresh.
   Each must show the matching heading and metadata. Check the other four project
   routes (`bookeasy`, `invoicepro`, `iv-clean`, `fitpro`), résumé, screenshots,
   fonts, sitemap, robots, and social image for missing assets.
2. With keyboard only, activate **Explore my work**: focus must move to the Work
   heading and the next Tab reach the first project. Open a case study, activate
   outline anchors and **Back to work**, then use Back/Forward. Check destination
   focus and exactly one current link per navigation. Repeat via the mobile menu;
   also check Escape, contact handoff, and focus restoration.
3. Check unknown `/not-a-portfolio-route`, `/projects/not-a-project`, and
   `/not-a-page.html` in browser Network. Each initial document must be HTTP 404
   and contain the error page and `noindex,follow` in the response HTML before JS.
   Repeat with JavaScript disabled. `/assets/missing.js` must also be 404.
   A rendered error heading with HTTP 200 is a failure.
4. Inspect response headers: `X-Content-Type-Options: nosniff`,
   `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`,
   and the configured camera/microphone/geolocation Permissions-Policy. Hashed
   `/assets/` files must have immutable caching. Check the preview's
   `X-Robots-Tag: noindex`; retain production canonicals as `https://bojangolic.com`
   once that origin is owner-approved. Check canonical www redirect on the
   production domain separately when authorized; a preview cannot prove it.
5. Test project tabs, responsive media switching, menu/contact keyboard behavior,
   résumé screen/print, and external destinations. Check console/network errors.
   Manually verify the LinkedIn link in a normal signed-in browser.
6. Run physical-device Safari/Firefox and NVDA/VoiceOver spot checks, or record
   explicit acceptance of the remaining coverage gap before launch.
7. If analytics is configured in this deploy context, check no analytics request
   before consent, acceptance, preferences reopening, and revocation. Record the
   actual environment configuration; local results do not prove hosted consent.

Read-only response check (PowerShell; substitute the actual authorized URL):

```powershell
$previewOrigin = 'https://deploy-preview-123--actual-site-name.netlify.app'
curl.exe -sS -D - "$previewOrigin/projects/lwr-local" -o NUL
curl.exe -sS -D - "$previewOrigin/projects/not-a-project"
curl.exe -sS -D - "$previewOrigin/not-a-page.html"
```

Inspect the status line and response body, not only curl's process exit code.
If preview protection is enabled, sign in through the authorized browser; an
authentication page or redirect is not proof of the portfolio's status handling.

## Hosted contact submission test — prepared, not executed

Static review confirms a hidden `contact` POST form in built HTML with
`data-netlify="true"`, honeypot `bot-field`, and matching fields:
`form-name`, `bot-field`, `name`, `email`, `company`, `service`, `message`.
The React form posts URL-encoded data to `/`. No rewrite intercepts that POST.
Local mocked success proves only UI/payload behavior.

1. Before submitting, confirm the owner authorizes one test message and provides
   an approved real reply address and expected recipient inbox. Do not use invented
   personal information. No submission is authorized merely by this runbook.
2. In the actual Netlify project, open **Forms** and confirm automatic form
   detection is enabled and `contact` is recognized for the reviewed deploy.
   Enabling detection requires a subsequent deploy. Record the form fields and
   actual notification recipient under form notifications without committing
   private account details. Confirm this preview accepts submissions; do not
   silently switch the test to production if it does not.
3. On the authorized preview, open **Get in touch**. First submit empty fields to
   verify errors and focus without a network POST. Then enter the approved test
   name/address, leave company optional and the honeypot empty, choose the service,
   and use a unique message such as
   `Portfolio RC QA <commit-short-SHA> <UTC-time> — approved delivery test; no reply needed.`
4. In browser Network, verify exactly one real POST to the same preview origin
   `/`, `Content-Type: application/x-www-form-urlencoded`, `form-name=contact`,
   empty `bot-field`, and all expected fields. Check response and success UI.
   No request interception, `FORM_ENDPOINT` override, or synthetic HTTP success.
5. In Netlify **Forms > contact**, locate the exact token, fields, and timestamp;
   check spam if absent. Verify the corresponding notification in the configured
   recipient inbox, including spam. Record deploy SHA/URL, token, UTC time,
   response status, Netlify receipt, and inbox receipt separately. Keep personal
   data and private screenshots out of Git.
6. A 2xx response or “Message sent” alone is insufficient. Mark **submission
   accepted** only after Netlify receipt; mark **notification delivered** only
   after inbox receipt. If either is missing, delivery remains unverified and
   release stays blocked. Do not send retries without agreement.

Reference: Netlify's [form setup](https://docs.netlify.com/manage/forms/setup/),
[submissions](https://docs.netlify.com/manage/forms/submissions/), and
[notifications](https://docs.netlify.com/manage/forms/notifications/) documentation.
Native 404 configuration follows Netlify's
[custom 404 handling](https://docs.netlify.com/manage/routing/redirects/redirect-options/#custom-404-page-handling).

## Content approval record

Review all three case studies against [PROJECT-EVIDENCE.md](PROJECT-EVIDENCE.md).
Names, project order, technologies, screenshot dates, demo/source links, and
shared case-study structure are consistent with reviewed materials. Code presence
is not proof that every advertised feature works or that the owner built it alone.

- LWR Local: confirm personal contribution and dates; retain no public source
  link unless sharing is approved. Directory/map/business journeys remain to test.
- BokiGym: confirm contribution and dates. Anatomy is unfinished; saved progress,
  generated workouts, profiles, and assistant results remain unverified.
- Be Fluent: confirm contribution and dates. Full grammar/practice sessions,
  persistence, offline recovery, lesson counts, and AI remain unverified.
- Résumé/homepage: confirm NACD's title, `2023 - Present`, responsibility scope,
  listed tools, and current employment. Confirm the three education names and
  credentials in the About section. The résumé is a skills/experience summary,
  not a complete chronology, and omits those education entries. Approve that
  choice or supply exact dates/history; none were invented to fill the gaps.
- Confirm `hello@bojangolic.com` exists and is monitored, GitHub handle
  `bokigolic`, LinkedIn `/in/bojan-golic`, and canonical `https://bojangolic.com`.
  Mailto consistency does not establish mailbox ownership or delivery.

Record owner approvals, hosted evidence, and any accepted low-severity limitations
in the checklist before requesting separate production-release approval.
