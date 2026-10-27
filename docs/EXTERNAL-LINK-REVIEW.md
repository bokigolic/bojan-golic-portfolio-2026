# External destination review

Checked October 26, 2026 using an isolated, signed-out Edge browser. All 18 links
returned 200 and retained the exact requested URL. More importantly, rendered
demo branding/content and GitHub repository/file identities match the intended
projects. No accounts were created, no forms submitted, and no marketing metrics
from the demos were adopted as portfolio claims.

| Project | Demo identity | Repository identity | Source file identity |
| --- | --- | --- | --- |
| LWR Local | [lwrlocal.com](https://lwrlocal.com/): LWR Local branding, Discover Lakewood Ranch, local businesses/resources | No source link exposed | No source link exposed |
| BokiGym / Gym Master | [bokigym.netlify.app](https://bokigym.netlify.app/): Gym Master branding, exercise/workout navigation | [bokigolic/exercise-app](https://github.com/bokigolic/exercise-app): public fitness project | [src/App.jsx](https://github.com/bokigolic/exercise-app/blob/HEAD/src/App.jsx): fitness routes and lazy components |
| Be Fluent | [be-fluent.netlify.app](https://be-fluent.netlify.app/): BeFluent splash and English/Serbian learning content | [bokigolic/befluent](https://github.com/bokigolic/befluent): public English-learning project | [src/App.jsx](https://github.com/bokigolic/befluent/blob/HEAD/src/App.jsx): dictionary, learn/practice, progress/profile composition |
| BookEasy | [boki-book-easy.netlify.app](https://boki-book-easy.netlify.app/): BookEasy booking product | [bokigolic/bookeasy](https://github.com/bokigolic/bookeasy): public booking repository | [src/App.jsx](https://github.com/bokigolic/bookeasy/blob/HEAD/src/App.jsx): business/client and booking routes |
| InvoicePro | [boki-invoice-pro.netlify.app](https://boki-invoice-pro.netlify.app/): InvoicePro invoicing product | [bokigolic/invoicepro](https://github.com/bokigolic/invoicepro): public invoicing repository | [src/App.jsx](https://github.com/bokigolic/invoicepro/blob/HEAD/src/App.jsx): client, invoice, dashboard routes |
| IV Clean | [ivclean.netlify.app](https://ivclean.netlify.app/): IV Clean / Magic Shine local cleaning service | [bokigolic/IV-celan](https://github.com/bokigolic/IV-celan): public cleaning website (repository spelling retained) | [index.html](https://github.com/bokigolic/IV-celan/blob/HEAD/index.html): IV Clean cleaning-service document |
| FitPro | No demo link exposed | [bokigolic/fitpro](https://github.com/bokigolic/fitpro): public activity project | [index.html](https://github.com/bokigolic/fitpro/blob/HEAD/index.html): FitPro document, walking/cycling records and activity logic |

Count: six demos + six repositories + six source files = 18. These links identify
the intended projects; this check does not certify all external app functionality,
security, marketing statements, or service availability in the future.

The public GitHub profile, LinkedIn profile, canonical portfolio origin, and mailto
are separate from these 18 project links. LinkedIn person identity and mailbox
ownership/delivery remain owner checks in the release checklist.

Reproduce the read-only probe with `node scripts/verify-external-links.mjs`.
It fails for non-200, changed final URLs, or missing expected identity signals;
signals supplement human content review. It writes titles, observed URLs,
identity signals, short excerpts, and timestamps to
[verification/external-links.json](verification/external-links.json).
Screenshots are ignored local artifacts under `playwright-report/external-links/`.
