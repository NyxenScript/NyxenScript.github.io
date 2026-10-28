# Quick start

This page shows the smallest working example. It assumes nyx_lib is [installed](/nyx_lib/guide/installation) and running.

## 1. Create a tiny test script

Make a folder `resources/[test]/hello_nyx` with two files.

**fxmanifest.lua**

```lua
fx_version 'cerulean'
game 'gta5'
lua54 'yes'

dependency 'nyx_lib'

shared_script '@nyx_lib/init.lua'
client_script 'client.lua'
```

`shared_script '@nyx_lib/init.lua'` is the important line. It creates the global `nyx` you will use in your code. `dependency 'nyx_lib'` makes FiveM refuse to start your script if nyx_lib is not running.

**client.lua**

```lua
RegisterCommand('hello', function()
  -- 1. Ask a question
  local answer = nyx.alertDialog({
    header = 'Say hello?',
    content = 'This is a test of nyx_lib.',
    cancel = true,
  })

  if answer ~= 'confirm' then return end

  -- 2. Show a small form
  local values = nyx.inputDialog('Your name', {
    { type = 'input', label = 'Name', required = true },
  })

  if not values then return end -- the player cancelled

  -- 3. Show a notification
  nyx.notify({
    title = 'Hello!',
    description = 'Nice to meet you, ' .. values[1],
    type = 'success',
  })
end, false)
```

## 2. Try it

Add `ensure hello_nyx` to `server.cfg` (after `ensure nyx_lib`), restart, join, and type `/hello` in the F8 console or chat.

## What just happened?

- `alertDialog` showed a window and **paused your code** until the player clicked a button. It returned `'confirm'` or `'cancel'`.
- `inputDialog` returned a list of the typed values, or `nil` if the player cancelled.
- `notify` showed a message and returned immediately.

::: warning Call the waiting functions from a command, event or thread
`alertDialog`, `inputDialog`, `showContext`, `progressBar` and `show(..., true)` wait for the player. They must run inside a command handler, an event handler or a `CreateThread`. They work in all of those. They cannot run in a place where waiting is not allowed.
:::

## The same thing without `init.lua`

You do not have to add `init.lua`. Every function is also a normal export, so this works in any resource, including JavaScript and C# ones. Remove the `shared_script` line from the manifest and write:

```lua
RegisterCommand('hello', function()
  local answer = exports.nyx_lib:alertDialog({
    header = 'Say hello?',
    content = 'This is a test of nyx_lib.',
    cancel = true,
  })
  if answer ~= 'confirm' then return end

  exports.nyx_lib:notify({ title = 'Hello!', type = 'success' })
end, false)
```

The same goes for custom windows. Each shadcn component is an export, for example `exports.nyx_lib:Button(...)`. See [Component exports](/nyx_lib/ui/component-exports).

## Where to go next

- [All ready-made functions](/nyx_lib/client/alert-dialog)
- [Build your own window](/nyx_lib/ui/builders)
- [Every export in one table](/nyx_lib/reference/exports)
