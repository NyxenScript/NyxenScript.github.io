# Component builders

When the ready-made functions are not enough, you can build any window from shadcn components. Every component is available as a function on `nyx`, with the **same name as the shadcn component**.

```lua
nyx.Button(...)
nyx.Dialog(...)
nyx.Select(...)
```

## How a builder works

```lua
nyx.ComponentName(props, child1, child2, ...)
```

- The **first argument may be a table of props** (settings), such as `{ variant = 'outline' }`. It is optional.
- Everything after that are **children**: text, numbers, or other builders.
- Lists of children are flattened for you, and `nil` children are skipped (handy for `condition and x or nil`).

## Example

```lua
local result = nyx.show(
  nyx.Dialog({ open = true },
    nyx.DialogContent(
      nyx.DialogHeader(
        nyx.DialogTitle('Hi'),
        nyx.DialogDescription('This is a custom window.')
      ),
      nyx.Button({ onClick = nyx.emit('ok') }, 'OK')
    )
  ),
  true -- wait for the player
)

if result then
  print(result.event) --> 'ok'
  nyx.hide(result.id)
end
```

## Which names can I use?

Any shadcn component that was installed with `npx shadcn@latest add --all`. They are the capitalised names exported in `web/src/components/ui`, for example `Button`, `Dialog`, `DialogContent`, `Select`, `SelectItem`, `Tabs`, `Progress`, `Label`, `Input`.

**Lowercase names are plain HTML tags**, such as `nyx.div`, `nyx.p` and `nyx.span`. They are useful for layout:

```lua
nyx.div({ className = 'grid gap-4 py-2' },
  nyx.p({ className = 'text-sm text-muted-foreground' }, 'Some help text')
)
```

::: warning A wrong name fails silently
If you misspell a component, for example `nyx.Dialogcontent`, nyx_lib falls back to treating it as an HTML tag and nothing useful appears. Check the spelling against `web/src/components/ui`.
:::

## Props

Props are passed to the shadcn component as they are. For example `variant = 'outline'` on a `Button`, or `placeholder = '...'` on an `Input`.

Only plain data can be sent: text, numbers, booleans and tables. **Do not put Lua functions in props.** To react to clicks and changes, use [`nyx.emit`](/nyx_lib/ui/events-and-inputs).

If you use `className`, the Tailwind classes must be registered. See [Using Tailwind classes](/nyx_lib/ui/tailwind-classes).

## Helper functions on `nyx`

| Helper | Purpose |
|---|---|
| `nyx.emit(name)` | Makes a prop send an event back to Lua. [Details](/nyx_lib/ui/events-and-inputs) |
| `nyx.bind(name, kind, default)` | Remembers what the player typed or chose. [Details](/nyx_lib/ui/events-and-inputs) |
| `nyx.show`, `nyx.hide`, `nyx.update` | Open, close and change windows. [Details](/nyx_lib/ui/show-hide-update) |
| `nyx.getTheme()` | Returns the current theme. |
