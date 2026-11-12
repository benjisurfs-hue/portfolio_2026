# Benjamin Kim — Portfolio 2026

Static portfolio with FirstThought, Soventure, and Cureatr case studies, plus a resume page.

## Run locally

No dependency installation or build is required. Serve this directory with:

```sh
python3 -m http.server 3000
```

Open http://localhost:3000.

## Edit

- `index.html`: portfolio homepage
- `firstthought.html`, `insurance.html`, `cureatr.html`: case studies
- `resume.html`: resume
- `style.css`: layout and styling
- `video-controls.js`: video preview and playback controls
- `assets/`: images, SVG icons, and demo movies

The workflow, ideation, and SMS diagrams are built with HTML and CSS. Main videos autoplay muted with Pause and Restart controls below. Cureatr and On the Traverse use autoplaying GIF demos. Enlarged images open in an accessible modal; section 5 galleries include Previous and Next controls.

## Case-study layout

The four main case studies use `case-study-layout.css` and `case-study-layout.js`, implementing the portfolio-skeleton Figma layout. Figma exports are stored in `assets/case-study-layout/`; existing movies and GIFs supply optional motion. The previous `*-structured.html` review links mirror the main case studies.

Layout reference and editorial follow-ups are recorded in `case-study-research/layout-update/NOTES.md`.
