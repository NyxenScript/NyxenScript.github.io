# Theme files

The files in `nyx_lib/web` that decide which values admins can choose.

| File | Written by | Purpose |
|---|---|---|
| `theme-codes.json` | **You** | Lists a shadcn code for every value you want to offer. |
| `src/presets/*.css` | `npm run themes` | The CSS for each value (generated). |
| `theme-options.json` | `npm run themes` | The list of values the panel and the server accept (generated). |
| `components.json` | shadcn | Holds the baked-in choices (style, icons, menu). Read to show the greyed-out fields. |
| `.themes-cache/` | `npm run themes` | Remembers finished codes so an interrupted run can continue. Safe to delete. |

## theme-codes.json

```json
{
  "_petunjuk": "Instructions in Indonesian ...",
  "default": "b0",
  "Style":      { "Vega": "...", "Nova": "b0", "Maia": "...", "Lyra": "...", "Mira": "...", "Luma": "...", "Sera": "...", "Rhea": "..." },
  "BaseColor":  { "Neutral": "b0", "Stone": "...", "Zinc": "...", "Mauve": "...", "Olive": "...", "Mist": "...", "Taupe": "..." },
  "Theme":      { "Neutral": "b0", "Amber": "...", "Blue": "...", "...": "..." },
  "ChartColor": { "Neutral": "b0", "...": "..." },
  "Heading":    { "Inherit": "b0", "Inter": "b0", "...": "..." },
  "Font":       { "Inter": "b0", "Geist": "...", "...": "..." },
  "Radius":     { "Default": "b0", "None": "...", "Small": "...", "Medium": "...", "Large": "..." }
}
```

| Key | Meaning |
|---|---|
| `_petunjuk` | A comment ("petunjuk" means "instructions"). Ignored. |
| `default` | The code of the default look (normally `b0`). A value whose code equals this one needs no CSS. |
| `Style` | Used only by `npm run style -- <Name>`. It is **not** a switchable drop-down. |
| `BaseColor`, `Theme`, `ChartColor`, `Heading`, `Font`, `Radius` | `"Name": "code"` pairs. The name is what admins see and type. |

Rules:

- An **empty code** (`""`) hides the value.
- Two values of one option with the **same code** are both skipped, with a warning. It means one of them was copied wrongly.
- Codes may be pasted as `--preset b1PzeK`, `=b1PzeK` or `b1PzeK`.
- `Heading` value `Inherit` means "same as Font". A heading font whose code equals the default means the default font, not "inherit".
- How to get a code: [Adding theme options](/nyx_lib/theming/adding-options#step-1-get-the-code-for-a-value).

## theme-options.json

Generated. Do not edit it by hand, because `npm run themes` overwrites it.

```json
{
  "_catatan": "Dibuat otomatis oleh `npm run themes`. ...",
  "Style":       [ { "items": ["Nova"] } ],
  "BaseColor":   [ { "items": ["Neutral", "Stone", "Zinc"] } ],
  "Theme":       [ { "items": ["Neutral", "Amber", "Blue"] } ],
  "ChartColor":  [ { "items": ["Neutral", "Amber", "Blue"] } ],
  "Heading":     [ { "items": ["Inherit"] }, { "label": "Sans", "items": ["Inter", "Geist"] } ],
  "Font":        [ { "label": "Sans", "items": ["Geist", "Inter"] }, { "label": "Mono", "items": ["Geist Mono"] } ],
  "IconLibrary": [ { "items": ["Lucide"] } ],
  "Radius":      [ { "items": ["Default", "None", "Small", "Medium", "Large"] } ],
  "Menu":        [ { "items": ["Default / Solid"] } ],
  "MenuAccent":  [ { "items": ["Subtle"] } ]
}
```

Each option is a list of groups. A group has `items` (the values) and an optional `label` (shown above the group, used for font groups). The groups for fonts are `Sans`, `Mono`, `Serif`, and `Lainnya` ("Others") for fonts that fit none of them.

`Style`, `IconLibrary`, `Menu` and `MenuAccent` are filled from `components.json` and always have a single value. The server reads this file to check every change. [`GetOptions`](/nyx_lib/server/get-options) returns it.

This is the **only** file the server needs from the theme tooling, so upload it with `web/dist`.

## src/presets/

| File | Content |
|---|---|
| `index.css` | Loads the other files in the right order: fonts, base, theme, chart, radius. Later files win when two set the same variable. |
| `base.css` | One rule per Base Color value, such as `:root[data-nyx-base="Zinc"] { ... }`, plus a `.dark` version. |
| `theme.css` | The same for Theme values (`data-nyx-theme`). |
| `chart.css` | The same for Chart Color values (`data-nyx-chart`). |
| `radius.css` | The same for Radius values (`data-nyx-radius`). |
| `fonts.css` | The font `@import` lines and one rule per Font (`data-nyx-font`) and Heading (`data-nyx-heading`) value. |

All of these are generated. A file that only contains the comment `/* dibuat otomatis oleh npm run themes ... */` means `npm run themes` has not produced data yet.

## components.json

Created by `shadcn init`. nyx_lib reads these keys to show the greyed-out fields:

| Key | Panel field |
|---|---|
| `style` | Style |
| `iconLibrary` | Icon Library |
| `menuColor` | Menu |
| `menuAccent` | Menu Accent |
