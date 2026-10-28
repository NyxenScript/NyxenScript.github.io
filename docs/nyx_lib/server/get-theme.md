# GetTheme

Returns the theme that is currently active.

```lua
local theme = exports.nyx_lib:GetTheme()
-- {
--   BaseColor = 'Neutral', Theme = 'Neutral', ChartColor = 'Neutral',
--   Heading = 'Inherit', Font = 'Inter', Radius = 'Default', Dark = true
-- }
```

| Field | Type | Meaning |
|---|---|---|
| `BaseColor` | string | The base (grey) palette. |
| `Theme` | string | The accent colour. |
| `ChartColor` | string | The chart colours. |
| `Heading` | string | `'Inherit'` or the heading font. |
| `Font` | string | The main font. |
| `Radius` | string | Corner roundness. |
| `Dark` | boolean | Whether dark mode is on. |

The same function exists on the client, where it returns the theme that player's game currently shows:

```lua
local theme = nyx.getTheme()
-- or
local theme = exports.nyx_lib:GetTheme()
```

::: tip The client may be briefly out of date
When a player joins, the client starts with the values from `config.lua` until the server sends the real theme a moment later. Use the [`nyx_lib:themeChanged` event](/nyx_lib/reference/events) to react as soon as it arrives.
:::

Style, Icon Library, Menu and Menu Accent are not part of the result. They are baked into the components. Changing the returned table does nothing. Use [`SetTheme`](/nyx_lib/server/set-theme) to change the theme.
