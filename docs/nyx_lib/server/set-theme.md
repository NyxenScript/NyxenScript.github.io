# SetTheme

Changes the server-wide theme from another server script. The change is sent to every online player straight away and is remembered for next time.

```lua
local ok, err = exports.nyx_lib:SetTheme(partial)
```

## Parameters

`partial` is a table. Include only the options you want to change. Options you leave out keep their current value.

| Field | Type | Example | Description |
|---|---|---|---|
| `BaseColor` | string | `'Zinc'` | The base (grey) palette. |
| `Theme` | string | `'Blue'` | The accent colour. |
| `ChartColor` | string | `'Emerald'` | The chart colours. |
| `Heading` | string | `'Inherit'` | `'Inherit'` (same as `Font`) or a font name. |
| `Font` | string | `'Space Grotesk'` | The main font. |
| `Radius` | string | `'Large'` | Corner roundness: `'Default'`, `'None'`, `'Small'`, `'Medium'` or `'Large'`. |
| `Dark` | boolean | `false` | `true` for dark mode, `false` for light. |

The valid text values are the ones in [`GetOptions`](/nyx_lib/server/get-options). Names are case-sensitive.

`Style`, `IconLibrary`, `Menu` and `MenuAccent` are **not** accepted. They are baked into the components. See [Changing style, icons or menu](/nyx_lib/theming/style-and-icons).

## Returns

- `true` when it worked.
- `false` and a message when something was wrong. Nothing is changed in that case. The checks are all-or-nothing, so one bad value cancels the whole call.

| Message | Meaning |
|---|---|
| `data tidak valid` | `partial` was not a table. |
| `nilai 'X' tidak tersedia untuk Theme` | "value 'X' is not available for Theme". The value is not a string, or is not in `web/theme-options.json`. |

## Example

```lua
local ok, err = exports.nyx_lib:SetTheme({ Theme = 'Blue', Radius = 'Large', Dark = false })
if not ok then print('SetTheme failed: ' .. tostring(err)) end
```

## Good to know

- Only values that were built into the web files (listed in `theme-options.json`) can be used. See [Adding theme options](/nyx_lib/theming/adding-options).
- Players cannot call this. The in-game panel checks the `nyx_lib.config` permission on the server, and only server code can call the export.
- The saved choice overrides the defaults in [`config.lua`](/nyx_lib/reference/config). To go back to `config.lua`, call [`ResetTheme`](/nyx_lib/server/reset-theme).
- After a successful call the server triggers the `nyx_lib:themeChanged` event for other server scripts, and every player receives the new theme. See [Events](/nyx_lib/reference/events).
- The error message texts are Indonesian.
