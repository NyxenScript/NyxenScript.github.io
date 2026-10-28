# Adding theme options

The drop-downs in `/nyx_config` (Base Color, Theme, Chart Color, Heading, Font, Radius) only show values that nyx_lib has **data** for. This page explains how to add or remove values.

::: tip In short
Put the shadcn code of each value in `web/theme-codes.json`, then run `npm run themes` and `npm run build`, then restart `nyx_lib`.
:::

## Where the data comes from

nyx_lib never writes colour, font or radius values itself. For every value it runs the shadcn tool and keeps what shadcn produced:

1. `web/theme-codes.json` lists, for every value, a short **preset code** from ui.shadcn.com.
2. `npm run themes` applies each code with `shadcn apply`, compares the result with the default, and saves only the CSS variables that differ.
3. It writes `web/src/presets/*.css` (the CSS) and `web/theme-options.json` (the list of values the panel and the server accept).
4. `npm run build` compiles that CSS into `web/dist`.

A value with an **empty code** is not offered. So you can start with a few values and add more whenever you like.

## Step 1: Get the code for a value

1. Open <https://ui.shadcn.com/create>.
2. Leave **every** option on its default. The code on the `--preset` button should be `b0`.
3. Change **only one** option. For example set Theme to Blue.
4. Copy the code shown on the `--preset` button, for example `b1PzeK`.

Changing only one option matters. If you change two, the saved CSS would contain both changes under one name.

You can paste the code in any form: `--preset b1PzeK`, `=b1PzeK` or just `b1PzeK`. The script cleans it up.

## Step 2: Put it in `theme-codes.json`

```json
{
  "default": "b0",
  "Theme": {
    "Neutral": "b0",
    "Blue": "b1PzeK",
    "Amber": ""
  }
}
```

- `default` is the code of the default look. Values with this code need no CSS and just use the built-in default.
- Each option (`BaseColor`, `Theme`, `ChartColor`, `Heading`, `Font`, `Radius`) is a list of `"Name": "code"` pairs. The **name** is what admins see and type in `nyx_theme`. The **code** is what you copied.
- Leave a code as `""` to hide that value for now.
- There is also a `Style` option in the file. It is only used by `npm run style` (see [Changing style, icons or menu](/nyx_lib/theming/style-and-icons)). It does not add a drop-down.

Full format: [Theme files](/nyx_lib/reference/theme-files).

### Notes per option

| Option | Note |
|---|---|
| **Font** | Take the code with only Font changed. The shadcn tool installs the matching `@fontsource` package for you. Fonts are grouped in the panel as Sans, Mono and Serif. A font that is not in nyx_lib's known groups appears under **Lainnya** ("Others"). |
| **Heading** | `Inherit` means "same as Font". Any other name works like a font name. Its code decides which font headings use. |
| **Radius** | The shipped values are Default (`b0`), None, Small, Medium and Large. |
| **BaseColor, Theme, ChartColor** | One code per colour name. |

## Step 3: Run it

From the `web` folder:

```bash
npm run themes
npm run build
```

Then restart `nyx_lib` (`ensure nyx_lib`). The new values appear in the `/nyx_config` panel and in `nyx_theme list`. If you changed the font list, upload the new `web/dist` too.

## Running `npm run themes`

Things to know before you start:

- It **needs internet** and takes a few minutes, because it runs `shadcn apply` once per code.
- It **rewrites `web/src/index.css` many times** and restores the default at the end. Commit or back up first (`git add -A && git commit`).
- It runs each `shadcn apply` with `--yes`, so it does not stop to ask for confirmation.
- Each `shadcn apply` is retried up to 4 times. A short network drop does not end the run.
- Every code that finished is saved in `web/.themes-cache/<code>.json`. If the script stops (network, closed terminal), run `npm run themes` again and it prints `(cache) <code>` for finished codes and continues with the rest.
- When it ends it prints a summary:

  ```text
  selesai: BaseColor=7, Theme=18, ChartColor=18, Radius=5, Font=22, Heading=27
  ```

  ("selesai" means "done".) These are the numbers of values each option now offers.

### The cache

The cache is keyed by code, so changing a **value's code** in `theme-codes.json` is picked up automatically (the new code has no cache file yet). Delete the cache when the shadcn tool itself changed or something looks wrong:

```bash
# delete everything (next run takes the full time again)
rm -rf .themes-cache          # Windows (cmd):  rmdir /s /q .themes-cache
# or just one code
rm .themes-cache/b1PzeK.json
```

Add `.themes-cache` to your `.gitignore`.

### Warnings and errors

| Message | Meaning |
|---|---|
| `PERINGATAN <Option>: kode X dipakai A dan B. Keduanya dilewati; perbaiki di theme-codes.json.` | Two values in one option have the same code. One was copied wrongly. Both are skipped, so neither shows up. Get the right code for each and fix the file. |
| `Something went wrong ... terminated` | The connection to the shadcn registry dropped. Run the command again. |
| `Would you like to continue? (y/N)` | Your script lacks `--yes`. Update `web/scripts/snapshot-themes.mjs`. |
| `:root/.dark tidak ditemukan di src/index.css` | `src/index.css` is missing its `:root` and `.dark` blocks, for example after a failed run. Restore it with `git checkout src/index.css`. |

More fixes: [Troubleshooting](/nyx_lib/guide/troubleshooting#problems-while-running-npm-run-themes).

## Removing a value

Set its code to `""` (or delete the line), run `npm run themes` and `npm run build`, and restart `nyx_lib`. If a saved server choice used that value, it is ignored on the next start and the `config.lua` default is used instead. Make sure the values in [`config.lua`](/nyx_lib/reference/config) are still available.

## Good to know

- Only colours, fonts and radius change live. Style and Icon Library do not. See [Changing style, icons or menu](/nyx_lib/theming/style-and-icons).
- Values appear in the panel in the order they are written in `theme-codes.json`. Fonts are grouped as Sans, Mono and Serif.
- `web/scripts/snapshot-presets.mjs` (and `web/presets.json` and `npm run presets`, if you still have them) belong to the old preset system of version 0.2.0 and are no longer used. You can delete them.
