# Changing style, icons or menu

**Style**, **Icon Library**, **Menu** and **Menu Accent** are built into the component code, so they cannot be switched while the game runs. `/nyx_config` shows them greyed out, with the value read from `web/components.json`:

| Panel field | Read from `components.json` | Shown as |
|---|---|---|
| Style | `style` (for example `base-nova`) | `Nova` |
| Icon Library | `iconLibrary` (for example `lucide`) | `Lucide` (others: `Tabler Icons`, `HugeIcons`, `Phosphor Icons`, `Remix Icon`) |
| Menu | `menuColor` | `Default / Solid`, `Default / Translucent`, `Inverted / Solid` or `Inverted / Translucent` |
| Menu Accent | `menuAccent` | `Subtle` or `Bold` |

Changing any of them needs a rebuild. Commit or back up first, because the component files are overwritten.

::: warning
`add --all --overwrite` replaces the component files in `web/src/components/ui`. If you edited any of them by hand, back them up first.
:::

## Change the Style

The code of every style (Vega, Nova, Maia, Lyra, Mira, Luma, Sera, Rhea) is in the `Style` group of `web/theme-codes.json`. In the `web` folder:

```bash
npm run style -- Vega
npm run themes
npm run build
```

What each command does:

1. `npm run style -- Vega` runs `shadcn apply` with the code of that style, then `shadcn add --all --overwrite`, so every component is rewritten in the new style.
2. `npm run themes` refreshes the option data and `theme-options.json`, so the panel shows the new style name.
3. `npm run build` compiles the result. This also refreshes `client/component_list.lua`.

If the style name is not known you get `Style tidak dikenal. Pilihan: ...` ("unknown style") followed by the valid names. Names are case-sensitive.

Afterwards open `web/components.json` and check that `style` shows what you expect (for example `base-vega`). Then restart `nyx_lib`.

## Change Icon Library, Menu or Menu Accent

These have no `npm run` shortcut. Create the look you want at <https://ui.shadcn.com/create>, copy its code, then in the `web` folder:

```bash
npx shadcn@latest apply NEW_PRESET_CODE
npx shadcn@latest add --all --overwrite
npm run themes
npm run build
```

Then restart `nyx_lib`.

::: tip Changing the style at the same time?
A preset code from the create page holds all the baked-in choices together. If you want a different Style and a different Menu, one `apply` with the new code does both.
:::

## What does *not* need a rebuild of the components

Base Color, Theme, Chart Color, Heading, Font, Radius and Dark mode are switchable live. To offer more values for them, see [Adding theme options](/nyx_lib/theming/adding-options).
