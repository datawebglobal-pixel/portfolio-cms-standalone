# Portfolio CMS — Hosting guide

This project uses React/Vite for the client, Express/tRPC for the API, Supabase PostgreSQL for portfolio records, Supabase Storage for images, and signed HTTP-only cookie sessions for admin authentication.

## Local setup

1. Install Node.js 22 or newer and pnpm.
2. Run `pnpm install`.
3. Create a Supabase project.
4. Create the `projects` table and enable RLS with a policy that allows public reads only where `is_published = true`.
5. Create a public Storage bucket named `portfolio-images`.
6. Copy `ENVIRONMENT.example` into your local environment settings.
7. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and a long random `SESSION_SECRET`.
8. Set the requested admin email and password, or use `ADMIN_PASSWORD_HASH` in production.
9. Run `pnpm dev` for development.
10. Run `pnpm check`, `pnpm test`, and `pnpm build` before deployment.

## Environment variables

`SUPABASE_SERVICE_ROLE_KEY` is a server-only secret. Do not expose it through a `VITE_` variable and do not commit it to GitHub. The publishable key may be exposed to the browser only when RLS policies are configured correctly.

## Vercel and Supabase

Supabase is the persistent data layer. Project rows are stored in the `projects` table and uploaded images are stored in the `portfolio-images` bucket, so a Vercel redeploy does not require re-uploading portfolio content.

Import the GitHub repository into Vercel and add the variables from `ENVIRONMENT.example` to the Vercel project settings. Configure them for Production, Preview, and Development. Keep the service key, session secret, and admin password server-only.

Before relying on a production deployment, verify that the selected Vercel runtime supports the Express/tRPC backend entrypoint. Then test the public site, `/admin`, login, image upload, project create/edit/delete, publish/unpublish, and public rendering.

## Alternative persistent Node host

A VPS or Node.js host with a persistent filesystem can also run the project. Supabase remains recommended for portfolio records and images because it provides durable storage independent of the application process.

## Deployment commands

```bash
pnpm install --prod=false
pnpm check
pnpm test
pnpm build
pnpm start
```
