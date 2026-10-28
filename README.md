# Nyx Docs

Documentation website for my FiveM scripts, built with [VitePress](https://vitepress.dev). One folder in `docs/` per script (currently `nyx_lib`).

Step-by-step guide from zero (Indonesian): see **[TUTORIAL.md](TUTORIAL.md)**.

## Quick commands

```bash
npm install                      # once
npm run dev                      # live preview at http://localhost:5173
npm run build                    # final site in docs/.vitepress/dist
npm run new-script -- my_script  # create docs for a new script
```

Before publishing, set `REPO` at the top of `docs/.vitepress/config.mts`. The site deploys to GitHub Pages automatically on every push to `main` (Settings → Pages → Source: GitHub Actions).
