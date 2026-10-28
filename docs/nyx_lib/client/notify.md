# notify

Shows a small message (a "toast") on the screen. It does not wait and does not take the mouse.

## Client

```lua
nyx.notify(data)
```

| Field | Type | Description |
|---|---|---|
| `title` | string | The bold first line. |
| `description` | string | Smaller text under the title. |
| `type` | string | `'success'`, `'error'`, `'info'` or `'warning'`. Leave out for a plain notification. |
| `duration` | number | How long it stays, in milliseconds. |
| `position` | string | Where it appears, using the position names supported by Sonner (for example `'top-right'`, `'bottom-center'`). |

```lua
nyx.notify({
  title = 'Saved',
  description = 'Your changes were stored.',
  type = 'success',
  duration = 4000,
})
```

## Server

From a server script, send a notification to one player:

```lua
exports.nyx_lib:notify(source, { title = 'Welcome', description = 'Enjoy your stay', type = 'info' })
```

See also [server notify](/nyx_lib/server/notify).

## Good to know

- The same notification can also be called as `exports.nyx_lib:Notify(data)` on the client.
- Toasts are powered by [Sonner](https://sonner.emilkowal.ski), included with nyx_lib.
