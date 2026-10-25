@AGENTS.md

## Personal site privacy rules (non-negotiable)
- Every record is private by default. Never add a setting, default or job that publishes without an explicit per-item approval.
- The site renders only approvedSnapshot data. Never read live records in the Publisher.
- Never add a publish path for finance, health, friends, opportunities, todos or reminders.
- Importers write to the dashboard only, never to the website repo.
- All redaction lives in backend/publish/redaction and must stay unit-tested.
- Photos must be re-encoded with EXIF and GPS stripped before export.
- content/life/ is generated output. Never hand-edit it.
- Personal pages: noindex, out of the sitemap, never linked from the portfolio.
- Credentials live in the macOS Keychain, never in the repo or .env files committed to git.
