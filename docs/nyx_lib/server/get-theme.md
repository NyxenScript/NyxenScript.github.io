# GetTheme

Returns the theme that is currently active.

```lua
local theme = exports.nyx_lib:GetTheme()
-- { Preset = 'default', Dark = true }
```

| Field | Type | Meaning |
|---|---|---|
| `Preset` | string | Name of the active preset. `'default'` is the one chosen at build time. |
| `Dark` | boolean | Whether dark mode is on. |

The same function exists on the client:

```lua
local theme = nyx.getTheme()
```

To be told when the theme changes, see the [`nyx_lib:themeChanged` event](/nyx_lib/reference/events).
