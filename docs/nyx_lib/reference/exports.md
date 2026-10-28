# Exports

Functions other resources can call as `exports.nyx_lib:Name(...)`.

## Client

| Export | Purpose | Page |
|---|---|---|
| `Show(tree, wait, keepFocus)` | Open a window | [show / hide / update](/nyx_lib/ui/show-hide-update) |
| `Hide(id)` | Close one or all windows | [show / hide / update](/nyx_lib/ui/show-hide-update) |
| `Update(id, tree)` | Replace a window's content | [show / hide / update](/nyx_lib/ui/show-hide-update) |
| `Notify(data)` / `notify(data)` | Show a toast | [notify](/nyx_lib/client/notify) |
| `GetTheme()` | Current theme | [GetTheme](/nyx_lib/server/get-theme) |
| `GetVersion()` | Version text, currently `"0.2.0"` | n/a |
| `alertDialog(data)` | Confirmation pop-up | [alertDialog](/nyx_lib/client/alert-dialog) |
| `inputDialog(heading, rows)` | Form | [inputDialog](/nyx_lib/client/input-dialog) |
| `showContext(ctx)` | Menu | [showContext](/nyx_lib/client/show-context) |
| `showTextUI(text, opts)` | Hint box | [showTextUI](/nyx_lib/client/text-ui) |
| `hideTextUI()` | Hide hint box | [showTextUI](/nyx_lib/client/text-ui) |
| `progressBar(data)` | Progress bar | [progressBar](/nyx_lib/client/progress-bar) |

Most developers use the shorter `nyx.` form (for example `nyx.notify`) after adding `@nyx_lib/init.lua`. It calls the same exports.

## Server

| Export | Purpose | Page |
|---|---|---|
| `SetTheme(partial)` | Change the server theme | [SetTheme](/nyx_lib/server/set-theme) |
| `GetTheme()` | Current theme | [GetTheme](/nyx_lib/server/get-theme) |
| `notify(source, data)` | Notify one player | [server notify](/nyx_lib/server/notify) |

## Stable contract

The exports `Show`, `Hide`, `Notify`, `GetTheme` and `GetVersion` on the client, and `SetTheme` and `GetTheme` on the server, together with the tree format `{ type, props, children }`, are meant to stay stable for other scripts.
