# config.lua

The default theme settings. They are used until an admin changes the theme in game. After that, the saved choice on the server takes over.

```lua
NyxConfig = {
    Preset = "default",
    Dark   = true,
    ConfigCommand = "nyx_config",
}
```

| Option | Type | Default | Description |
|---|---|---|---|
| `Preset` | string | `"default"` | `"default"` means the preset used at build time. Or use a name from `web/presets.json`. |
| `Dark` | boolean | `true` | Start in dark mode. |
| `ConfigCommand` | string | `"nyx_config"` | The chat command that opens the admin panel. Only people with the `nyx_lib.config` permission can use it. |

Restart `nyx_lib` after editing this file.
