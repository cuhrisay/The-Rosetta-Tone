# The Rosetta Tone

Marketing site for Rosetta Riley — NASM-certified personal trainer & nutrition coach, cycle-syncing fitness for women of color.

Rebuilt from the original Squarespace site (therosettatone.net) as a static Vite + React + TypeScript + Tailwind (shadcn/ui) app.

## Local development

```
bun install   # or npm install
bun run dev   # or npm run dev
```

PHP form handlers (`public/application.php`, `public/free-guide.php`, `public/contact.php`) are not served by Vite locally — verify field names against the frontend instead of testing submissions end-to-end.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app and FTP-deploys `dist/` to Infomaniak (site hosting only — Rosetta's domain/email are not on Infomaniak). Required repo secrets:

- `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` — Infomaniak FTP credentials (hosting for the built site)
- `SMTP_PASSWORD` — a Google Workspace **App Password** for `rosetta@therosettatone.net` (not her account password — generate one under that Google Account's 2-Step Verification settings). Injected into the PHP form handlers at build time, replacing the `__SMTP_PASSWORD__` placeholder. All three form handlers send via `smtp.gmail.com` to `rosetta@therosettatone.net`.

## Known follow-ups

- No logo file exists yet — header/footer currently use a text wordmark and a placeholder "RT" favicon.
- DNS cutover from `rosetta.blogcats.com` (staging) to `therosettatone.net` (production) still pending.
