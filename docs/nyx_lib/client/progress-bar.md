# progressBar

Shows a progress bar at the bottom of the screen, and waits until it is finished or cancelled.

```lua
local finished = nyx.progressBar(data)
-- or, without init.lua:
local finished = exports.nyx_lib:progressBar(data)
```

## Parameters

| Field | Type | Default | Description |
|---|---|---|---|
| `label` | string | empty | Text above the bar. |
| `duration` | number | `3000` | How long it takes, in milliseconds. |
| `canCancel` | boolean | `false` | If `true`, the player can cancel by pressing **X**. |

## Returns

- **`true`** when the bar reached 100%.
- **`false`** when the player cancelled.

## Example

```lua
local ok = nyx.progressBar({
  label = 'Repairing engine',
  duration = 5000,
  canCancel = true,
})

if ok then
  print('Repair finished')
else
  print('Repair cancelled')
end
```

## Good to know

- Your code waits until the bar ends.
- It does not take the mouse cursor, and it does not freeze the player or block controls. If you want the player to stand still or play an animation, do that yourself.
- The cancel key is **X** (game control 73).
