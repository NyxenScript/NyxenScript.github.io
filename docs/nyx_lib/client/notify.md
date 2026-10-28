# notify

Shows a small message (a "toast") on the screen. It does not wait and does not take the mouse.

## Client

```lua
nyx.notify(data)
-- or, without init.lua:
exports.nyx_lib:notify(data)
```

| Field | Type | Description |
|---|---|---|
| `title` | string | The bold first line. |
| `description` | string | Smaller text under the title. |
| `type` | string | `'success'`, `'error'`, `'info'`, `'warning'` or `'loading'`. Each shows its own icon (`loading` shows a spinner). Leave out for a plain notification without an icon. |
| `duration` | number | How long it stays, in milliseconds. If left out, the shadcn toast uses its own default time. |

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

- The same notification can also be called as `exports.nyx_lib:Notify(data)` on the client. Both names do the same thing.
- Toasts are the shadcn **Toast** component (built on Base UI). They stack at the **bottom-right** corner of the screen. The position is not configurable. If you see a `position` field in older docs or scripts (from the time toasts used Sonner), it has no effect.
- Several notifications can be on screen at once. They stack and disappear on their own.
- `loading` toasts have no built-in way to be updated or dismissed from Lua. Give them a `duration`.
