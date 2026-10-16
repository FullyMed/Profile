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

All site copy (the 5 language pages, `privacy.html`, `terms.html`, `404.html`) and `README.md`
got a plain-writing pass on 2026-10-15 using the Humanizer and Stop Slop skills. New or edited
copy should match it:

- First person, plain and specific. "I build web and mobile apps", not "Building digital
  products". Name the real thing (FoodPanda orders, ARC applications, 218 games) instead of
  abstractions ("operations", "solutions", "competencies").
- Avoid the usual AI tells: "showcase", "comprehensive overview", "career journey",
  "bridging cultures", "passionate", "leverage", "ensuring...", "-ing" tails that add fake depth,
  "not X, it's Y" contrasts, forced groups of three, filler adverbs ("fully", "seamlessly"),
  and stacked buzzwords in one sentence.
- Don't invent facts to add color (reply times, stats, motives, achievements). Use only what's
  already on the site, in the résumés, or what the user says.
- Translations are written natively in each language, not translated word for word from
  English, and follow the same rules (no "全面展現", "Gambaran lengkap", "総合的にご紹介" style
  filler).
- The Privacy Policy and Terms use "I", not "we" - it's a one-person site.
- The "Builder, Educator & Cross-Cultural Communicator" tagline (hero `<h1>` and every page
  `<title>`) is the user's brand and was deliberately kept; ask before changing it.

## Git workflow

**The user commits and pushes themselves.** Never run `git commit` or `git push`, open PRs, or
offer to commit ("want me to commit this?") unless the user explicitly asks in that turn. Leave
finished changes in the working tree and summarize what changed so they can review and commit.
Pushing to `main` auto-deploys to Netlify (see "Deployment"), so deploys are the user's call too.

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

## Design (redesigned 2026-10-16, confirmed with the user)

The site was redesigned with the redesign-skill, ui-ux-pro-max, taste-skill and frontend-design
skills. Direction: **"the name as a monument"**. The user chose: full redesign, keep the blue
accent, skills as a grouped list without percentages, and real screenshots of the live demos.

- **Hero:** "Maximilliano" set huge top-left, "Felix 傅忠明" bottom-right (the two halves are
  `aria-hidden` visual text; the real `<h1>` is a visually hidden "Maximilliano Felix 傅忠明"),
  the portrait as a full-height right column on desktop. Between them: the tagline, one sentence,
  a "View Projects" button and a "Get in Touch" link. On phones the two name halves stack at the
  top, then the photo, then the copy.
- **The one interactive feature:** under the hero sentence, a three-button switch
  (`#line-switch`, Bahasa Indonesia / English / 中文) rewrites that sentence in the three
  languages the user works in. The three versions live in `data-line-id/-en/-zh` on
  `#hero-line` and are the same on every page; the switch is `hidden` until JS runs.
- **Projects:** every project name runs as one large paragraph (with small inline screenshot
  frames), then filter buttons, then one row per project: a sticky left column (name, stack,
  links) next to a screenshot and description. Projects with live demos come first. Projects
  without a demo (`.no-shot`) show the description at lead size instead of a picture.
- **Experience:** the word "Experience" at display size, then one `<details>` bar per job (first
  one open), with the résumé download in a sticky side column.
- **About + Skills:** side facts (`<dl>`) next to the About paragraphs; Skills is plain grouped
  lists (no percentages, no icon grid) - user's decision, don't bring the bars back.
- **Contact:** "Get In Touch" at display size, message form and meeting form side by side, map
  below. **Footer** (inverse colours): the email address at display size, contact facts, link
  columns, and "Maximilliano Felix" cropped by the bottom edge.
- **Type:** Bricolage Grotesque (Google Fonts, variable: `opsz,wdth,wght`), one family. The
  display size uses the condensed width (`font-variation-settings: "wdth" 75`). Five steps as
  CSS variables: `--step-small`, `--step-body`, `--step-lead`, `--step-head`, `--step-display`.
  CJK text falls back to system fonts through the `--font` stack.
- **Colour:** tokens on `:root`, swapped under `.dark` (white/zinc ink in light, zinc-900 ground
  in dark; the footer uses the `--inv-*` tokens). Blue is the only accent: `#2563eb` for the
  button and links (white text passes 4.5:1), `#3b82f6` stays the favicon/`theme-color`.
- **House rules the design follows** (checked by the taste-skill inspector): no small label above
  headings, no gradients, no shadows on resting elements (only the header when scrolled and the
  dropdown menus), no 1px divider lines, no icon-topped card grids, square corners, text 13px or
  larger, running text in full ink. Keep new work inside these rules.
