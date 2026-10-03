# lizhongyu-space.github.io

Technical documentation for the source repository of the personal GitHub Pages site.

> This README focuses on the codebase, data flow, asset pipeline, and maintenance conventions. It intentionally avoids detailed description of the website's visual/content design.

## 1. Project Overview

This repository is a static website deployed through GitHub Pages.

The project does not use a frontend framework or a package manager. Pages are built with:
- HTML5 for page structure
- CSS for layout, typography, responsive behavior, and theme variables
- Vanilla JavaScript for shared UI behavior and page-specific logic
- JavaScript data manifests for photo/postcard data
- GitHub Actions for automatic gallery image processing

There is currently no build step, bundler, or runtime server.

## 2. Repository Structure

~~~text
.
├── .github/
│   └── workflows/
│       └── gallery-thumbnails.yml   # Gallery image processing
├── css/
│   ├── style.css                    # Main shared stylesheet
│   └── theme.css                    # Theme variables / visual tokens
├── js/
│   ├── main.js                      # Shared site logic and common UI
│   ├── lang.js                      # Language state / switching
│   ├── welcome.js                   # Landing-page entrance animation
│   ├── photos.js                    # Gallery photo manifest
│   ├── postcards.js                 # Postcrossing data
│   ├── postcrossing.js              # Postcrossing page logic
│   ├── worldmap.js                  # Map data / map rendering support
│   ├── globalphotos.js              # Global View photo data
│   └── globalview.js                # Global View page logic
├── gallery/                         # Original photo archive
├── gallery-thumbs/                  # Web-optimized gallery thumbnails
├── gallery-display/                 # Web-optimized display images
├── index.html
├── about.html
├── gallery.html
├── postcrossing.html
├── globalview.html
├── contact.html
├── 404.html
├── .gitignore
└── README.md
~~~

The exact file list may grow as the site develops; the important separation is between page structure, shared code, page-specific code, data manifests, and media assets.

## 3. JavaScript Architecture

The project uses small, page-oriented JavaScript modules rather than a framework.

### `main.js`

`main.js` contains functionality shared by multiple pages, including navigation/sidebar behavior, common UI, footer/common elements, shared interaction behavior, and Gallery rendering/lightbox behavior.

### `lang.js`

Handles language state and language switching.

Theme CSS is loaded directly by HTML rather than dynamically injected by JavaScript. This keeps stylesheet loading predictable and avoids unnecessary JavaScript work during page initialization.

### Page-specific scripts

| File | Responsibility |
| --- | --- |
| `welcome.js` | Landing-page entrance sequence |
| `photos.js` | Gallery categories and photo metadata |
| `postcards.js` | Postcard data |
| `postcrossing.js` | Postcrossing page behavior |
| `worldmap.js` | Map data and map-related rendering |
| `globalphotos.js` | Global View photo data |
| `globalview.js` | Global View interactions |

External scripts are loaded with `defer` where appropriate, preserving dependency order while avoiding parser-blocking script execution.

## 4. Gallery Data and Image Pipeline

The Gallery deliberately separates original files from web resources.

### Source

Original photos are stored under:

~~~text
gallery/
~~~

These files act as the source/archive layer.

### Generated web images

GitHub Actions generates two derived layers:

~~~text
gallery-thumbs/
gallery-display/
~~~

The workflow is defined in `.github/workflows/gallery-thumbnails.yml`.

The current pipeline:
1. Reads supported source images from `gallery/`.
2. Handles JPG/JPEG, PNG, HEIC/HEIF, and WebP inputs.
3. Applies EXIF orientation when processing images.
4. Generates WebP derivatives.
5. Produces approximately:
   - `gallery-thumbs/`: max 1200 × 1200
   - `gallery-display/`: max 2400 × 2400
6. Removes derived files whose source originals have been deleted.

The Gallery card view uses the thumbnail layer, not the original archive files.

This prevents large original photographs from being downloaded unnecessarily during normal Gallery rendering.

## 5. Gallery Runtime Loading

Gallery images use browser-native performance features:

~~~html
<img loading="lazy" decoding="async">
~~~

The runtime therefore avoids eagerly loading and decoding every image on initial page load.

The current Gallery keeps photo metadata in `photos.js` rather than embedding image data directly in HTML.

At the current scale, the Gallery renders the filtered photo list as DOM elements at once. This is intentional: for a relatively small collection, it keeps the implementation simple without introducing virtualization complexity.

Future performance guideline:

