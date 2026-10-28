# GetOptions

Returns every value an admin can choose for each theme option. It is the content of `web/theme-options.json`.

```lua
local options = exports.nyx_lib:GetOptions()
```

## Result

A table with one entry per option. Each entry is a list of **groups**, and each group has an `items` list. Groups may have a `label` (used for the font groups).

```lua
{
  BaseColor  = { { items = { 'Neutral', 'Stone', 'Zinc', 'Mauve', 'Olive', 'Mist', 'Taupe' } } },
  Theme      = { { items = { 'Neutral', 'Amber', 'Blue', --[[ ... ]] 'Yellow' } } },
  ChartColor = { { items = { 'Neutral', 'Amber', --[[ ... ]] } } },
  Heading    = { { items = { 'Inherit' } }, { label = 'Sans', items = { 'Inter', --[[ ... ]] } } },
  Font       = { { label = 'Sans', items = { 'Geist', 'Inter', --[[ ... ]] } },
                 { label = 'Mono', items = { 'Geist Mono', 'JetBrains Mono' } },
                 { label = 'Serif', items = { 'Noto Serif', --[[ ... ]] } } },
  Radius     = { { items = { 'Default', 'None', 'Small', 'Medium', 'Large' } } },
  -- shown in the panel but baked into the components (read only):
  Style = { { items = { 'Nova' } } },
  IconLibrary = { { items = { 'Lucide' } } },
  Menu = { { items = { 'Default / Solid' } } },
  MenuAccent = { { items = { 'Subtle' } } },
}
```

The exact values depend on what you filled in `theme-codes.json` and on the last `npm run themes`. See [Theme files](/nyx_lib/reference/theme-files).

## Example: list every theme colour

```lua
local names = {}
for _, group in ipairs(exports.nyx_lib:GetOptions().Theme or {}) do
  for _, name in ipairs(group.items or {}) do names[#names + 1] = name end
end
print(table.concat(names, ', '))
```

## Good to know

- The server reads the file again on every call, so the result is always what is in `theme-options.json`. It returns an empty table if the file is missing or broken, and then [`SetTheme`](/nyx_lib/server/set-theme) rejects every text value.
- Only the values here are accepted by [`SetTheme`](/nyx_lib/server/set-theme) and the `nyx_theme` command.
- `nyx_theme list` prints the same data in the console.
