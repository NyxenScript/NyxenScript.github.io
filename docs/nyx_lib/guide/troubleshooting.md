# Troubleshooting

Always look first at the **F8 console** (in game) and the **server console**. Error messages there usually name the problem.

## Common problems

| What you see | Why it happens and what to do |
|---|---|
| Blank screen, nothing appears | `web/dist` does not exist. Run `npm run build` inside `nyx_lib/web`, upload the result, restart nyx_lib. |
| A component does not appear | The `type` name is wrong. It must match the shadcn export exactly, including capitals (for example `DialogContent`). Look in `web/src/components/ui`. |
| `No such export Xyz` | The component is not in `client/component_list.lua`. Run `npm run exports` (or `npm run build`) and restart nyx_lib. The name must match exactly. |
| Layout looks broken, classes do nothing | Any Tailwind class you use from Lua must be listed in `web/src/nyx/classes.ts`, then rebuild. See [Using Tailwind classes](/nyx_lib/ui/tailwind-classes). |
| React error #137 (`input is a void element`) | Props with a `type` key (for example `{ type = 'text' }`) were mistaken for a node. Fixed in `init.lua` 0.3.1 and later. Update `init.lua` and restart nyx_lib. No rebuild needed. |
| Cursor stays visible, mouse is stuck | Press **ESC**. If it keeps happening, restart `nyx_lib` and check F8 for errors. |
| `npm` or `npx` errors | Update Node.js to the latest LTS, delete `web/node_modules`, and run `npm install` again. |
| `shadcn` cannot download | Check the internet connection or proxy of the PC you build on. The tool needs access to ui.shadcn.com. |

## Theme problems

| What you see | Why it happens and what to do |
|---|---|
| Every drop-down in `/nyx_config` has only one value (Neutral, Inter, Default) | `npm run themes` was never run, or it did not finish. `theme-options.json` is only written by that command. Running `npx shadcn apply` by hand or `npm run build` does **not** fill it. Run `npm run themes`, then `npm run build`, then restart nyx_lib. |
| A value is missing from a drop-down | Its code in `web/theme-codes.json` is empty, or it shares a code with another value (see "Duplicate code" below). Check with `nyx_theme list`, fix the file, run `npm run themes` and `npm run build`. |
| Drop-downs are full but nothing changes on screen | You did not rebuild after `npm run themes`, or you did not restart nyx_lib. The colours and fonts live in `web/dist`. |
| Theme does not change when I choose a value | Your account lacks the `nyx_lib.config` permission, or the value is not in `web/theme-options.json`. The server silently ignores values that are not in that file. |
| Style, Icon Library, Menu and Menu Accent are greyed out | This is normal. They are baked into the components and only shown for information. See [Changing style, icons or menu](/nyx_lib/theming/style-and-icons). |
| A font does not change | The font is missing from the list, or its package was not installed. Check `web/src/presets/fonts.css` for its `@import` line, run `npm run themes` again, then rebuild. |
| I changed `config.lua` but nothing happened | A saved choice on the server overrides `config.lua`. Run `nyx_theme reset` (or press **Reset ke config.lua** in the panel), then restart nyx_lib. |

## Problems while running `npm run themes`

| What you see | What to do |
|---|---|
| `Would you like to continue? (y/N)` and the script waits | Your copy of `web/scripts/snapshot-themes.mjs` is missing the `--yes` flag on its `shadcn apply` call. Add it, or use the newest script. |
| `Something went wrong ... terminated` | The connection to the shadcn registry dropped. Run `npm run themes` again. The newest script retries each code up to 4 times and remembers finished codes, so it continues where it stopped. If it keeps failing, check VPN, antivirus or DNS. |
| `PERINGATAN ...: kode ... dipakai X dan Y` ("warning: code is used by X and Y") | Two values in one option have the same code in `theme-codes.json`, so one of them was copied wrongly. Both are skipped. Get the right code for each from ui.shadcn.com/create and fix the file. |
| `src/index.css` looks different afterwards | The script rewrites it on purpose and restores the default preset at the end. If it was interrupted, run `git checkout src/index.css components.json`. |

More detail: [Adding theme options](/nyx_lib/theming/adding-options#running-npm-run-themes).

## Lua errors

### `attempt to index a nil value (global 'nyx')`

Your script does not load nyx_lib's helper file. Add this to **your** `fxmanifest.lua`:

```lua
shared_script '@nyx_lib/init.lua'
```

Also make sure `ensure nyx_lib` comes before your script in `server.cfg`. Or skip the global and use `exports.nyx_lib:...`.

### My form returns `nil` for some fields

Fields the player never touched can come back as `nil`. Read values by position (`values[1]`, `values[2]`), and do not loop with `ipairs`, because a `nil` in the middle stops the loop. Mark important fields `required = true`. See [inputDialog](/nyx_lib/client/input-dialog).

### A function returns `nil` or `"cancel"` right away

The player pressed **ESC**, which closes every open nyx_lib window. This is normal. Always handle the cancel case in your code.

### The window stays on screen after `nyx.show(tree, true)`

`show` does not close the window for you. Call `nyx.hide(result.id)`. See [show / hide / update](/nyx_lib/ui/show-hide-update).

### `SetTheme` returns `false`

The second return value tells you why, for example `nilai 'Pink2' tidak tersedia untuk Theme` ("value 'Pink2' is not available for Theme"). Use [`GetOptions`](/nyx_lib/server/get-options) or `nyx_theme list` to see the valid values. Names are case-sensitive.

## Texts are in Indonesian

Some built-in texts are in Indonesian, for example the form buttons **Batal** (Cancel) and **Simpan** (Save), the placeholder **Pilih** (Choose), and everything in the config panel and the theme commands. For `alertDialog` you can change the button texts with `labels`. For `inputDialog` and the config panel, the texts are fixed in `client/components.lua` and `client/main.lua`, and the command messages in `server/main.lua`. You can edit those files directly (no rebuild needed, restart `nyx_lib`).

## Still stuck?

When asking for help, include: your server artifact version, the exact error from F8 or the console, and the step where it failed.
