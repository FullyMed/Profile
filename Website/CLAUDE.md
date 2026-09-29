# CLAUDE.md

Guidance for Claude Code (or any agent) working in this repository.

**Keep this file and [README.md](README.md) up to date.** Whenever a change adds, removes, or
restructures anything described below (a section, a language file, a CSP host, the deploy
config, a new asset), update both files in the same change - don't let them drift from the code.

## What this is

A static, multi-language personal portfolio site for Maximilliano Felix (傅忠明), deployed on
Netlify. There is no build step, no framework, and no package manager - every page is a
self-contained HTML file styled with the Tailwind Play CDN.

## Writing style

No em dashes (Unicode U+2014) anywhere in this project - not in page copy, not in `CLAUDE.md`/
`README.md`, not in code comments. Use a hyphen, a comma, or rephrase the sentence instead. The
user had every em dash in the project removed on 2026-09-29; don't reintroduce them in new
content or edits.

## Content decisions (confirmed with the user, 2026-09-29)

- **Location is Taichung, Taiwan everywhere** - About copy, contact info, footer, and the map
  pin/popup. Surabaya only appears where it's historically accurate (the 3 Frogs job and the
  Three Frogs project).
- **No newsletter.** The footer newsletter signup was removed (it had no backend); the footer is
  3 columns (brand, Quick Links, Contact). Don't re-add one without a real mailing-list backend.
- **"Cookies" footer link points to `privacy.html#cookies`** (the Privacy Policy's Cookies
  section), not a separate cookie policy page.
- **Tailwind stays on the Play CDN.** Its "should not be used in production" console warning is
  known and accepted - it's a warning, not an error. Don't precompile Tailwind unless asked.

## File structure

The git repository root is `C:\CSIE\Profile` (`FullyMed/Profile`), one level above this folder.
The site lives in the repo's `Website/` subfolder next to unrelated personal files (`Photos/`,
`Schedule/`, a top-level `README.md`/`.gitignore`). Everything below is relative to `Website/`.

- `index.html` - canonical English page. **Source of truth for structure, styling, and behavior.**
- `index-zh.html`, `index-id.html`, `index-ja.html`, `index-ko.html` - Chinese, Indonesian,
  Japanese, Korean translations. These are **structural duplicates** of `index.html`: identical
  line count, identical element `id`s, identical CSS and `<script>` blocks - only visible text
  differs.
- `404.html` - custom not-found page. Netlify auto-serves any file named `404.html` at the
  publish root for unmatched routes (no config needed in `netlify.toml`). Self-contained and
  intentionally single-language (English) with links home in each of the 5 languages - it isn't
  part of the "5 files move together" rule below and doesn't need a translated duplicate.
