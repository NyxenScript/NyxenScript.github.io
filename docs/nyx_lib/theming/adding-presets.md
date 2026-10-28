# Adding presets

A preset is a look created on shadcn's website. You can offer several, and admins switch between them in game.

## Steps

1. Create a new preset at <https://ui.shadcn.com/create> and copy its code.
2. Register it in `web/presets.json`:

   ```json
   {
     "default": "b0",
     "presets": {
       "nova-neutral": "b0",
       "gelap-biru": "NEW_CODE"
     }
   }
   ```

   - `default` is the code you used at build time.
   - Under `presets`, the **key** (such as `gelap-biru`) is the name admins will see, and the **value** is the shadcn code.
3. In the `web` folder, run:

   ```bash
   npm run presets
   npm run build
   ```
4. Restart `nyx_lib`. The new preset appears in `/nyx_config`.

## What `npm run presets` does

For every preset in the file it runs `shadcn apply`, saves the official colour values into `web/src/presets/<name>.css`, and finally restores the default preset. No colours are invented by nyx_lib.

## Good to know

- Only the colours and other CSS variables change live. Style and icons do not. See [Changing style or icons](/nyx_lib/theming/style-and-icons).
- Preset names appear in the panel in alphabetical order, after `default`.
- Needs internet access, because it calls the shadcn tool.
