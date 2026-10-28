# Admin panel and commands

## Give permission first

Only people with the ACE permission `nyx_lib.config` can change the theme. In `server.cfg`:

```cfg
add_ace group.admin nyx_lib.config allow
add_principal identifier.license:XXXXXXXXXXXXXXXX group.admin
```

Replace the identifier with the admin's own. The server checks this itself, so a player cannot fake it.

## /nyx_config (in game)

Type `/nyx_config` in chat or the F8 console. A window opens with:

- **Preset**: a drop-down of all available presets.
- **Dark mode**: a switch.

Changes apply to all players immediately and are saved. Press **Tutup** (Close) or ESC when done.

Players without permission see: "Kamu tidak punya izin (ACE nyx_lib.config)." (You do not have permission.)

From the server console, `nyx_config` instead prints the current theme.

## nyx_theme (console or in game)

```text
nyx_theme <preset> [dark|light]
```

| Example | Result |
|---|---|
| `nyx_theme default dark` | Default preset, dark mode |
| `nyx_theme nova-neutral light` | Preset `nova-neutral`, light mode |

If you leave out `dark`/`light`, only the preset changes. The server console is always allowed to run it. Players need the `nyx_lib.config` permission.

If the preset name does not exist, you get "Gagal: preset tidak dikenal" (Failed: unknown preset).

## Listening for changes (optional)

Other scripts can react when the theme changes (client side):

```lua
AddEventHandler('nyx_lib:themeChanged', function(theme)
  print(theme.Preset, theme.Dark)
end)
```
