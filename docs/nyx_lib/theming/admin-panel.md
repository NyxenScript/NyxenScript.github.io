# Admin panel and commands

## Give permission first

Only people with the ACE permission `nyx_lib.config` can change the theme. In `server.cfg`:

```cfg
add_ace group.admin nyx_lib.config allow
add_principal identifier.license:XXXXXXXXXXXXXXXX group.admin
```

Replace the identifier with the admin's own. The server checks this itself, so a player cannot fake it. The server console always has permission.

## /nyx_config (in game)

Type `/nyx_config` in chat or the F8 console. A window titled **Pengaturan nyx_lib** ("nyx_lib settings") opens. It says the settings apply to the whole server and to every script that uses nyx_lib. It has:

| Field | Can I change it here? |
|---|---|
| **Style** | No. Greyed out, with the note "Tertanam di komponen; ganti lewat build ulang." ("Baked into the components; change it by rebuilding.") |
| **Base Color** | Yes |
| **Theme** | Yes |
| **Chart Color** | Yes |
| **Heading** | Yes |
| **Font** | Yes. Fonts are grouped as Sans, Mono and Serif. |
| **Icon Library** | No. Greyed out. |
| **Radius** | Yes |
| **Menu** | No. Greyed out. |
| **Menu Accent** | No. Greyed out. |
| **Dark mode** | Yes. A switch. |

Every change applies to all players immediately and is saved on the server. The panel itself changes with it, so you see the result at once.

Buttons at the bottom:

| Button | What it does |
|---|---|
| **Reset ke config.lua** | Deletes the saved choice and goes back to the values in [`config.lua`](/nyx_lib/reference/config). |
| **Tutup** | Closes the panel. ESC and the X in the corner do the same. |

Players without permission see: "Kamu tidak punya izin (ACE nyx_lib.config)." (You do not have permission.)

From the server console, `nyx_config` does not open a window. It prints the current theme instead.

::: tip A drop-down shows only one value?
Then `npm run themes` has not been run, or did not finish. See [Troubleshooting](/nyx_lib/guide/troubleshooting#theme-problems).
:::

## nyx_theme (console or in game)

```text
nyx_theme list
nyx_theme <Option> <Value>
nyx_theme dark | light
nyx_theme reset
```

| Example | Result |
|---|---|
| `nyx_theme list` | Prints the current theme, then every available value for BaseColor, Theme, ChartColor, Heading, Font and Radius. `nyx_theme` with nothing after it does the same. |
| `nyx_theme Theme Blue` | Accent colour Blue. |
| `nyx_theme BaseColor Zinc` | Base colour Zinc. |
| `nyx_theme ChartColor Emerald` | Chart colour Emerald. |
| `nyx_theme Font Space Grotesk` | Font Space Grotesk. Values with spaces need no quotes. |
| `nyx_theme Heading Inherit` | Headings use the same font as Font. |
| `nyx_theme Radius Large` | Larger corners. |
| `nyx_theme dark` / `nyx_theme light` | Dark or light mode. |
| `nyx_theme reset` | Back to `config.lua`. |

Rules:

- The option name (`Theme`, `font`, `radius`...) is not case-sensitive. The **value must match exactly** (`Blue`, not `blue`).
- The server console is always allowed. Players need the `nyx_lib.config` permission, otherwise they see "Kamu tidak punya izin." (You do not have permission.)
- Results are printed in the console, or sent to the player's chat. In-game messages need FiveM's `chat` resource to be running.
- If the option name is wrong you get "Opsi tidak dikenal. Ketik: nyx_theme list" (Unknown option).
- If the value does not exist you get "Gagal: nilai 'X' tidak tersedia untuk Theme" (Failed: value not available).
- `Style`, `IconLibrary`, `Menu` and `MenuAccent` cannot be set with this command.

## Listening for changes (optional)

Other scripts can react when the theme changes.

Client side:

```lua
AddEventHandler('nyx_lib:themeChanged', function(theme)
  print(theme.Theme, theme.Font, theme.Dark)
end)
```

Server side (the server triggers the same event after every change):

```lua
AddEventHandler('nyx_lib:themeChanged', function(theme)
  print('Theme is now', theme.Theme)
end)
```

See [Events](/nyx_lib/reference/events).
