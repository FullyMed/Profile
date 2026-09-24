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
- `404.html` — custom not-found page. Netlify auto-serves any file named `404.html` at the
  publish root for unmatched routes (no config needed in `netlify.toml`). Self-contained and
  intentionally single-language (English) with links home in each of the 5 languages — it isn't
  part of the "5 files move together" rule below and doesn't need a translated duplicate.
- `privacy.html`, `terms.html` — Privacy Policy and Terms of Use. Same "utility page" treatment
  as `404.html`: intentionally English-only, self-contained (their own minimal header/footer,
  not the full site header/nav/cursor/reveal machinery), but reads the shared `theme` localStorage
  key on load so dark-mode preference carries over from the main site. Linked from the footer
  ("Privacy Policy" / "Terms") and the contact form's privacy-policy checkbox on all 5 language
  pages — those link labels are translated per page, but the two target pages themselves are not.
- `netlify.toml` — deploy config (`publish = "."`, no build command) and security headers
  (CSP, X-Frame-Options, HSTS, Permissions-Policy, etc.) scoped to the exact external hosts the
  site uses.
- `vendor/leaflet/` — self-hosted Leaflet.js + CSS + marker images (used by the contact-section
  map instead of pulling Leaflet from a CDN not on the CSP allowlist).
- `Images/Profile_Picture.jpg` — About-section photo.
- `favicon.svg`, `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`,
  `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`,
  `site.webmanifest` — the favicon set (see "Favicons" below). Shared across every page; not
  part of the "5 files move together" or 404/legal-page rules since there's nothing to
  translate.
- `scripts/gen_favicon.py` — regenerates the favicon PNG/ICO set from the "MF" monogram design.
  Not part of the deployed site (no build step touches it); a standalone Pillow script to rerun
  by hand if the icon needs to change.
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

One deliberate exception to "only text content differs": `<title>` and `<meta name="description">`
in `<head>` are **per-page SEO content**, each written natively in that page's language rather
than translated line-for-line from the English copy — keep them that way when editing.

`404.html`, `privacy.html`, and `terms.html` are outside this rule entirely — they're
intentionally English-only utility/legal pages, not translated duplicates. Don't create
`privacy-zh.html`-style variants of them unless explicitly asked; the footer/contact-form
_links_ to them are translated per language, but the pages themselves stay single-language.

## SEO metadata

Each of the 5 language pages has its own `<title>` and `<meta name="description">` in `<head>`,
written natively in that page's language (not a translation of the English tag word-for-word).
`404.html` keeps a generic English title and `<meta name="robots" content="noindex">` instead —
it shouldn't be indexed. When editing on-page copy that changes what a page is actually about,
revisit its title/description too so they stay accurate.

## Styling & scripts

- Tailwind is loaded via `<script src="https://cdn.tailwindcss.com/3.4.16">` with an inline
  `tailwind.config` in `<head>` (dark mode via `class`, custom `primary`/`secondary` colors,
  `Inter` font). There is no compiled Tailwind build — don't introduce one without being asked.
  All custom (non-utility) CSS lives in a single `<style>` block in `<head>`.
  All behavior lives in a handful of `<script>` blocks at the end of `<body>`: the page loader,
  dark-mode toggle (persisted to `localStorage`), scroll-reveal (`IntersectionObserver`-free,
  scroll-based), mobile menu, project filter buttons, custom cursor (desktop-only,
  `@media (hover:hover)`), the Netlify Forms contact submit handler, the résumé language toggle,
  the footer year, and the Leaflet map (light/dark tile swap tied to the theme toggle).
- No `id` collisions or globals beyond what's already there — keep new script blocks
  self-scoped (IIFE) like the existing ones.

## Loading states

- **Initial page load:** `#page-loader` is a full-screen overlay (first element in `<body>`,
  matching the hero's dark background) showing a Tailwind `animate-spin` ring. A script right
  after the Leaflet `<script src>` tag hides it — via the same `opacity-0`/`invisible` Tailwind
  toggle pattern `#back-to-top` uses — on `window.load`, with a 4s `setTimeout` fallback in case
  a resource stalls. Structural, identical across all 5 language pages; not used on `404.html`
  (nothing to wait for there).
- **Contact form submit:** the submit button (`#contact-submit`) holds a hidden
  `ri-loader-4-line` spinner (`#contact-submit-spinner`, Tailwind `animate-spin`) and a label
  span (`#contact-submit-label`). The submit handler disables the button, reveals the spinner,
  and swaps the label to a "Sending…" string while the `fetch` is in flight, then restores
  everything in `.finally()` regardless of success/failure. The "Sending…" text is localized
  per language, same as the existing success/error `box.textContent` strings in that handler —
  keep that pattern (structure identical across the 5 files, only the string literals differ)
  for any future translated/user-facing script text.

## Favicons

A blue (`#3b82f6`) rounded-square "MF" monogram, generated with Pillow (`ImageDraw` + system
Arial Bold) from a 1024px master via `scripts/gen_favicon.py`, plus a hand-authored `favicon.svg`
in the same design for modern browsers. Rerun that script to regenerate the PNG/ICO set if the
design or brand color changes. The full set:
`favicon.svg` (primary, vector), `favicon.ico` (16/32/48px, legacy fallback), `favicon-16x16.png`
/ `favicon-32x32.png` (explicit PNG fallbacks), `apple-touch-icon.png` (180px, iOS home screen),
`android-chrome-192x192.png` / `android-chrome-512x512.png` + `site.webmanifest` (Android/PWA).
All 8 root-level files, referenced by identical `<link>`/`<meta name="theme-color">` tags in
every page's `<head>` (all 5 language pages, `404.html`, `privacy.html`, `terms.html`) — add the
same tags to any new page. If the brand mark or primary color ever changes, regenerate all sizes
from a new master rather than editing individual PNGs by hand, and keep `favicon.svg` in sync
with the raster version.

## Legal pages

`privacy.html` and `terms.html` cover the contact form (Netlify Forms), Google reCAPTCHA, and
the other third-party services listed under "Content Security Policy" below. If a future change
adds a new external service, a tracking/analytics script, or changes what the contact form
collects, update `privacy.html`'s "Information We Collect" / "Third-Party Services" sections to
match — these pages describe actual data handling and should stay accurate, not just present.
This content is not legal advice and hasn't been reviewed by a lawyer.

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
