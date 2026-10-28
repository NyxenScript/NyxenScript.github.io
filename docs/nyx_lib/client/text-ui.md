# showTextUI / hideTextUI

Shows a small hint box on screen, such as "[E] Open door", until you hide it.

```lua
nyx.showTextUI(text, opts)
nyx.hideTextUI()
-- or, without init.lua:
exports.nyx_lib:showTextUI(text, opts)
exports.nyx_lib:hideTextUI()
```

## Parameters

| Name | Type | Description |
|---|---|---|
| `text` | string | The text to show. |
| `opts.position` | string | `'right-center'` (default), `'left-center'`, `'top-center'` or `'bottom-center'`. |

## Returns

Nothing.

## Example

```lua
CreateThread(function()
  local shown = false
  while true do
    local near = true -- replace with your own distance check
    if near and not shown then
      nyx.showTextUI('[E] Open door', { position = 'right-center' })
      shown = true
    elseif not near and shown then
      nyx.hideTextUI()
      shown = false
    end
    Wait(200)
  end
end)
```

## Good to know

- Calling `showTextUI` again while a hint is showing **replaces** the text.
- It does **not** take the mouse cursor, so the player keeps playing normally.
- Only one hint is shown at a time.
- Always call `hideTextUI` when the player leaves the area.
