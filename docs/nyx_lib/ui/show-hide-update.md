# show / hide / update

These three functions open, close and change custom windows made with [builders](/nyx_lib/ui/builders) or a [raw tree](/nyx_lib/ui/raw-tree).

## nyx.show

```lua
local result = nyx.show(tree, wait, keepFocus)
```

| Parameter | Type | Description |
|---|---|---|
| `tree` | node | The window, built with builders. |
| `wait` | boolean | `true`: pause until the player does something, then return what happened. `false` or omitted: return immediately. |
| `keepFocus` | boolean | Whether the window takes the mouse cursor. **Defaults to `true`**. Pass `false` for overlays the player should not click, like hints. |

**Returns**

- With `wait = false`: the **id** (a number) of the window.
- With `wait = true`: a table `{ id, event, value, values }` describing what the player did (see [Events and inputs](/nyx_lib/ui/events-and-inputs)), or `nil` if the window was closed with ESC.

::: warning The window stays open
Unlike the ready-made functions, `show` does **not** close the window after you get the result. Close it yourself with `nyx.hide(result.id)`.
:::

## nyx.hide

```lua
nyx.hide(id)   -- close one window
nyx.hide()     -- close ALL windows
```

When no window with the mouse cursor is left open, the cursor is released automatically. Anyone still waiting on a closed window receives `nil`.

## nyx.update

```lua
nyx.update(id, tree)
```

Replaces the content of an open window with a new tree. Use it to change text or progress without flashing a new window. Since a waiting `show` pauses its own thread, call `update` from another thread.

## Also good to know

- Pressing **ESC** closes every window that has the mouse cursor.
- If nyx_lib is stopped or restarted, the mouse cursor is released.
- Several windows can be open at once. Each has its own id.
