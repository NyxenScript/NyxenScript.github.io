# npm scripts

Run these inside `nyx_lib/web`.

| Command | What it does | When |
|---|---|---|
| `npm install` | Installs the web dependencies. | Once, and after pulling changes. |
| `npm run exports` | Reads `web/src/components/ui` and rewrites `client/component_list.lua` (the list behind the [per-component exports](/nyx_lib/ui/component-exports)). Prints for example `369 komponen -> client/component_list.lua` ("369 components"). | After adding a component, if you do not want a full build. |
| `npm run themes` | Collects the data for every value in `theme-codes.json` with the shadcn tool and writes `src/presets/*.css` and `theme-options.json`. Needs internet. Retries, and continues from `.themes-cache` after an interruption. Prints `selesai: BaseColor=..., Theme=..., ...` ("done"). | After editing `theme-codes.json`, or after changing the style. See [Adding theme options](/nyx_lib/theming/adding-options). |
| `npm run style -- <Name>` | Switches the Style (Vega, Nova, Maia, Lyra, Mira, Luma, Sera, Rhea): runs `shadcn apply` with its code, then `shadcn add --all --overwrite`. | See [Changing style, icons or menu](/nyx_lib/theming/style-and-icons). |
| `npm run build` | Runs `exports`, then a type-check (`tsc --noEmit`), then `vite build`. Creates `web/dist`. | After every change that should reach the game. |
| `npm run dev` | Starts a local preview in a browser. Development only. The game bridge is not available there. | Optional. |

Typical sequences:

```bash
# first install
npm install
npx shadcn@latest init --preset YOUR_PRESET_CODE
npx shadcn@latest add --all
npm run themes
npm run build

# add or change theme values
npm run themes
npm run build

# add a component
npx shadcn@latest add <name>
npm run build

# change the style
npm run style -- Vega
npm run themes
npm run build
```

After any of these, restart `nyx_lib` on the server (`ensure nyx_lib`).

## Notes

- `npm run presets` existed in version 0.2.0. It no longer exists. Use `npm run themes`.
- `npm run build` does not run `npm run themes`. Running `shadcn apply` by hand does not fill the drop-downs either. Only `npm run themes` writes `theme-options.json`.
- The build prints many font files and a warning that some chunks are larger than 500 kB. Both are normal. They come from the fonts and the component library.
