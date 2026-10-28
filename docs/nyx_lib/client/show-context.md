# showContext

Shows a menu of clickable choices and waits for the player to pick one.

```lua
local index = nyx.showContext(ctx)
```

## Parameters

`ctx` is a table:

| Field | Type | Description |
|---|---|---|
| `title` | string | Title of the menu. |
| `options` | table | A list of menu entries (see below). |

Each entry in `options`:

| Field | Type | Description |
|---|---|---|
| `title` | string | The main text of the entry. |
| `description` | string | Smaller grey text under the title. |
| `disabled` | boolean | `true` greys the entry out so it cannot be clicked. |
| `onSelect` | function | Runs when the entry is chosen. |
| `args` | any | Passed to `onSelect` as its only argument. |

## Returns

The **number** of the chosen entry (first entry is `1`), or **`nil`** if the player closed the menu with ESC.

## Example

```lua
local choice = nyx.showContext({
  title = 'Garage',
  options = {
    { title = 'Take out car', description = 'Costs nothing' },
    { title = 'Repair', description = '$250', onSelect = function(args)
        print('Repairing', args)
      end, args = 'my_car' },
    { title = 'Sell', disabled = true },
  },
})

if choice == 1 then
  print('Taking out the car')
end
```

## Good to know

- `onSelect` runs inside a protected call, so an error inside it will not crash your script.
- Your code waits until the player chooses.
- Built with the shadcn components `Dialog` and `Button`.
