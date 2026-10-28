# notify (server)

Sends a notification to one player from a server script.

```lua
exports.nyx_lib:notify(source, data)
```

| Parameter | Type | Description |
|---|---|---|
| `source` | number | The player's server id. |
| `data` | table | Same fields as the client [`notify`](/nyx_lib/client/notify): `title`, `description`, `type`, `duration`. |

## Example

```lua
RegisterCommand('welcome', function(src)
  exports.nyx_lib:notify(src, {
    title = 'Welcome',
    description = 'Glad you are here.',
    type = 'info',
  })
end, false)
```

Pass `-1` as `source` to notify every player. (The server simply forwards the data to FiveM's `TriggerClientEvent`, so any valid target works.)

::: warning Use the export on the server
The `nyx.` shortcuts from `init.lua` are meant for **client** scripts. On the server, call `exports.nyx_lib:...` directly.
:::
