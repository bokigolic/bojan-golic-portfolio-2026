# Web Production Portfolio

Editable source code for a digital experience and web production portfolio demonstrating CMS migration, publishing workflows, QA, accessibility, and ongoing platform maintenance.

## Run locally

1. Install Node.js 20 or newer.
2. Open this folder in VS Code.
3. Run `npm install` in the terminal.
4. Run `npm run dev`.
5. Open the local URL shown in the terminal.

## Edit the portfolio

- Main content: `src/App.jsx`
- Main visual design: `src/portfolio.css`
- Additional professional styling: `src/professional.css`
- Page title and description: `index.html`

## Publish with GitHub and Netlify

1. Create a new GitHub repository.
2. Upload all files from this folder.
3. In Netlify, select **Add new project → Import an existing project**.
4. Connect GitHub and select the repository.
5. Netlify will automatically use `npm run build` and publish the `dist` folder.

Every new push to the GitHub repository will automatically update the live Netlify site.

## CI / Linting

- A GitHub Actions workflow is included at `.github/workflows/ci.yml` that runs `npm run format`, `npx eslint` and `npm run build` on pushes and PRs to `main`/`master`.

## Forms & Contact

- The site includes a modal contact form which can submit via Formspree. To enable Formspree, add the following script to `index.html` (replace with your Formspree endpoint):

```html
<script>
  window.FORM_ENDPOINT = "https://formspree.io/f/your-id";
</script>
```

Or deploy to Netlify — a hidden form is included for Netlify's form detection and will collect submissions.
