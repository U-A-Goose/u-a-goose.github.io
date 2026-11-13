# U-A-Goose website

This Quarto project publishes the U-A-Goose Software Engineering Research Group website at https://u-a-goose.github.io/.

## Content and appearance

- `index.qmd` is the maintenance entry point for the single-page homepage: research introduction, News, People, Join us, Community, and institutional support.
- `publications.qmd` maintains Publications as a separate page.
- `assets/site.css`, `assets/site.js`, and `assets/site-template.html` control the shared appearance, navigation behavior, and page template.
- Images and institutional logos are stored in `assets/images/`.

Update the homepage directly when changing people, announcements, or admission information. Keep degree roles, joining dates, co-advisers, and admission requirements accurate.

## Local build

Build the site before committing:

```sh
quarto render
```

The generated site is written to `_site/`. For a local preview with automatic rebuilding, use:

```sh
quarto preview
```

## Deployment

Push reviewed source changes to `main`. The existing GitHub Actions workflow in `.github/workflows/publish.yml` builds the Quarto project and publishes it to `gh-pages`.

## Compatible links

Legacy page URLs remain available as redirects to the relevant homepage sections:

| Existing URL | Destination |
| --- | --- |
| `team.html` | `index.html#people` |
| `openings.html` | `index.html#join` |
| `vacancy.html` | `openings.html`, then `index.html#join` |
| `research.html` | `index.html#about` |
| `gallery.html` | `index.html#community` |

The compatibility pages use `redirect-to` front matter, a clickable fallback link, and `search: false`. The shared page template supplies the redirect and canonical metadata. Keep the `vacancy.html` alias in `openings.qmd` so existing application links continue to work.
