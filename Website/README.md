# Maximilliano Felix — Portfolio

Personal portfolio website for Maximilliano Felix (傅忠明) — builder, educator, and
cross-cultural communicator based in Taichung, Taiwan.

**Live site:** [maxfelix.netlify.app](https://maxfelix.netlify.app/)

> **Maintenance note:** this README and [CLAUDE.md](CLAUDE.md) should be updated together
> whenever the site's structure, content sections, tech stack, or deployment setup change.

## Overview

A single-page portfolio (Home, Projects, Skills, Experience, About, Contact) available in five
languages, built as static HTML/CSS/JS with no build step or framework.

- **Languages:** English (`index.html`), 中文 (`index-zh.html`), Indonesia (`index-id.html`),
  日本語 (`index-ja.html`), 한국어 (`index-ko.html`) — selectable from the header language dropdown.
- **Sections:** hero, filterable project showcase, skills & tech stack, experience timeline
  (with a bilingual résumé download), about, and a contact form + interactive map.
- **SEO:** each language page has its own native-language `<title>` and meta description.

## Tech stack

- HTML5 + [Tailwind CSS](https://tailwindcss.com/) (via the Play CDN, configured inline)
- Vanilla JavaScript (no framework, no bundler)
- [Remix Icon](https://remixicon.com/) for icons, Google Fonts (Inter)
- [Leaflet.js](https://leafletjs.com/) (self-hosted under `vendor/leaflet/`) + CARTO basemap
  tiles for the contact-section map
- [Netlify Forms](https://docs.netlify.com/manage/forms/setup/) + Google reCAPTCHA for the
  contact form
- Deployed on [Netlify](https://www.netlify.com/)

## Project structure

```
index.html            English (canonical structure/source of truth)
index-zh.html          中文
index-id.html          Indonesia
index-ja.html          日本語
index-ko.html          한국어
404.html                Custom not-found page (auto-served by Netlify)
netlify.toml           Deploy config + security headers (CSP, HSTS, etc.)
vendor/leaflet/         Self-hosted Leaflet.js, CSS, and marker assets
Images/                 Site images (profile photo)
Maximilliano Felix_CV.pdf / .docx    English résumé
傅忠明_CV.pdf / .docx                  Chinese résumé
.claude/launch.json     Local static preview server config
```

The four translated pages are structural duplicates of `index.html` — same layout, styling, and
scripts, with only the visible text translated.

## Running locally

No build step or dependencies — serve the folder with any static file server, e.g.:

```bash
python -m http.server 8734
```

then open `http://localhost:8734`.

## Deployment

Auto-deployed by Netlify from the `main` branch (`publish = "."`, no build command). Security
headers, including a strict Content-Security-Policy scoped to the exact external hosts the site
uses, are defined in [netlify.toml](netlify.toml).

## Contact

- Email: [maxfelix05@gmail.com](mailto:maxfelix05@gmail.com)
- GitHub: [github.com/FullyMed](https://github.com/FullyMed)
- LinkedIn: [Maximilliano Felix](https://www.linkedin.com/in/maximilliano-felix-gunawan-polandouw-064541316/)
