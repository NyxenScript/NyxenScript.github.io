# Events

## Events you can listen to

| Event | Side | Data | When |
|---|---|---|---|
| `nyx_lib:themeChanged` | client | `theme` (`{ BaseColor, Theme, ChartColor, Heading, Font, Radius, Dark }`) | The server theme was applied or changed on this player's game. Optional to use. |
| `nyx_lib:themeChanged` | server | `theme` (same table) | The theme changed on the server (after `SetTheme`, `ResetTheme`, the panel or `nyx_theme`). Optional to use. |
| `nyx_lib:emit` | client | `data` (`{ id, event, value, values }`) | Any custom window sent an event. See [Events and inputs](/nyx_lib/ui/events-and-inputs). |

```lua
-- client or server
AddEventHandler('nyx_lib:themeChanged', function(theme)
  print(theme.Theme, theme.Font, theme.Dark)
end)
```

Notes:

- On the client, the event also fires when the player joins and receives the theme for the first time.
- `nyx_lib:emit` fires for **every** window, including nyx_lib's own (such as the config panel). Always compare `data.id` with the id of your own window.
- The theme table has the seven settings only. Style, Icon Library, Menu and Menu Accent are not included.

## Internal events

These are used by nyx_lib itself. Do not trigger them from your scripts.

| Event | Side | Purpose |
|---|---|---|
| `nyx_lib:requestTheme` | server | A player asks for the current theme when joining. |
| `nyx_lib:setTheme` | server | The admin panel asks to change the theme. Rejected unless the player has the `nyx_lib.config` permission. Values that are not in `theme-options.json` are rejected too. |
| `nyx_lib:resetTheme` | server | The panel's **Reset ke config.lua** button. Rejected unless the player has the `nyx_lib.config` permission. |
| `nyx_lib:applyTheme` | client | The server sends the theme to players. |
| `nyx_lib:openConfig` | client | The server opens the admin panel for an allowed admin. It sends the current theme and the list of values. |
| `nyx_lib:notify` | client | The server asks a player to show a notification. Use the [server export](/nyx_lib/server/notify) instead. |

## Messages between Lua and the web page (internal)

Useful when you work on the web part. Scripts never need these.

| Name | Direction | Data | Purpose |
|---|---|---|---|
| `nyx:show` | Lua to web | `{ id, tree }` | Open a window, or replace its content if the id is already open. |
| `nyx:hide` | Lua to web | `{ id }` or empty | Close one window, or all windows when no id. |
| `nyx:theme` | Lua to web | the theme table | Apply the theme. |
| `nyx:toast` | Lua to web | `{ title, description, type, duration }` | Show a notification. |
| `nyx:ready` | web to Lua | none | The page loaded. Lua replies with `nyx:theme`. |
| `nyx:emit` | web to Lua | `{ id, event, value, values }` | A component event. Resolves a waiting `Show` and fires `nyx_lib:emit`. |
| `nyx:close` | web to Lua | `{ id }` or empty | The player pressed ESC (all windows) or closed one. |
