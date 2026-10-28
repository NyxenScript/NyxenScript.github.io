# Installation

This takes about **10 to 15 minutes**. nyx_lib's windows are a small web app, and that web app has to be *built* (compiled) once on your own computer. The zip file does not include the finished build, so skipping the build is the most common reason for a blank screen.

## Step 0: What you need

- A working FiveM server (txAdmin or manual).
- **Node.js** version 20 or newer (the "LTS" version) from [nodejs.org](https://nodejs.org). To check, open a terminal and run:

  ```bash
  node -v
  npm -v
  ```
- An internet connection. The shadcn tool downloads components from ui.shadcn.com.

## Step 1: Put the resource in your server

Unzip `nyx_lib.zip` into your resources folder, for example `resources/[lib]/nyx_lib`. You should end up with:

```text
nyx_lib/
  fxmanifest.lua  config.lua  init.lua
  client/  server/
  web/   (package.json, presets.json, src/, scripts/)
```

## Step 2: Pick your look (preset)

1. Open <https://ui.shadcn.com/create>.
2. Choose Style, Base Color, Theme, Chart Color, Heading, Font, Icon Library, Radius, Menu and Menu Accent however you like.
3. Click **Get Code**. Copy the code that comes after `--preset` (for example `b0`).

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

## Step 6: Build

```bash
npm run build
```

This creates `web/dist/index.html`. If the build fails at the type-check step (`tsc`), try `npx vite build` and keep the error message so you can ask for help.

## Step 7: Turn it on in your server

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

## Step 8: Test it

1. Join the server, press **F8** and type `/nyx_demo`. A small form appears, and a notification shows when you finish.
2. As an admin, type `/nyx_config`. A panel with the preset list and a dark-mode switch appears. Players without permission only see a "no permission" message.
3. From the server console, type `nyx_theme default dark`.

## Step 9: Use it from your other scripts

In the `fxmanifest.lua` of the script that wants to use nyx_lib:

```lua
shared_script '@nyx_lib/init.lua'
```

Now the global `nyx` is available. See [Quick start](/nyx_lib/guide/quick-start).

## Step 10: Upload to your production server

After building, `web/node_modules` is **not needed** on the server. Keep it on your PC and upload without it. The server only needs:

- `web/dist/`
- `web/presets.json`
- the Lua files (`fxmanifest.lua`, `config.lua`, `init.lua`, `client/`, `server/`)

## Next steps

- [Add more presets](/nyx_lib/theming/adding-presets) so admins can switch looks in-game.
- Something wrong? See [Troubleshooting](/nyx_lib/guide/troubleshooting).
