# Exports

Functions other resources can call as `exports.nyx_lib:Name(...)`. They work from Lua, JavaScript and C#. In JavaScript write `exports.nyx_lib.Name(...)`.

Lua scripts that load `@nyx_lib/init.lua` can use the shorter `nyx.` form. See the table at the end of this page.

## Client

### Windows and notifications

| Export | Purpose | Page |
|---|---|---|
| `Show(tree, wait, keepFocus)` | Open a window | [show / hide / update](/nyx_lib/ui/show-hide-update) |
| `Hide(id)` | Close one or all windows | [show / hide / update](/nyx_lib/ui/show-hide-update) |
| `Update(id, tree)` | Replace a window's content | [show / hide / update](/nyx_lib/ui/show-hide-update) |
| `Notify(data)` / `notify(data)` | Show a toast. Both names are the same. | [notify](/nyx_lib/client/notify) |

### Ready-made functions

| Export | Purpose | Page |
|---|---|---|
| `alertDialog(data)` | Confirmation pop-up | [alertDialog](/nyx_lib/client/alert-dialog) |
| `inputDialog(heading, rows)` | Form | [inputDialog](/nyx_lib/client/input-dialog) |
| `showContext(ctx)` | Menu | [showContext](/nyx_lib/client/show-context) |
| `showTextUI(text, opts)` | Hint box | [showTextUI](/nyx_lib/client/text-ui) |
| `hideTextUI()` | Hide hint box | [showTextUI](/nyx_lib/client/text-ui) |
| `progressBar(data)` | Progress bar | [progressBar](/nyx_lib/client/progress-bar) |

### Helpers and information

| Export | Purpose | Page |
|---|---|---|
| `emit(event)` | Makes a prop send an event back to Lua | [Events and inputs](/nyx_lib/ui/events-and-inputs) |
| `bind(name, kind, default)` | Remembers what the player typed or chose | [Events and inputs](/nyx_lib/ui/events-and-inputs) |
| `GetTheme()` | The theme this player's game currently shows | [GetTheme](/nyx_lib/server/get-theme) |
| `GetVersion()` | Version text, currently `"0.4.0"` | n/a |

### One export per component

| Export | Purpose | Page |
|---|---|---|
| `<ComponentName>(props, ...children)` | Builds one shadcn component, for example `Button`, `Dialog`, `DialogContent`, `Select`, `SelectItem`, `Switch`. Returns a node to give to `Show`. | [Component exports](/nyx_lib/ui/component-exports) |

There are **369** of these in the shipped build, one for every capitalised name exported by `web/src/components/ui`. The list is generated into `client/component_list.lua` by `npm run build` (or `npm run exports`). A component name that equals one of the names above (`Show`, `Hide`, `Update`, `Notify`, `GetTheme`, `GetVersion`, `emit`, `bind`, `alertDialog`, `inputDialog`, `showContext`, `showTextUI`, `hideTextUI`, `progressBar`, `notify`) does not get its own export.

## Server

| Export | Purpose | Page |
|---|---|---|
| `SetTheme(partial)` | Change the server theme. Returns `true`, or `false` and a reason. | [SetTheme](/nyx_lib/server/set-theme) |
| `ResetTheme()` | Delete the saved choice and go back to `config.lua`. | [ResetTheme](/nyx_lib/server/reset-theme) |
| `GetTheme()` | The current theme | [GetTheme](/nyx_lib/server/get-theme) |
| `GetOptions()` | Every value that can be chosen for each option | [GetOptions](/nyx_lib/server/get-options) |
| `notify(source, data)` | Notify one player (or `-1` for everyone) | [server notify](/nyx_lib/server/notify) |

Server exports do **not** check permissions. Only trusted server code can call them. Players use the in-game panel and commands, which are checked against the `nyx_lib.config` permission.

## The `nyx.` shortcuts (client, after `shared_script '@nyx_lib/init.lua'`)

| You write | It calls |
|---|---|
| `nyx.alertDialog`, `nyx.inputDialog`, `nyx.notify`, `nyx.showContext`, `nyx.showTextUI`, `nyx.hideTextUI`, `nyx.progressBar` | The export with the same name |
| `nyx.show(tree, wait, keepFocus)` | `Show` |
| `nyx.hide(id)` | `Hide` |
| `nyx.update(id, tree)` | `Update` |
| `nyx.getTheme()` | `GetTheme` |
| `nyx.emit(event)`, `nyx.bind(name, kind, default)` | Plain Lua helpers (no export call) |
| `nyx.Button(...)`, `nyx.Dialog(...)`, `nyx.div(...)`, ... | Builders. Capital letter = shadcn component, lowercase = HTML tag. |

`GetVersion` has no `nyx.` shortcut. Call `exports.nyx_lib:GetVersion()`. A name that is not in the table above is treated as a component or HTML tag, so `nyx.GetVersion()` would build a node instead of returning the version.

## Stable contract

The exports `Show`, `Hide`, `Update`, `Notify`, `GetTheme` and `GetVersion` and the per-component exports on the client, and `SetTheme`, `ResetTheme`, `GetTheme`, `GetOptions` and `notify` on the server, together with the tree format `{ type, props, children }`, are meant to stay stable for other scripts. Scripts do not need changes when the theme changes.
