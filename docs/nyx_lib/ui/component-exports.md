# Component exports

Every shadcn component that is installed in nyx_lib is also a normal **export**. You can build a window without `init.lua`, from Lua, JavaScript or C#.

```lua
local nx = exports.nyx_lib

local r = nx:Show(
  nx:AlertDialog({ open = true },
    nx:AlertDialogContent(
      nx:AlertDialogHeader(
        nx:AlertDialogTitle('Sure?'),
        nx:AlertDialogDescription('This cannot be undone.')),
      nx:AlertDialogFooter(
        nx:Button({ variant = 'outline', onClick = nx:emit('no') }, 'Cancel'),
        nx:Button({ onClick = nx:emit('yes') }, 'Yes')))),
  true) -- true = wait for the player

-- r = { id = 1, event = 'yes' }
if r then nx:Hide(r.id) end
```

The export names are **exactly** the shadcn component names, with the same capital letters: `Button`, `Dialog`, `DialogContent`, `Select`, `SelectItem`, `Switch`, `Tabs`, `Progress` and so on. There are **369** of them in the shipped build.

## How to call one

```lua
exports.nyx_lib:ComponentName(props, child1, child2, ...)
```

It follows the same rules as the [`nyx.` builders](/nyx_lib/ui/builders):

- The first argument may be a plain table of props. It is optional.
- Everything after that are children: text, numbers, other component calls, or a list of them.
- The result is a **node** (`{ type, props, children }`). It does not draw anything by itself. Give it to `exports.nyx_lib:Show(node, true)` to display it.

## Two helper exports

| Export | Same as | Purpose |
|---|---|---|
| `emit(event)` | `nyx.emit(event)` | For event props such as `onClick`. See [Events and inputs](/nyx_lib/ui/events-and-inputs). |
| `bind(name, kind, default)` | `nyx.bind(name, kind, default)` | Remembers what the player typed or chose. Pass it as the `__bind` prop. |

## JavaScript example

```js
const nx = exports.nyx_lib;

const result = nx.Show(
  nx.Dialog({ open: true },
    nx.DialogContent(
      nx.DialogHeader(nx.DialogTitle('Hi')),
      nx.Button({ onClick: nx.emit('ok') }, 'OK'))),
  true);
```

## Names that are not component exports

These names belong to the ready-made functions and helpers, so a component with the same name would not get an export: `Show`, `Hide`, `Update`, `Notify`, `GetTheme`, `GetVersion`, `alertDialog`, `inputDialog`, `showContext`, `showTextUI`, `hideTextUI`, `progressBar`, `notify`, `emit`, `bind`. See [Exports](/nyx_lib/reference/exports).

## Where the list comes from

The list is **generated**, not written by hand:

1. `npm run build` (or `npm run exports`) runs `web/scripts/gen-exports.mjs`.
2. It reads every `.tsx` file in `web/src/components/ui` and collects the capitalised names that are exported.
3. It writes them to `client/component_list.lua` and prints, for example, `369 komponen -> client/component_list.lua` ("369 components").
4. When nyx_lib starts, `client/exports.lua` registers one export per name.

Never edit `client/component_list.lua` yourself. It is overwritten on every build.

## Adding a component

```bash
npx shadcn@latest add <component-name>
npm run build        # also refreshes the list
```

Then restart `nyx_lib`. The new export appears on its own. If you only want to refresh the list without a full build, run `npm run exports` and restart `nyx_lib`.

If you call a name that is not in the list you get `No such export ...`. Check the spelling and capital letters against `client/component_list.lua`.
