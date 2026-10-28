# Raw tree format

Builders are a convenient way to write a window. Under the hood, a window is just a nested Lua table, a **tree**. You can write it by hand and send it with the `Show` export.

## Shape of a node

```lua
{
  type = 'ComponentName',      -- a shadcn component name, or an HTML tag like 'div'
  props = { ... },             -- optional settings
  children = ...,              -- optional: a string, or a list of nodes
}
```

## Special values inside props

| Value | Meaning | Builder equivalent |
|---|---|---|
| `{ __emit = 'name' }` | Send an event named `name` back to Lua. | `nyx.emit('name')` |
| `__bind = { name = '...', kind = '...', default = ... }` | Remember a field value. | `__bind = nyx.bind(...)` |

## Example

```lua
local r = exports.nyx_lib:Show({
  type = 'AlertDialog', props = { open = true },
  children = {{ type = 'AlertDialogContent', children = {
    { type = 'AlertDialogTitle', children = 'Sure?' },
    { type = 'Button', props = { onClick = { __emit = 'yes' } }, children = 'Yes' },
  }}}
}, true)

-- r = { id = 1, event = 'yes' }
```

## Notes

- The second argument of `Show` is `wait`. The third is `keepFocus`. See [show / hide / update](/nyx_lib/ui/show-hide-update).
- The tree format is **stable**. Scripts written against it keep working when you change the theme or preset.
- `children` can be a single text string or a list. A list may mix text and nodes.
