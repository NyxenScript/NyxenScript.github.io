# Troubleshooting

Always look first at the **F8 console** (in game) and the **server console**. Error messages there usually name the problem.

## Common problems

| What you see | Why it happens and what to do |
|---|---|
| Blank screen, nothing appears | `web/dist` does not exist. Run `npm run build` inside `nyx_lib/web`, upload the result, restart nyx_lib. |
| A component does not appear | The `type` name is wrong. It must match the shadcn export exactly, including capitals (for example `DialogContent`). Look in `web/src/components/ui`. |
| Layout looks broken, classes do nothing | Any Tailwind class you use from Lua must be listed in `web/src/nyx/classes.ts`, then rebuild. See [Using Tailwind classes](/nyx_lib/ui/tailwind-classes). |
| Theme does not change | The preset is not in `presets.json`, you did not run `npm run presets` and `npm run build`, or your account lacks the `nyx_lib.config` permission. See [Adding presets](/nyx_lib/theming/adding-presets). |
| Cursor stays visible, mouse is stuck | Press **ESC**. If it keeps happening, restart `nyx_lib` and check F8 for errors. |
| `npm` or `npx` errors | Update Node.js to the latest LTS, delete `web/node_modules`, and run `npm install` again. |
| `shadcn` cannot download | Check the internet connection or proxy of the PC you build on. The tool needs access to ui.shadcn.com. |

## Lua errors

### `attempt to index a nil value (global 'nyx')`

Your script does not load nyx_lib's helper file. Add this to **your** `fxmanifest.lua`:

```lua
shared_script '@nyx_lib/init.lua'
```

Also make sure `ensure nyx_lib` comes before your script in `server.cfg`.

### My form returns `nil` for some fields

Fields the player never touched can come back as `nil`. Read values by position (`values[1]`, `values[2]`), and do not loop with `ipairs`, because a `nil` in the middle stops the loop. Mark important fields `required = true`. See [inputDialog](/nyx_lib/client/input-dialog).

### A function returns `nil` or `"cancel"` right away

The player pressed **ESC**, which closes every open nyx_lib window. This is normal. Always handle the cancel case in your code.

### The window stays on screen after `nyx.show(tree, true)`

`show` does not close the window for you. Call `nyx.hide(result.id)`. See [show / hide / update](/nyx_lib/ui/show-hide-update).

## Texts are in Indonesian

Some built-in button and message texts are in Indonesian, for example **Batal** (Cancel), **Simpan** (Save) and **Pilih** (Choose). For `alertDialog` you can change the button texts with `labels`. For `inputDialog` and the config panel, the texts are fixed in `client/components.lua` and `client/main.lua`. You can edit those files directly.

## Still stuck?

When asking for help, include: your server artifact version, the exact error from F8 or the console, and the step where it failed.
