# alertDialog

Shows a confirmation pop-up and waits for the player to answer. Use it for "Are you sure?" moments.

```lua
local result = nyx.alertDialog(data)
-- or, without init.lua:
local result = exports.nyx_lib:alertDialog(data)
```

## Parameters

`data` is a table:

| Field | Type | Required | Description |
|---|---|---|---|
| `header` | string | no | Title of the pop-up. |
| `content` | string | no | The message under the title. |
| `cancel` | boolean | no | `true` shows a second button to cancel. Without it there is only the confirm button. |
| `labels` | table | no | Button texts: `{ confirm = '...', cancel = '...' }`. Defaults are `OK` and `Batal`. |

## Returns

A string: **`'confirm'`** or **`'cancel'`**.

Pressing **ESC** also returns `'cancel'`.

## Example

```lua
local result = nyx.alertDialog({
  header = 'Delete character?',
  content = 'This cannot be undone.',
  cancel = true,
  labels = { confirm = 'Delete', cancel = 'Keep' },
})

if result == 'confirm' then
  print('Deleted')
end
```

## Good to know

- Your code **pauses** until the player answers. See the note in [Quick start](/nyx_lib/guide/quick-start).
- `labels` replaces the default button texts. The default confirm text is `OK` and the default cancel text is `Batal` (Indonesian for "Cancel"), so set `labels.cancel` if your players do not read Indonesian.
- The window closes by itself after the answer.
- Built with the shadcn components `AlertDialog`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter` and `Button`.
