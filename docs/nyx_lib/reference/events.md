# Events

## Events you can listen to (client)

| Event | Data | When |
|---|---|---|
| `nyx_lib:themeChanged` | `theme` (`{ Preset, Dark }`) | The server theme was applied or changed. Optional to use. |
| `nyx_lib:emit` | `data` (`{ id, event, value, values }`) | Any custom window sent an event. See [Events and inputs](/nyx_lib/ui/events-and-inputs). |

```lua
AddEventHandler('nyx_lib:themeChanged', function(theme) end)
```

## Internal events

These are used by nyx_lib itself. Do not trigger them from your scripts.

| Event | Side | Purpose |
|---|---|---|
| `nyx_lib:requestTheme` | server | A player asks for the current theme when joining. |
| `nyx_lib:setTheme` | server | The admin panel asks to change the theme. Rejected unless the player has the `nyx_lib.config` permission. |
| `nyx_lib:applyTheme` | client | The server sends the theme to players. |
| `nyx_lib:openConfig` | client | The server opens the admin panel for an allowed admin. |
| `nyx_lib:notify` | client | The server asks a player to show a notification. Use the [server export](/nyx_lib/server/notify) instead. |
