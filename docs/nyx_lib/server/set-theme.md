# SetTheme

Changes the server-wide theme from another server script. The change is sent to every online player straight away and is remembered for next time.

```lua
local ok, err = exports.nyx_lib:SetTheme(partial)
```

## Parameters

`partial` is a table. Include only what you want to change:

| Field | Type | Description |
|---|---|---|
| `Preset` | string | `'default'` or a name from `web/presets.json`. |
| `Dark` | boolean | `true` for dark mode, `false` for light. |

## Returns

- `true` when it worked.
- `false` and a message when the preset name is unknown.

## Example

```lua
exports.nyx_lib:SetTheme({ Preset = 'nova-neutral', Dark = false })
```

## Good to know

- Only presets that are built into the web files can be used. See [Adding presets](/nyx_lib/theming/adding-presets).
- Players cannot trigger this. The server checks permission for the in-game panel itself, and only server code can call the export.
- The saved choice overrides the defaults in [`config.lua`](/nyx_lib/reference/config).
- The error message text is Indonesian (`preset tidak dikenal`, "unknown preset").
