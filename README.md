# Portfolio CMS

A fully self-hosted portfolio website and CMS built with React, Vite, Tailwind CSS, Express, tRPC, a JSON file database, signed HTTP-only cookie sessions, and local filesystem uploads.

## Features

- Public portfolio landing page and project detail routes.
- Private `/admin` dashboard.
- Email/password admin authentication.
- Create, edit, delete, publish, and unpublish projects.
- Multiple project image uploads to the local `uploads/` directory.
- JSON database stored in `data/portfolio.json`.

## Quick start

```bash
pnpm install
# Set the variables listed in ENVIRONMENT.example
pnpm dev
```

Open `http://localhost:3000` for the public site and `http://localhost:3000/admin` for the CMS.

## Production

```bash
pnpm check
pnpm test
pnpm build
pnpm start
```

Use persistent storage for `data/` and `uploads/` in production. Set a long random `SESSION_SECRET`, strong admin credentials, and an appropriate `PORT`.
