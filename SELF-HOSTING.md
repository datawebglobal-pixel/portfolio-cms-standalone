# Portfolio CMS — Self-hosting guide

This project is fully self-hosted. It uses React/Vite for the client, Express/tRPC for the API, JSON file for persistence, signed HTTP-only cookie sessions for admin authentication, and the local filesystem for project images.

## Local setup

1. Install Node.js 22 or newer and pnpm.
2. Run `pnpm install`.
3. Copy `ENVIRONMENT.example` to your hosting provider's environment-variable settings.
4. Set a long random `SESSION_SECRET`, a strong `ADMIN_EMAIL`, and either `ADMIN_PASSWORD` or a bcrypt `ADMIN_PASSWORD_HASH`.
5. Run `pnpm dev` for development.
6. Run `pnpm check`, `pnpm test`, and `pnpm build` before deployment.

## Production requirements

Use a Node.js host with a persistent disk. The `data/` directory contains the JSON file database and the `uploads/` directory contains uploaded images. If the host uses ephemeral containers, attach a persistent volume or replace the local adapters in `server/localDb.ts` and `server/localStorage.ts` with managed services.

The application serves the public portfolio at `/` and the private CMS at `/admin`. Admin mutations are protected by the signed session cookie and the server-side admin role check.

## Deployment commands

```bash
pnpm install --prod=false
pnpm build
pnpm start
```

Set `NODE_ENV=production` and expose the port provided by the hosting platform through `PORT`.
