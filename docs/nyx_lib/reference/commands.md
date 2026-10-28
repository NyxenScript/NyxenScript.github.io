# Commands

| Command | Who | What it does |
|---|---|---|
| `nyx_demo` | Anyone (client command) | Shows a sample form, prints the typed values in the F8 console, then shows a notification. Good for testing. |
| `/nyx_config` | Needs `nyx_lib.config` | Opens the theme panel. The name can be changed in [`config.lua`](/nyx_lib/reference/config). In the server console it prints the current theme. |
| `nyx_theme list` | Server console, or needs `nyx_lib.config` | Prints the current theme and every available value. |
| `nyx_theme <Option> <Value>` | Server console, or needs `nyx_lib.config` | Changes one option. Options: `BaseColor`, `Theme`, `ChartColor`, `Heading`, `Font`, `Radius`. |
| `nyx_theme dark` / `nyx_theme light` | Server console, or needs `nyx_lib.config` | Switches dark or light mode. |
| `nyx_theme reset` | Server console, or needs `nyx_lib.config` | Goes back to the values in `config.lua`. |

Examples:

```text
nyx_theme list
nyx_theme Theme Blue
nyx_theme Font Space Grotesk
nyx_theme Radius Large
nyx_theme dark
nyx_theme reset
```

Option names are not case-sensitive. Values are, and they must be in `web/theme-options.json`.

See [Admin panel and commands](/nyx_lib/theming/admin-panel) for details and the exact messages.
