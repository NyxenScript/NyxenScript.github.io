# Changelog and migration

## 0.4.0 (current)

- **Theme made of separate options.** Base Color, Theme, Chart Color, Heading, Font and Radius are chosen one by one, plus dark mode. The single `Preset` setting is gone.
- **`npm run themes`** replaces `npm run presets`. It reads `web/theme-codes.json` and writes `web/src/presets/*.css` and `web/theme-options.json`.
- **Per-component exports.** Every shadcn component is an export (369 in the shipped build), generated into `client/component_list.lua` by `npm run build` or `npm run exports`. `emit` and `bind` are exports too.
- **New server exports:** `ResetTheme` and `GetOptions`. `SetTheme` now takes the individual options and validates them.
- **New `nyx_theme` forms:** `nyx_theme list`, `nyx_theme <Option> <Value>`, `nyx_theme dark|light` and `nyx_theme reset`.
- **Server event:** `nyx_lib:themeChanged` is now also triggered on the server.
- **Admin panel:** one drop-down per option, a dark mode switch, a reset button, and greyed-out fields for the baked-in choices (Style, Icon Library, Menu, Menu Accent).
- **`npm run style -- <Name>`** switches the Style.
- **Notifications** use the shadcn Toast component (Base UI). Sonner is no longer used. The `position` field mentioned in older docs has no effect, and the `loading` type is available.
- Only the file `web/theme-options.json` is needed on the server now. `web/presets.json` is not used.

## 0.3.1

- `init.lua` no longer mistakes props that have a `type` key (such as `{ type = 'text' }`) for a component node. This fixed React error #137 (`input is a void element`). Restarting `nyx_lib` is enough, no rebuild.

## 0.2.0

- Theme made of a `Preset` name (from `web/presets.json`) and `Dark`.
- `npm run presets` collected the CSS of each preset.

Versions between 0.2.0 and 0.4.0 are not described individually here.

## Migrating from 0.2.0 to 0.4.0

| Before (0.2.0) | Now (0.4.0) |
|---|---|
| `NyxConfig = { Preset = "default", Dark = true, ConfigCommand = ... }` | `NyxConfig = { BaseColor, Theme, ChartColor, Heading, Font, Radius, Dark, ConfigCommand }`. See [config.lua](/nyx_lib/reference/config). |
| `exports.nyx_lib:SetTheme({ Preset = 'nova-neutral', Dark = false })` | `exports.nyx_lib:SetTheme({ Theme = 'Blue', Radius = 'Large', Dark = false })`. A `Preset` key is ignored. The call still returns `true` when nothing else is given, but nothing changes. |
| `GetTheme()` returned `{ Preset, Dark }` | Returns `{ BaseColor, Theme, ChartColor, Heading, Font, Radius, Dark }`. |
| `nyx_lib:themeChanged` gave `{ Preset, Dark }` | Gives the full table of seven settings. |
| `nyx_theme <preset> [dark\|light]` | `nyx_theme <Option> <Value>`, `nyx_theme dark\|light`, `nyx_theme list`, `nyx_theme reset`. |
| `web/presets.json` and `npm run presets` | `web/theme-codes.json` and `npm run themes`. |
| Server needed `web/presets.json` | Server needs `web/theme-options.json`. |
| Docs listed `position` for `notify` (Sonner) | `position` has no effect. Toasts appear at the bottom-right. |
| Saved choice stored under the key of that version | Stored under `nyx_lib:theme3`. A choice saved by an older version under a different key is not read, so run `/nyx_config` once to set your look, or set `config.lua`. |

Steps:

1. Replace the resource files with the 0.4.0 ones.
2. In `web`, run `npm install`.
3. Run `npm run themes` (see [Adding theme options](/nyx_lib/theming/adding-options)).
4. Run `npm run build`.
5. Update your `config.lua` to the new format.
6. Upload `web/dist`, `web/theme-options.json` and the Lua files, then restart `nyx_lib`.
7. Search your own scripts for `Preset` and for `position` in `notify` calls.

Everything else (`Show`, `Hide`, `Update`, `Notify`, the ready-made functions and the tree format) is unchanged, so scripts that only use those need no edits.
