# GoDaddy Repositories explorer

A small React application that explores public repositories owned by the [GoDaddy](https://github.com/godaddy) GitHub organisation. The interface focuses on discoverability and provides a simple overview of the organisation's most popular languages alongside an at-a-glance summary for each repository.

## Getting started

```bash
npm install
npm run dev
```

The app runs on [Vite](https://vitejs.dev/) and will start a development server on `http://localhost:5173`.

Run the automated tests with:

```bash
npm test
```

## Implementation notes

- **React + Vite** — Vite offers a fast feedback loop, minimal configuration, and first-class ES modules support.
- **React Router** — keeps the list page and the details page focused, with clean URLs for bookmarking.
- **Testing Library + Vitest** — allows writing behaviour-driven tests that exercise the UI from a user's perspective.

## Trade-offs and future ideas

- The GitHub API includes pagination but this demo fetches only the first page of repositories for simplicity.
- Repository languages are displayed based on the `language` field returned by the list endpoint. Fetching the language breakdown from the dedicated endpoint would provide more granular detail.
- Styling is intentionally lightweight and component-scoped to keep the focus on functionality. A design system or CSS-in-JS solution could further enhance consistency.
