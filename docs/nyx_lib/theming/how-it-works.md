# How theming works

All nyx_lib windows share **one theme for the whole server**. The server owner (dev) chooses it. Players cannot change it, and every script that uses nyx_lib follows it automatically. Script authors never need to update their code when the theme changes, because their scripts only send component names, never colours.

## Two kinds of choices

The theme follows the options of <https://ui.shadcn.com/create>. nyx_lib splits them into those that can change while the game runs, and those that are part of the component code.

### 1. Switchable while the game runs

| Option | What it changes | Example values |
|---|---|---|
| **Base Color** | The base (grey) palette: backgrounds, borders, muted text | Neutral, Stone, Zinc, Mauve, Olive, Mist, Taupe |
| **Theme** | The accent colour (buttons, highlights) | Neutral, Amber, Blue, Cyan, Emerald, ... Yellow |
| **Chart Color** | The colours of charts | Neutral, Amber, Blue, ... Yellow |
| **Heading** | The font of headings | `Inherit` (same as Font) or any font |
| **Font** | The main font | Sans (Inter, Geist, Roboto...), Mono, Serif |
| **Radius** | Corner roundness | Default, None, Small, Medium, Large |
| **Dark mode** | Dark or light | on / off |

The exact list of values on your server is whatever is in `web/theme-options.json`. See [Adding theme options](/nyx_lib/theming/adding-options).

### 2. Baked into the components (needs a rebuild)

| Option | Where it is decided |
|---|---|
| **Style** (Vega, Nova, Maia, Lyra, Mira, Luma, Sera, Rhea) | The shape of every component. |
| **Icon Library** | Which icons the components use. |
| **Menu** (Default or Inverted, Solid or Translucent) | The look of menus and popovers. |
| **Menu Accent** (Subtle or Bold) | The highlight in menus. |

`/nyx_config` shows these four greyed out, with the value read from `web/components.json`. To change them, see [Changing style, icons or menu](/nyx_lib/theming/style-and-icons).

## The theme in numbers

The theme is a table with seven settings:

| Setting | Type | Values |
|---|---|---|
| `BaseColor` | string | one of the Base Color values |
| `Theme` | string | one of the Theme values |
| `ChartColor` | string | one of the Chart Color values |
| `Heading` | string | `'Inherit'` or a font name |
| `Font` | string | a font name |
| `Radius` | string | one of the Radius values |
| `Dark` | boolean | `true` or `false` |

There is no "preset name" any more. Older versions had a single `Preset` setting. See [Changelog and migration](/nyx_lib/reference/changelog).

## Where the theme comes from

1. [`config.lua`](/nyx_lib/reference/config) provides the starting default.
2. When an admin changes something, the choice is saved on the server (in FiveM's KVP storage) and **replaces** that default from then on. It survives restarts.
3. Each player receives the current theme when they join, and again whenever it changes.
4. `nyx_theme reset`, the **Reset ke config.lua** button or [`ResetTheme`](/nyx_lib/server/reset-theme) delete the saved choice and go back to `config.lua`.

The server checks every change itself. It rejects a value that is not in `web/theme-options.json`, and it ignores requests from players without the `nyx_lib.config` permission. A saved value that is no longer in the options file (for example after you removed it) is ignored when the server starts.

## Ways to change it

- In game: the [admin panel](/nyx_lib/theming/admin-panel) (`/nyx_config`).
- Console or chat: `nyx_theme list`, `nyx_theme Theme Blue`, `nyx_theme dark`, `nyx_theme reset`.
- From code: [`SetTheme`](/nyx_lib/server/set-theme), [`ResetTheme`](/nyx_lib/server/reset-theme).
- Listen for changes: the [`nyx_lib:themeChanged` event](/nyx_lib/reference/events).

## Under the hood (for the curious)

You do not need this to use nyx_lib.

- When the web part receives the theme it adds or removes the `dark` class on the page and sets one attribute per option: `data-nyx-base`, `data-nyx-theme`, `data-nyx-chart`, `data-nyx-heading`, `data-nyx-font` and `data-nyx-radius`.
- `npm run themes` wrote CSS rules for each value, such as `:root[data-nyx-theme="Blue"] { ... }`, into `web/src/presets/` (`base.css`, `theme.css`, `chart.css`, `radius.css`, `fonts.css`). Only the CSS variables that differ from the default are stored. They come from the shadcn tool, never from nyx_lib itself.
- The files are loaded in the order base, theme, chart, radius. So a Theme value wins over a Base Color value when both set the same variable.
- Fonts use two variables, `--nyx-font-sans` and `--nyx-font-heading`, which `web/src/nyx/runtime.css` applies to the page. This is what lets fonts change live.
- Because all of this CSS is compiled into `web/dist`, adding a value always needs `npm run themes` and `npm run build`.
