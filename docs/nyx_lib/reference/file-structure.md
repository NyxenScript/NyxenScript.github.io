# File structure

```text
nyx_lib/
  fxmanifest.lua        Resource description (name, version, files to load)
  config.lua            Default theme settings
  init.lua              Creates the global `nyx` in other scripts
  README.md             Short overview
  INSTALL.md            Installation guide
  client/
    main.lua            Core: opens/closes windows, theme, NUI messages, admin panel
    components.lua      Ready-made functions: alertDialog, inputDialog, ...
  server/
    main.lua            Saves/sends the theme, commands, permission check, notify
  web/                  The web interface (needs building)
    package.json        Web dependencies and scripts
    presets.json        List of switchable presets
    index.html          Entry page
    vite.config.ts      Build settings
    tsconfig.json       TypeScript settings
    scripts/
      snapshot-presets.mjs   Used by `npm run presets`
    src/
      main.tsx          Starts the web app
      App.tsx           Turns trees from Lua into real components
      index.css         Tailwind and theme variables
      presets/          Saved CSS for each preset (generated)
      nyx/
        bridge.ts       Sends messages from the web page back to Lua
        classes.ts      Tailwind classes used from Lua
        registry.ts     Finds all shadcn components automatically
        theme.ts        Applies preset and dark mode
      components/ui/    shadcn components (created by `shadcn add --all`)
    dist/               Built result (created by `npm run build`)
```

## What the server really needs

`web/dist/`, `web/presets.json`, and the Lua files. Not `web/node_modules`.

## npm scripts (inside `web/`)

| Command | Does |
|---|---|
| `npm run build` | Type-checks and builds `web/dist`. |
| `npm run dev` | Starts a local preview in a browser (development only). |
| `npm run presets` | Saves CSS for every preset in `presets.json`. |
