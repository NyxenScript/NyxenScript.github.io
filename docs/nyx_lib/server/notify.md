# notify (server)

Sends a notification to one player from a server script.

```lua
exports.nyx_lib:notify(source, data)
```

| Parameter | Type | Description |
|---|---|---|
| `source` | number | The player's server id. |
| `data` | table | Same fields as the client [`notify`](/nyx_lib/client/notify): `title`, `description`, `type`, `duration`, `position`. |

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

::: warning Use the export on the server
The `nyx.` shortcuts from `init.lua` are meant for **client** scripts. On the server, call `exports.nyx_lib:...` directly.
:::
