# ResetTheme

Throws away the theme that was saved on the server and goes back to the values in [`config.lua`](/nyx_lib/reference/config).

```lua
exports.nyx_lib:ResetTheme()
```

## Returns

Always `true`.

## What it does

1. Deletes the saved choice (the server's stored theme).
2. Rebuilds the theme from `config.lua`. A value in `config.lua` that is not in `web/theme-options.json` is replaced by the first value listed for that option.
3. Sends the result to every online player and triggers `nyx_lib:themeChanged`.

## Example

```lua
RegisterCommand('resettheme', function(src)
  if src ~= 0 then return end -- console only
  exports.nyx_lib:ResetTheme()
end, true)
```

## Good to know

- The same thing happens when an admin presses **Reset ke config.lua** in `/nyx_config`, or runs `nyx_theme reset`.
- Unlike the in-game panel and the `nyx_theme` command, the export does **not** check permissions. It is meant for server code you trust.
