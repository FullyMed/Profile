# Maximilliano Felix - Portfolio

Personal portfolio site for Maximilliano Felix (傅忠明), a computer science student at Asia
University in Taichung, Taiwan.

Live site: [maxfelix.netlify.app](https://maxfelix.netlify.app/)

> Keep this README and [CLAUDE.md](CLAUDE.md) in sync. When the site's structure, sections,
> tech stack, or deployment setup changes, update both in the same commit.

## Overview

The site is one page (Home, Projects, Skills, Experience, About, Contact) in five languages,
written as plain HTML, CSS, and JavaScript with no build step or framework.

- Languages: English (`index.html`), 中文 (`index-zh.html`), Indonesia (`index-id.html`),
  日本語 (`index-ja.html`), and 한국어 (`index-ko.html`). Visitors switch languages from the
  header dropdown.
- Sections: a hero, a project grid you can filter by type, skills and tech stack, a work
  history timeline with an English/Chinese résumé download, an About section, and a Contact
  section with a message form, a meeting-request form, and a map.
- SEO: each language page has its own `<title>` and meta description, written in that language.
- Loading states: a full-screen spinner covers the page while it loads, and each form's submit
  button shows a spinner and disables itself while sending.
- Legal: the footer and the contact form on every language page link to the
  [Privacy Policy](privacy.html) and [Terms of Use](terms.html). The footer's "Cookies" link
  opens the Cookies section of the Privacy Policy.
- Favicons: an SVG, ICO, PNG, and web-manifest icon set, all using a blue "MF" monogram in the
  site's primary color.
- Copy: page text follows the plain-writing rules in `CLAUDE.md` ("Writing style").

## Tech stack

- HTML5 + [Tailwind CSS](https://tailwindcss.com/) (via the Play CDN, configured inline)
- Vanilla JavaScript (no framework, no bundler)
- [Remix Icon](https://remixicon.com/) for icons, Google Fonts (Inter)
- [Leaflet.js](https://leafletjs.com/) (self-hosted under `vendor/leaflet/`) + CARTO basemap
  tiles for the contact-section map
- [Netlify Forms](https://docs.netlify.com/manage/forms/setup/) for the contact and
  meeting-request forms (plus Google reCAPTCHA on the contact form)
- Deployed on [Netlify](https://www.netlify.com/)

## Project structure

```
index.html            English (canonical structure/source of truth)
index-zh.html          中文
index-id.html          Indonesia
index-ja.html          日本語
index-ko.html          한국어
404.html                Custom not-found page (auto-served by Netlify)
privacy.html            Privacy Policy (English-only utility page)
terms.html              Terms of Use (English-only utility page)
netlify.toml           Deploy config + security headers (CSP, HSTS, etc.)
vendor/leaflet/         Self-hosted Leaflet.js, CSS, and marker assets
Images/                 Site images (profile photo)
favicon.svg, favicon.ico, favicon-*.png,
android-chrome-*.png, apple-touch-icon.png,
site.webmanifest       Favicon / PWA icon set
scripts/gen_favicon.py Regenerates the favicon PNG/ICO set (Pillow)
Maximilliano Felix_CV.pdf / .docx    English résumé
傅忠明_CV.pdf / .docx                  Chinese résumé
.claude/launch.json     Local static preview server config
```

The four translated pages are structural duplicates of `index.html` - same layout, styling, and
scripts, with only the visible text translated.

## Running locally

No build step or dependencies - serve the folder with any static file server, e.g.:

```bash
python -m http.server 8734
```

then open `http://localhost:8734`.

## Deployment

Auto-deployed by Netlify from the `main` branch, so a change goes live when it's pushed to `main`
(commits and pushes are done manually by the site owner). The site lives in the `Website/` folder of the
[FullyMed/Profile](https://github.com/FullyMed/Profile) repo, so Netlify's base directory is
`Website` (`publish = "."`, no build command). Security
headers, including a strict Content-Security-Policy scoped to the exact external hosts the site
uses, are defined in [netlify.toml](netlify.toml).

## Contact

- Email: [maxfelix05@gmail.com](mailto:maxfelix05@gmail.com)
- GitHub: [github.com/FullyMed](https://github.com/FullyMed)
- LinkedIn: [Maximilliano Felix](https://www.linkedin.com/in/maximilliano-felix-gunawan-polandouw-064541316/)
