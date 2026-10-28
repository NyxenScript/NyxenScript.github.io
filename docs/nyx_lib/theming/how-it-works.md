# How theming works

All nyx_lib windows share **one theme for the whole server**. The server owner (dev) chooses it. Players cannot change it, and every script that uses nyx_lib follows it automatically. Script authors never need to update their code when the theme changes.

## Two kinds of choices

### 1. Decided at build time

When you run `npx shadcn@latest init --preset YOUR_CODE`, the preset's choices are baked into the web files:

- Style
- Icon Library
- Anything built into the component code (such as Menu)

Changing these needs a rebuild. See [Changing style or icons](/nyx_lib/theming/style-and-icons).

### 2. Switchable while the game runs

Presets listed in `web/presets.json` can be switched live. What changes live is everything made of CSS variables:

- colours
- chart colours
- corner radius
- sidebar colours
- dark / light mode

## The theme has two settings

| Setting | Values |
|---|---|
| `Preset` | `'default'` (the preset used at build time) or a name from `presets.json` |
| `Dark` | `true` or `false` |

## Where the theme comes from

1. [`config.lua`](/nyx_lib/reference/config) provides the starting default.
2. When an admin changes it, the choice is saved on the server and **replaces** that default from then on.
3. Each player receives the current theme when they join, and again whenever it changes.

## Ways to change it

- In game: the [admin panel](/nyx_lib/theming/admin-panel) (`/nyx_config`).
- Console: `nyx_theme <preset> [dark|light]`.
- From code: [`SetTheme`](/nyx_lib/server/set-theme).
