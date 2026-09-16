# CLAUDE.md

Guidance for Claude Code (or any agent) working in this repository.

**Keep this file and [README.md](README.md) up to date.** Whenever a change adds, removes, or
restructures anything described below (a section, a language file, a CSP host, the deploy
config, a new asset), update both files in the same change — don't let them drift from the code.

## What this is

A static, multi-language personal portfolio site for Maximilliano Felix (傅忠明), deployed on
Netlify. There is no build step, no framework, and no package manager — every page is a
self-contained HTML file styled with the Tailwind Play CDN.

## File structure

- `index.html` — canonical English page. **Source of truth for structure, styling, and behavior.**
- `index-zh.html`, `index-id.html`, `index-ja.html`, `index-ko.html` — Chinese, Indonesian,
  Japanese, Korean translations. These are **structural duplicates** of `index.html`: identical
  line count, identical element `id`s, identical CSS and `<script>` blocks — only visible text
  differs.
- `netlify.toml` — deploy config (`publish = "."`, no build command) and security headers
  (CSP, X-Frame-Options, HSTS, Permissions-Policy, etc.) scoped to the exact external hosts the
  site uses.
- `vendor/leaflet/` — self-hosted Leaflet.js + CSS + marker images (used by the contact-section
  map instead of pulling Leaflet from a CDN not on the CSP allowlist).
- `Images/Profile_Picture.jpg` — About-section photo.
- `Maximilliano Felix_CV.pdf/.docx` and `傅忠明_CV.pdf/.docx` — English and Chinese résumés,
  switched by the "Download Resume" language toggle in the Experience section.
- `.claude/launch.json` — local static preview server (`python -m http.server 8734`).

## Critical rule: five files move together

Because the 4 translated pages are byte-for-byte structural copies of `index.html`, **any change
to markup structure, CSS, or `<script>` behavior must be applied to all 5 files**, not just
`index.html`. Only the human-readable text content should differ between them. If you only need
to change copy/wording, edit just the relevant language file(s). If you change layout, styling,
add/remove a section, or touch any `<script>` block, replicate the exact same change across all 5
— check `id`/`class`/`data-*` attributes stay identical so the shared JS keeps working on every
variant.

There is no templating system generating these from a shared source, and this is intentional and
permanent — the user has confirmed the 4 translated pages are meant to stay hand-maintained,
identical-content duplicates long-term. Don't introduce a build step, templating system, or
i18n framework to "fix" this unless explicitly asked.

## Styling & scripts

- Tailwind is loaded via `<script src="https://cdn.tailwindcss.com/3.4.16">` with an inline
  `tailwind.config` in `<head>` (dark mode via `class`, custom `primary`/`secondary` colors,
  `Inter` font). There is no compiled Tailwind build — don't introduce one without being asked.
  All custom (non-utility) CSS lives in a single `<style>` block in `<head>`.
  All behavior lives in a handful of `<script>` blocks at the end of `<body>`: dark-mode
  toggle (persisted to `localStorage`), scroll-reveal (`IntersectionObserver`-free, scroll-based),
  mobile menu, project filter buttons, custom cursor (desktop-only, `@media (hover:hover)`),
  the Netlify Forms contact submit handler, the résumé language toggle, the footer year, and the
  Leaflet map (light/dark tile swap tied to the theme toggle).
- No `id` collisions or globals beyond what's already there — keep new script blocks
  self-scoped (IIFE) like the existing ones.

## Content Security Policy

`netlify.toml` locks `script-src`, `style-src`, `font-src`, `img-src`, `connect-src`, and
`frame-src` down to exactly the hosts currently in use (Google Fonts, cdnjs for Remix Icon,
Tailwind Play CDN, CARTO basemap tiles, Google reCAPTCHA). **If you add a new external
resource — a script, stylesheet, font, image host, or API call — you must add its host to the
matching CSP directive in `netlify.toml`, or the browser will silently block it in production**
(it may still work in local preview if the CSP header isn't served). Prefer self-hosting under
`vendor/` (as done for Leaflet) over expanding the CSP when practical.

## Contact form

The form (`#contact-form`) is a Netlify Forms form (`data-netlify="true"`, hidden `form-name`
input, honeypot `bot-field`, `data-netlify-recaptcha`) submitted via a custom `fetch("/", …)`
handler in the last `<script>` block. Netlify's form detection is static-HTML-based at deploy
time — this only works when actually deployed on Netlify, not in local preview.

## Local preview

No build step is needed; any static file server works. The configured one:

```bash
python -m http.server 8734
```

(also wired up as the `static-preview` launch config in `.claude/launch.json`).

## Deployment

Netlify, auto-deployed from the `main` branch of `FullyMed/Profile` on GitHub. `publish = "."`,
no build command — the repo is served as-is. Live at https://maxfelix.netlify.app/ (Netlify's
own subdomain — no custom domain is configured).
