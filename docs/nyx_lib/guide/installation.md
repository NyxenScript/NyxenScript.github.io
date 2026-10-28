# Installation

This takes about **10 to 15 minutes**. nyx_lib's windows are a small web app, and that web app has to be *built* (compiled) once on your own computer. The zip file does not include the finished build, so skipping the build is the most common reason for a blank screen.

## Step 0: What you need

- A working FiveM server (txAdmin or manual).
- **Node.js** version 20 or newer (the "LTS" version) from [nodejs.org](https://nodejs.org). To check, open a terminal and run:

  ```bash
  node -v
  npm -v
  ```
- An internet connection. The shadcn tool downloads components and theme data from ui.shadcn.com.
- Git is recommended. Some steps rewrite `web/src/index.css` for a moment, so a commit gives you an easy way back.

## Step 1: Put the resource in your server

Unzip `nyx_lib.zip` into your resources folder, for example `resources/[lib]/nyx_lib`. You should end up with:

```text
nyx_lib/
  fxmanifest.lua  config.lua  init.lua
  client/   (main.lua, components.lua, exports.lua, component_list.lua)
  server/   (main.lua)
  web/      (package.json, theme-codes.json, theme-options.json, src/, scripts/)
```

## Step 2: Pick your base look

1. Open <https://ui.shadcn.com/create>.
2. Choose Style, Base Color, Theme, Chart Color, Heading, Font, Icon Library, Radius, Menu and Menu Accent however you like.
3. Click **Get Code**. Copy the code that comes after `--preset` (for example `b0`).

This code decides the things that are baked into the components (Style, Icon Library, Menu, Menu Accent) and the starting colours.

## Step 3: Install the web dependencies

Open a terminal **inside the `nyx_lib/web` folder** and run:

```bash
npm install
```

## Step 4: Set up shadcn with your preset

```bash
npx shadcn@latest init --preset YOUR_PRESET_CODE
```

- If asked for a framework, choose **Vite**.
- If asked whether to overwrite files, answer **Yes**.
- If the tool complains about the `@` import alias, make sure `web/tsconfig.json` still contains `"paths": { "@/*": ["./src/*"] }`.

## Step 5: Add all components

```bash
npx shadcn@latest add --all
```

Answer **Yes** if asked to overwrite.

## Step 6: Fetch the data for every theme option

This step is what fills the drop-downs in `/nyx_config`. Without it, each option only offers a single value (Neutral, Inter, Default).

1. Check that `web/theme-codes.json` has a code for every value you want to offer. The file that ships with nyx_lib is already filled in. See [Adding theme options](/nyx_lib/theming/adding-options) if you want to change it.
2. Commit or back up your files (`git add -A && git commit -m "before themes"`).
3. Run:

   ```bash
   npm run themes
   ```

It runs the shadcn tool once per code, which takes a few minutes and needs internet. When it ends you see a line such as:

```text
selesai: BaseColor=7, Theme=18, ChartColor=18, Radius=5, Font=22, Heading=27
```

("selesai" means "done".) The numbers are how many values each option now offers. If it stops halfway because of a network error, run the same command again and it continues where it stopped. See [`npm run themes` in detail](/nyx_lib/theming/adding-options#running-npm-run-themes).

## Step 7: Build

```bash
npm run build
```

This first refreshes the component export list (`client/component_list.lua`), then type-checks, then builds `web/dist/index.html`. The build prints many font files and a "chunks are larger than 500 kB" warning. Both are normal.

If the build fails at the type-check step (`tsc`), try `npx vite build` and keep the error message so you can ask for help.

## Step 8: Turn it on in your server

In `server.cfg`, start nyx_lib **before** any script that uses it:

```cfg
ensure nyx_lib
```

Then give yourself permission to change the theme (replace the identifier with your own):

```cfg
add_ace group.admin nyx_lib.config allow
add_principal identifier.license:XXXXXXXXXXXXXXXX group.admin
```

::: tip Where do I find my license identifier?
It is part of a player's identifiers, for example in the txAdmin player details or the server console when you connect. Copy the full value that starts with `license:`.
:::

Restart the server, or type `ensure nyx_lib` in the server console.

## Step 9: Test it

1. Join the server, press **F8** and type `nyx_demo`. A small form appears, and a notification shows when you finish.
2. As an admin, type `/nyx_config`. A panel with one drop-down per theme option and a dark-mode switch appears. Players without permission only see a "no permission" message.
3. From the server console, type `nyx_theme list` to see every available value, then `nyx_theme Theme Blue` or `nyx_theme dark`. To go back to the values in `config.lua`, type `nyx_theme reset`.
4. Test the per-component exports from the F8 console or a client script:

   ```lua
   local nx = exports.nyx_lib
   nx:Show(
     nx:Dialog({ open = true },
       nx:DialogContent(
         nx:DialogHeader(nx:DialogTitle('Hi')),
         nx:Button({ onClick = nx:emit('ok') }, 'OK'))),
     true)
   ```

## Step 10: Use it from your other scripts

In the `fxmanifest.lua` of the script that wants to use nyx_lib:

```lua
shared_script '@nyx_lib/init.lua'
```

Now the global `nyx` is available. You can also skip `init.lua` and call `exports.nyx_lib:...` directly. See [Quick start](/nyx_lib/guide/quick-start).

## Step 11: Upload to your production server

After building, `web/node_modules` is **not needed** on the server. Keep it on your PC and upload without it. The server only needs:

- `web/dist/`
- `web/theme-options.json`
- the Lua files: `fxmanifest.lua`, `config.lua`, `init.lua`, `client/` (including `client/component_list.lua`) and `server/`

::: warning Rebuild after every theme or component change
Colours, fonts and radius values are baked into `web/dist` by `npm run build`. If you ran `npm run themes`, added a component, or changed the style, build again and upload the new `web/dist`, `web/theme-options.json` and `client/component_list.lua`.
:::

## Next steps

- [Add more theme options](/nyx_lib/theming/adding-options) so admins have more choices in game.
- [Change Style, Icon Library or Menu](/nyx_lib/theming/style-and-icons) (needs a rebuild).
- Something wrong? See [Troubleshooting](/nyx_lib/guide/troubleshooting).
