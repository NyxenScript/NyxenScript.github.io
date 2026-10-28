# Events and inputs

A custom window needs to tell your Lua code what the player did. nyx_lib has two small tools for this: **emit** (for clicks and changes) and **bind** (for remembering typed values).

## nyx.emit: "tell me when this happens"

```lua
nyx.Button({ onClick = nyx.emit('save') }, 'Save')
```

Put `nyx.emit('name')` on any event prop, such as `onClick`, `onOpenChange`, `onValueChange` or `onCheckedChange`. When the player triggers it, nyx_lib sends a message with that name back to Lua.

With `nyx.show(tree, true)`, the first emit ends the wait and gives you this table:

| Field | Meaning |
|---|---|
| `id` | The window's id. |
| `event` | The name you gave to `nyx.emit`. |
| `value` | The value from the component when it is a simple value, such as the chosen text of a `Select` or `true`/`false` of a `Switch`. It is `nil` for plain clicks. |
| `values` | Everything saved by `nyx.bind` fields (see below), keyed by the field name as a string. |

### Reacting without waiting

If you open a window with `wait = false`, listen for the event instead. Every emit also triggers a local client event:

```lua
local id = nyx.show(tree) -- does not wait

AddEventHandler('nyx_lib:emit', function(data)
  if data.id ~= id then return end
  if data.event == 'save' then
    print('Saved!', json.encode(data.values))
    nyx.hide(id)
  end
end)
```

## nyx.bind: "remember what the player typed"

```lua
nyx.Input({ placeholder = 'Name', __bind = nyx.bind('name', 'text', '') })
```

`nyx.bind(name, kind, default)`:

| Argument | Meaning |
|---|---|
| `name` | The key to store the value under. It shows up in `values`. |
| `kind` | What kind of field it is (table below). |
| `default` | The starting value. |

| `kind` | Use it on | Stored value |
|---|---|---|
| `'text'` (default) | `Input`, `Textarea` | string |
| `'number'` | `Input` with `type = 'number'` | number, or `nil` when empty |
| `'value'` | `Select` | the chosen value |
| `'checked'` | `Checkbox`, `Switch` | `true` / `false` |
| `'slider'` | `Slider` | number |

Set it through the special prop name `__bind`, as shown above.

## Full example

```lua
local r = nyx.show(
  nyx.Dialog({ open = true, onOpenChange = nyx.emit('close') },
    nyx.DialogContent(
      nyx.DialogHeader(nyx.DialogTitle('Quick note')),
      nyx.Input({ placeholder = 'Your name', __bind = nyx.bind('name', 'text', '') }),
      nyx.Switch({ __bind = nyx.bind('urgent', 'checked', false) }),
      nyx.DialogFooter(
        nyx.Button({ onClick = nyx.emit('send') }, 'Send')
      )
    )
  ),
  true
)

if r and r.event == 'send' then
  print(r.values.name, r.values.urgent)
end
if r then nyx.hide(r.id) end
```

::: tip Want less work?
For forms, [`inputDialog`](/nyx_lib/client/input-dialog) already does all of this for you, including required-field checks.
:::
