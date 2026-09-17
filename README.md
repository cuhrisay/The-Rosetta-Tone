# The Rosetta Tone

Marketing site for Rosetta Riley — NASM-certified personal trainer & nutrition coach, cycle-syncing fitness for women of color.

Rebuilt from the original Squarespace site (therosettatone.net) as a static Vite + React + TypeScript + Tailwind (shadcn/ui) app.

## Local development

```
bun install   # or npm install
bun run dev   # or npm run dev
```

PHP form handlers (`public/application.php`, `public/free-guide.php`) are not served by Vite locally — verify field names against the frontend instead of testing submissions end-to-end.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app and FTP-deploys `dist/` to Infomaniak. Required repo secrets:

- `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` — Infomaniak FTP credentials
- `SMTP_PASSWORD` — injected into the PHP form handlers at build time, replacing the `__SMTP_PASSWORD__` placeholder

## Known follow-ups

- Confirm the SMTP sending account (currently placeholder `hello@therosettatone.net` via `mail.infomaniak.com`) and update both PHP handlers if different.
- No logo file exists yet — header/footer currently use a text wordmark and a placeholder "RT" favicon.
- Several source photos are large (3–4.5MB) and should be compressed/resized before final launch.
- DNS cutover from `rosetta.blogcats.com` (staging) to `therosettatone.net` (production) still pending.
