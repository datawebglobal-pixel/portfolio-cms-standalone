# Portfolio CMS

A portfolio website and private CMS built with React, Vite, Tailwind CSS, Express, tRPC, Supabase Database, Supabase Storage, and signed HTTP-only cookie sessions.

## Features

- Public portfolio landing page and project detail routes.
- Private `/admin` dashboard with no public dashboard link.
- Email/password admin authentication.
- Create, edit, delete, publish, and unpublish projects.
- Multiple project image uploads stored in the `portfolio-images` Supabase bucket.
- Portfolio records stored in the Supabase `projects` table.

## Quick start

```bash
pnpm install
# Set the variables listed in ENVIRONMENT.example
pnpm dev
```

Open `http://localhost:3000` for the public site and `http://localhost:3000/admin` for the CMS.

## Supabase setup

Create a Supabase project, create the `projects` table and its published-project RLS policy, and create a public Storage bucket named `portfolio-images`. The server requires `SUPABASE_URL` and the server-only `SUPABASE_SERVICE_ROLE_KEY`. The browser-side publishable key is optional for the current tRPC flow but is included in the environment template for Supabase client integrations.

Never commit `.env`, service-role/secret keys, admin passwords, or session secrets to GitHub. The service-role/secret key must remain server-only.

## Validation

```bash
pnpm check
pnpm test
pnpm build
```

The integration suite checks the Supabase table, public read access, Storage access, project create/delete, and image upload/delete cleanup.

## Vercel deployment

Import the GitHub repository into Vercel after the Supabase integration is configured. Add the variables from `ENVIRONMENT.example` to the Vercel project settings for Production, Preview, and Development. Keep `SUPABASE_SERVICE_ROLE_KEY`, `SESSION_SECRET`, and `ADMIN_PASSWORD` server-only. Confirm the deployment runtime supports the Express/tRPC backend entrypoint, then test `/`, `/admin`, login, image upload, project editing, deletion, and public rendering after deployment.
