# Project evidence and media

Reviewed October 26, 2026. Do not add performance, revenue, learning, training,
or active-user metrics without independently documented evidence.

Release-candidate review rechecked the local LWR package/explore/server page
implementation and current public BokiGym/Be Fluent package.json and src/App.jsx.
Their published stacks and architecture descriptions agree with those materials.
BokiGym's router has no anatomy-guide route; candidate copy explicitly leaves
anatomy completion as future work. Demo branding and all 18 public project link
destinations were reviewed beyond HTTP status; see
[EXTERNAL-LINK-REVIEW.md](EXTERNAL-LINK-REVIEW.md). Exact personal contributions,
timelines, and résumé chronology remain owner confirmations, not inferred facts.

## LWR Local

The owner brief identifies it as a personal local-discovery project. Reviewed local
package.json, app/page.tsx, app/explore/page.tsx, components/ExploreExperience.tsx,
components/Header.tsx, and components/Hero.tsx. The package confirms Next.js, React,
TypeScript, Sanity, and Leaflet. Source confirms server content loading, directory
filtering, query state, and separate client map loading. Public homepage
https://lwrlocal.com/ returned HTTP 200 and was captured at desktop and mobile sizes.
No private repository address is exposed. Public GitHub sharing approval is missing.

Still to document: a full directory-to-business journey, map behavior against live
content, project timeline, precise responsibility breakdown, and measured outcomes.

## BokiGym / Gym Master

Public repository: https://github.com/bokigolic/exercise-app (public status verified).
Reviewed package.json and src/App.jsx, confirming React, Vite, Tailwind CSS,
Framer Motion, and React Router. Source has lazy routes for exercise browsing,
workout generation, a fitness hub, assistant, and profile. Public homepage at
https://bokigym.netlify.app/ loads and shows those navigation entries.
Homepage screenshots are real; marketing claims in the app screenshot are not
independently adopted as portfolio claims.

Still to document: end-to-end exercise filtering and generated workouts, persistence,
profile saves, progress tracking, anatomy interaction, and any AI response dependency.
No exercise counts or AI-quality claims are added to the portfolio copy.

## Be Fluent / English Learning

Public repository: https://github.com/bokigolic/befluent (public status verified).
Reviewed package.json and src/App.jsx. React, Vite, Zustand, and TanStack Query are
confirmed. Source contains LearnPage, PracticePage, grammar category navigation,
and lazy progress/profile/settings views. The public app at
https://be-fluent.netlify.app/ was opened, a learning level chosen in an isolated
browser context, and the dictionary screen captured. No account was created;
no personal information was entered; no message was sent.

Still to document: complete grammar/practice sessions, saved vocabulary persistence,
offline recovery, lesson counts, and actual AI integrations. No efficacy metrics.

## Media provenance

Six JPEGs in public/projects are browser captures of the public interfaces above:
1280 x 800 desktop and 390 x 844 mobile. Mobile captures use the same session after
viewport change. Captions state the capture date and are part of the UI. All project
previews are static images; they are not iframe replicas or fake live applications.
WebP copies preserve the same content, with a 640px desktop variant for smaller
rendered sizes. Original JPEGs are retained as capture sources. Additional projects
keep explicit media placeholders until approved captures exist.

Font: Manrope, local variable WOFF2 (Latin subset), with its SIL Open Font License
in public/fonts/OFL-Manrope.txt. The self-hosted font removes Google Fonts requests.