- **Checking a change:** the taste-skill scripts (`lint.mjs`, `inspect.mjs`) write to
  `Website/.taste-skill/`, which is gitignored. The last full run on 2026-10-16 had 0 FAIL on the
  language pages; the only warning was "no video", deliberately left (no honest footage exists).

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
  not the full site header/nav/reveal machinery), set in the same Bricolage Grotesque, and they
  read the shared `theme` localStorage
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
- `Images/Profile_Picture.webp` - the hero portrait (979x1280). `Profile_Picture.jpg` is the
  original it was converted from; no page references it any more.
- `Images/projects/*.webp` - 1440x900 screenshots of the live demos (BoardGames Analyzer,
  Talent_AI, JourneySet, PX Mart Finder), taken with headless Edge on 2026-10-16. Retake them if
  a demo's look changes. Taiwan Fare Finder and Prambanan Batik have no demo; Three Frogs' domain
  (threefrogsboardgame.com) stopped resolving in October 2026, so its "Live Demo" link was
  removed - restore it if the domain comes back.
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
  `tailwind.config` in `<head>` (dark mode via `class`, Bricolage Grotesque as `sans`). There is
  no compiled Tailwind build - don't introduce one without being asked. The design itself is
  mostly custom CSS on the tokens described under "Design", in the single `<style>` block in
  `<head>`; Tailwind utilities are used for small layout jobs and the `hidden`/`sr-only`/
  `opacity-0`/`invisible` toggles the scripts rely on.
- A tiny script at the top of `<head>` (before Tailwind) adds `js` to `<html>` (the reveal styles
  only hide content when it's present, so nothing stays invisible without JS) and applies the
  saved dark theme before first paint.
- `html` and `body` use `overflow-x: clip`, **not** `hidden`. `hidden` turns `<body>` into a
  scroll container and silently breaks every `position: sticky` (the header, the pinned project
  column, the résumé column) - this happened once during the redesign.
- All behavior lives in `<script>` blocks at the end of `<body>`, in this order: the page loader
  (also adds `is-ready` to `<html>`, which starts the hero entrance animation), dark-mode toggle
  (persisted to `localStorage`), header (adds `scrolled` past half a screen, `tucked` hides it
  while scrolling down and it returns on any scroll up or focus) + back-to-top + mobile menu,
  language dropdown (also carries the current `#section` hash over when switching language),
  scroll-reveal (`IntersectionObserver` adding `.visible` to `[data-reveal]` elements, staggered
  by their `--i` style), active nav link on scroll, the hero sentence switch, project filter
  buttons, the Netlify Forms handler for both forms, the résumé language toggle, the footer
  year, and the Leaflet map. The custom cursor and the skill-bar animation were removed in the
  redesign.
- Every `localStorage` read/write is wrapped in `try/catch` - it throws when a browser blocks
  storage, and an uncaught throw would kill the theme toggle. Keep that for any new storage use.
- Icon-only controls carry an `aria-label` translated per language: the theme toggle, mobile menu
  button (plus `aria-expanded`), language button (plus `aria-expanded`), and back-to-top link.
  Social links are text links in the footer ("GitHub", "LinkedIn", ...). The project filter,
  résumé toggle and hero switch buttons keep `aria-pressed` in sync with their `active` state.
- No `id` collisions or globals beyond what's already there - keep new script blocks
  self-scoped (IIFE) like the existing ones.

## Loading states

- **Initial page load:** `#page-loader` is a full-screen overlay (right after the skip link at
  the start of `<body>`, on the page's `--bg` colour) showing a Tailwind `animate-spin` ring. A script right
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
what either form collects, update `privacy.html`'s "What I Collect" / "Third-Party Services"
sections to match - these pages describe actual data handling and should stay accurate, not just present.
This content is not legal advice and hasn't been reviewed by a lawyer.

## Content Security Policy

`netlify.toml` locks `script-src`, `style-src`, `font-src`, `img-src`, `connect-src`, and
`frame-src` down to exactly the hosts currently in use (Google Fonts, cdnjs for Remix Icon,
Tailwind Play CDN, OpenStreetMap tiles, Google reCAPTCHA). **If you add a new external
resource - a script, stylesheet, font, image host, or API call - you must add its host to the
matching CSP directive in `netlify.toml`, or the browser will silently block it in production**
(it may still work in local preview if the CSP header isn't served). Prefer self-hosting under
`vendor/` (as done for Leaflet) over expanding the CSP when practical.

## Map

The "Find Me" map is Leaflet (self-hosted) with OpenStreetMap's standard tiles
(`tile.openstreetmap.org`, attribution "© OpenStreetMap contributors"), centred on Taichung.
Dark mode doesn't swap tile sets: `.dark .leaflet-tile-pane` gets a CSS
`invert + hue-rotate` filter. It used CARTO basemaps until 2026-10-16, when CARTO started
returning an "API KEY REQUIRED" image for every tile (the live site's map was blank). OSM's tile
servers reject requests without a normal browser User-Agent, so `curl` tests fail with
"Access blocked" even though real browsers load the tiles fine - test in a browser.

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