- `privacy.html`, `terms.html` - Privacy Policy and Terms of Use. Same "utility page" treatment
  as `404.html`: intentionally English-only, self-contained (their own minimal header/footer,
  not the full site header/nav/cursor/reveal machinery), but read the shared `theme` localStorage
  key in a tiny `<head>` script (before first paint, so dark mode doesn't flash light) so the
  dark-mode preference carries over from the main site. Linked from the footer ("Privacy Policy" /
  "Terms" / "Cookies" -> `privacy.html#cookies`) and the contact form's privacy-policy checkbox on
  all 5 language pages - those link labels are translated per page, but the two target pages
  themselves are not.
- `netlify.toml` - deploy config (`publish = "."`, no build command) and security headers
  (CSP, X-Frame-Options, HSTS, Permissions-Policy, etc.) scoped to the exact external hosts the
  site uses.
- `vendor/leaflet/` - self-hosted Leaflet.js + CSS + marker images (used by the contact-section
  map instead of pulling Leaflet from a CDN not on the CSP allowlist).
- `Images/Profile_Picture.jpg` - About-section photo.
- `favicon.svg`, `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`,
  `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`,
  `site.webmanifest` - the favicon set (see "Favicons" below). Shared across every page; not
  part of the "5 files move together" or 404/legal-page rules since there's nothing to
  translate.
- `scripts/gen_favicon.py` - regenerates the favicon PNG/ICO set from the "MF" monogram design.
  Not part of the deployed site (no build step touches it); a standalone Pillow script to rerun
  by hand if the icon needs to change.
- `Maximilliano Felix_CV.pdf/.docx` and `傅忠明_CV.pdf/.docx` - English and Chinese résumés,
  switched by the "Download Resume" language toggle in the Experience section.
- `.claude/launch.json` - local static preview server (`python -m http.server 8734`).

## Critical rule: five files move together

Because the 4 translated pages are byte-for-byte structural copies of `index.html`, **any change
to markup structure, CSS, or `<script>` behavior must be applied to all 5 files**, not just
`index.html`. Only the human-readable text content should differ between them. If you only need
to change copy/wording, edit just the relevant language file(s). If you change layout, styling,
add/remove a section, or touch any `<script>` block, replicate the exact same change across all 5
- check `id`/`class`/`data-*` attributes stay identical so the shared JS keeps working on every
variant.

There is no templating system generating these from a shared source, and this is intentional and
permanent - the user has confirmed the 4 translated pages are meant to stay hand-maintained,
identical-content duplicates long-term. Don't introduce a build step, templating system, or
i18n framework to "fix" this unless explicitly asked.

One deliberate exception to "only text content differs": `<title>` and `<meta name="description">`
in `<head>` are **per-page SEO content**, each written natively in that page's language rather
than translated line-for-line from the English copy - keep them that way when editing.

`404.html`, `privacy.html`, and `terms.html` are outside this rule entirely - they're
intentionally English-only utility/legal pages, not translated duplicates. Don't create
`privacy-zh.html`-style variants of them unless explicitly asked; the footer/contact-form
_links_ to them are translated per language, but the pages themselves stay single-language.

## SEO metadata

Each of the 5 language pages has its own `<title>` and `<meta name="description">` in `<head>`,
written natively in that page's language (not a translation of the English tag word-for-word).
`404.html` keeps a generic English title and `<meta name="robots" content="noindex">` instead -
it shouldn't be indexed. When editing on-page copy that changes what a page is actually about,
revisit its title/description too so they stay accurate.

## Styling & scripts

- Tailwind is loaded via `<script src="https://cdn.tailwindcss.com/3.4.16">` with an inline
  `tailwind.config` in `<head>` (dark mode via `class`, custom `primary`/`secondary` colors,
  `Inter` font). There is no compiled Tailwind build - don't introduce one without being asked.
  All custom (non-utility) CSS lives in a single `<style>` block in `<head>`.
  All behavior lives in `<script>` blocks at the end of `<body>`, in this order: the page loader,
  dark-mode toggle (persisted to `localStorage`), header scroll state + back-to-top + mobile menu,
  language dropdown (also carries the current `#section` hash over when switching language),
  scroll-reveal (`IntersectionObserver` adding `.visible` to `.reveal` elements), active nav link
  on scroll (`IntersectionObserver`), project filter buttons, skill-bar fill animation
  (`IntersectionObserver`), custom cursor (desktop-only, `(hover: hover) and (pointer: fine)`),
  the Netlify Forms handler for both forms, the résumé language toggle, the footer year, and the
  Leaflet map (light/dark tile swap tied to the theme toggle).
- Every `localStorage` read/write is wrapped in `try/catch` - it throws when a browser blocks
  storage, and an uncaught throw would kill the theme toggle. Keep that for any new storage use.
- Icon-only controls carry an `aria-label`: social links use the brand name (same on every page);
  the theme toggle, mobile menu button (plus `aria-expanded`), language button (plus
  `aria-expanded`), and back-to-top link use a translated label per language.
- No `id` collisions or globals beyond what's already there - keep new script blocks
  self-scoped (IIFE) like the existing ones.

## Loading states

- **Initial page load:** `#page-loader` is a full-screen overlay (first element in `<body>`,
  matching the hero's dark background) showing a Tailwind `animate-spin` ring. A script right
  after the Leaflet `<script src>` tag hides it - via the same `opacity-0`/`invisible` Tailwind
  toggle pattern `#back-to-top` uses - on `window.load`, with a 4s `setTimeout` fallback in case
  a resource stalls. Structural, identical across all 5 language pages; not used on `404.html`
  (nothing to wait for there).
- **Form submit (contact + meeting):** each submit button (`#contact-submit`, `#meeting-submit`)
  holds a hidden `ri-loader-4-line` spinner (`#<prefix>-submit-spinner`, Tailwind `animate-spin`)
  and a label span (`#<prefix>-submit-label`). One shared `wireForm()` handler disables the
  button, reveals the spinner, and swaps the label to a "Sending…" string while the `fetch` is in
  flight, then restores everything in `.finally()` regardless of success/failure. Result text
  goes in `#form-response` / `#meeting-response` (both `.form-response`, `role="status"`); on
  failure the handler adds `.is-error`, which turns the text red via the custom CSS. The
  "Sending…", error, and per-form success strings are localized per language - keep that pattern
  (structure identical across the 5 files, only the string literals differ) for any future
  translated/user-facing script text.

## Favicons

A blue (`#3b82f6`) rounded-square "MF" monogram, generated with Pillow (`ImageDraw` + system
Arial Bold) from a 1024px master via `scripts/gen_favicon.py`, plus a hand-authored `favicon.svg`
in the same design for modern browsers. Rerun that script to regenerate the PNG/ICO set if the
design or brand color changes. The full set:
`favicon.svg` (primary, vector), `favicon.ico` (16/32/48px, legacy fallback), `favicon-16x16.png`
/ `favicon-32x32.png` (explicit PNG fallbacks), `apple-touch-icon.png` (180px, iOS home screen),
`android-chrome-192x192.png` / `android-chrome-512x512.png` + `site.webmanifest` (Android/PWA).
All 8 root-level files, referenced by identical `<link>`/`<meta name="theme-color">` tags in
every page's `<head>` (all 5 language pages, `404.html`, `privacy.html`, `terms.html`) - add the
same tags to any new page. If the brand mark or primary color ever changes, regenerate all sizes
from a new master rather than editing individual PNGs by hand, and keep `favicon.svg` in sync
with the raster version.

## Legal pages

`privacy.html` and `terms.html` cover the contact and meeting-request forms (Netlify Forms),
Google reCAPTCHA, and the other third-party services listed under "Content Security Policy"
below. If a future change adds a new external service, a tracking/analytics script, or changes
what either form collects, update `privacy.html`'s "Information We Collect" / "Third-Party Services" sections to
match - these pages describe actual data handling and should stay accurate, not just present.
This content is not legal advice and hasn't been reviewed by a lawyer.

## Content Security Policy

`netlify.toml` locks `script-src`, `style-src`, `font-src`, `img-src`, `connect-src`, and
`frame-src` down to exactly the hosts currently in use (Google Fonts, cdnjs for Remix Icon,
Tailwind Play CDN, CARTO basemap tiles, Google reCAPTCHA). **If you add a new external
resource - a script, stylesheet, font, image host, or API call - you must add its host to the
matching CSP directive in `netlify.toml`, or the browser will silently block it in production**
(it may still work in local preview if the CSP header isn't served). Prefer self-hosting under
`vendor/` (as done for Leaflet) over expanding the CSP when practical.

## Forms (Netlify Forms)

Two Netlify Forms forms live in the Contact section, both submitted via the shared
`fetch("/", …)` `wireForm()` handler in the "Netlify Forms" `<script>` block:

- **`#contact-form`** (`name="contact"`): name, email, subject, message, privacy checkbox,
  hidden `lang`. Uses `data-netlify-recaptcha`; the handler calls `grecaptcha.reset()` after
  every submit because reCAPTCHA tokens are single-use.
- **`#meeting-form`** (`name="meeting"`, the "Schedule a Meeting" card): name, email, `date`
  (`min` set to today by JS), `time` slot, `meeting-type` radio (video/phone), hidden `lang`.
  No reCAPTCHA (kept to one widget per page, on the contact form); the honeypot plus Netlify's
  own spam filtering cover it. The radios reuse `.custom-checkbox`, with a
  `[type="radio"]` CSS variant that renders them round.

Both have `data-netlify="true"`, a hidden `form-name` input, and the `bot-field` honeypot.
Netlify detects forms from the static HTML at deploy time, so submissions only work when
deployed on Netlify. In local preview the POST fails and the red error message shows - that's
expected. Submissions appear in the Netlify dashboard under Forms, split by form name.

The email `pattern` on both forms is `[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}` (no upper bound on TLD
length, so addresses like `name@studio.photography` are accepted).

## Local preview

No build step is needed; any static file server works. The configured one:

```bash
python -m http.server 8734
```

(also wired up as the `static-preview` launch config in `.claude/launch.json`).

## Deployment

Netlify, auto-deployed from the `main` branch of `FullyMed/Profile` on GitHub. Because the site
is in the repo's `Website/` subfolder, the Netlify site's **base directory is `Website`** (set in
the Netlify UI, which is also why `netlify.toml` is picked up from this folder). With
`publish = "."` and no build command, `Website/` is served as-is. Live at https://maxfelix.netlify.app/ (Netlify's
own subdomain - no custom domain is configured).
