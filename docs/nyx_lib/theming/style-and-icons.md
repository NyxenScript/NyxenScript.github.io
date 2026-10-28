# Changing style or icons

**Style** and **Icon Library** are built into the component code, so they cannot be switched while the game runs. To change them, apply a new preset and rebuild. In the `web` folder:

```bash
npx shadcn@latest apply NEW_PRESET_CODE
npx shadcn@latest add --all --overwrite
npm run build
```

Then restart `nyx_lib`.

::: warning
`add --all --overwrite` replaces the component files in `web/src/components/ui`. If you edited any of them by hand, back them up first.
:::
