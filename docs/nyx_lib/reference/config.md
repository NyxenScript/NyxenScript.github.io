# config.lua

The default theme settings. They are used until an admin changes the theme in game. After that, the choice saved on the server takes over.

```lua
NyxConfig = {
    BaseColor  = "Neutral",
    Theme      = "Neutral",
    ChartColor = "Neutral",
    Heading    = "Inherit",   -- "Inherit" = same as Font
    Font       = "Inter",
    Radius     = "Default",
    Dark       = true,
    ConfigCommand = "nyx_config",
}
```

| Option | Type | Default | Description |
|---|---|---|---|
| `BaseColor` | string | `"Neutral"` | The base (grey) palette. |
| `Theme` | string | `"Neutral"` | The accent colour. |
| `ChartColor` | string | `"Neutral"` | The chart colours. |
| `Heading` | string | `"Inherit"` | `"Inherit"` uses the same font as `Font`. Or a font name. |
| `Font` | string | `"Inter"` | The main font. |
| `Radius` | string | `"Default"` | Corner roundness: `Default`, `None`, `Small`, `Medium` or `Large`. |
| `Dark` | boolean | `true` | Start in dark mode. Only an explicit `false` turns it off. |
| `ConfigCommand` | string | `"nyx_config"` | The chat command that opens the admin panel. Only people with the `nyx_lib.config` permission can use it. |

## Rules

- Each text value must exist in `web/theme-options.json`. Use `nyx_theme list` or [`GetOptions`](/nyx_lib/server/get-options) to see them. Names are case-sensitive.
- If a value is **not** in that file, the server uses the first value listed for that option instead. If the file has no values for the option at all, the text from `config.lua` is used as it is.
- Style, Icon Library, Menu and Menu Accent are **not** in this file. They are baked into the components. See [Changing style, icons or menu](/nyx_lib/theming/style-and-icons).
- The file is loaded on both the client and the server. The client starts with these values until the server sends the real theme, which happens right after the player joins.

## When does `config.lua` apply?

| Situation | Which values are used |
|---|---|
| Nothing was ever saved | `config.lua` |
| An admin changed something in `/nyx_config`, with `nyx_theme` or with [`SetTheme`](/nyx_lib/server/set-theme) | The saved theme. The first change saves **all** options together (not only the one that was changed), so from then on `config.lua` is ignored for every option. |
| `nyx_theme reset`, **Reset ke config.lua** or [`ResetTheme`](/nyx_lib/server/reset-theme) | `config.lua` again. The saved choice is deleted. |

Because the saved theme wins, editing `config.lua` later has no visible effect until you reset.

Restart `nyx_lib` after editing this file.