| Gallery size | Recommended approach |
| ---: | --- |
| < 200 photos | Current implementation |
| 200–500 | Monitor rendering/DOM cost |
| 500–1000 | Consider pagination or batched rendering |
| > 1000 | Consider virtualization or pagination |

## 6. CSS Architecture

### `css/style.css`

Contains the main shared layout and component styling, including navigation, typography, cards, controls, tables, responsive behavior, and shared interactive components.

### `css/theme.css`

Contains theme-level visual variables/tokens.

Static pages link the theme stylesheet directly in HTML rather than relying on JavaScript to insert it dynamically. This keeps the rendering path simpler and reduces the possibility of late theme application.

## 7. HTML Pages

The project uses independent HTML entry points rather than client-side routing.

| Page | Main role |
| --- | --- |
| `index.html` | Landing page |
| `about.html` | About/profile content |
| `gallery.html` | Photo gallery |
| `postcrossing.html` | Postcrossing data and map |
| `globalview.html` | Global View content |
| `contact.html` | Contact page |
| `404.html` | GitHub Pages fallback page |

This structure keeps each page directly addressable and compatible with GitHub Pages without a server-side application.

## 8. Loading and Performance Strategy

The current codebase follows several performance rules:
- Use WebP derivatives for Gallery resources.
- Use `loading="lazy"` for non-critical images.
- Use `decoding="async"` for image decoding where appropriate.
- Load JavaScript with `defer`.
- Keep page-specific JavaScript separate from shared code.
- Avoid unnecessary third-party runtime dependencies.
- Avoid loading original archive images in normal Gallery rendering.
- Keep metadata manifests compact.
- Avoid unnecessary DOM work during initial page load.

The project intentionally does not aggressively minify or bundle the JavaScript at this stage. The site is small enough that maintainability and low-risk changes are more valuable than introducing a build pipeline solely for minification.

## 9. Data and Privacy Conventions

Photo metadata should be treated as public web data.

The Gallery uses location references at the city/region level rather than exposing original precise GPS coordinates.

Original XMP metadata should not be published as part of the web-facing asset set.

When adding new photo data:
- Do not expose precise home/private-location coordinates.
- Do not add unnecessary personal metadata.
- Keep `photos.js` consistent with the existing manifest structure.
- Ensure every referenced thumbnail exists.
- Prefer generated WebP assets for browser delivery.

## 10. Development and Maintenance

There is no local build command required.

A normal maintenance workflow is:

~~~text
1. Inspect the current main branch.
2. Identify the smallest set of files that need changing.
3. Make a surgical change.
4. Check JavaScript syntax.
5. Check HTML/resource references.
6. Verify generated assets and data references.
7. Commit to main.
8. Verify the resulting GitHub tree/commit.
9. Check GitHub Pages deployment when the change affects the live site.
~~~

Do not perform broad refactors for a targeted change.

Before changing shared files such as `main.js`, `style.css`, `lang.js`, or `worldmap.js`, check which pages depend on them.

For data-only updates, modify the relevant manifest rather than changing rendering code.

## 11. GitHub Actions

The repository currently uses GitHub Actions for gallery derivative generation:

` .github/workflows/gallery-thumbnails.yml `

This workflow is part of the asset pipeline and should be preserved when modifying Gallery storage or image-processing logic.

If the workflow is changed, verify both generated file paths and generated image dimensions/formats before considering the change complete.

## 12. Performance Baseline

A stable rollback branch is preserved:

`baseline-2026-10-03-stable`

Baseline commit:

`5fbcb16ecd73e133d06d98206fcf955773473eb8`

This baseline should be preserved unless there is an explicit reason to replace it.

The current codebase includes a low-risk performance maintenance pass covering:
- compact Gallery metadata
- removal of accidental macOS `.DS_Store` files
- `.gitignore` protection against those files
- static theme stylesheet loading
- deferred JavaScript loading
- asynchronous image decoding in Global View
- Gallery cache-key refresh

No build/minification system was introduced by that pass.

## 13. Change Principles

For future maintenance, prefer:

**Small change → verify → commit → inspect deployment**

rather than large-scale refactoring.

Keep the three-layer Gallery model intact:

~~~text
originals
   ↓
generated WebP assets
   ↓
browser runtime
~~~

This separation is one of the main architectural protections for maintainability and performance.

## License / Usage

This repository is a personal project. Unless otherwise stated, the source code and media assets are not licensed for redistribution or reuse.

If you are reviewing or contributing to the code, preserve the existing data structure and do not modify personal media or metadata without authorization.