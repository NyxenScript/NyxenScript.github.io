# Using Tailwind classes

You can style your own windows with Tailwind class names through `className`:

```lua
nyx.div({ className = 'grid gap-4 py-2' }, ...)
```

## The one rule

Tailwind only creates the CSS for class names it can **find written in the web source code**. Classes that exist only in your Lua are invisible to it, so they would do nothing.

To fix that, list every class you use in `web/src/nyx/classes.ts`, then rebuild.

## Steps

1. Open `nyx_lib/web/src/nyx/classes.ts`.
2. Add your classes inside the backtick text, separated by spaces:

   ```ts
   export const NYX_CLASSES = `
   grid gap-1 gap-2 gap-4 py-2 ...
   my-new-class another-class
   `
   ```
3. In the `web` folder, run:

   ```bash
   npm run build
   ```
4. Restart `nyx_lib` (`ensure nyx_lib`).

::: tip
The classes used by nyx_lib's own functions are already listed in that file. You only need to add new ones.

Tailwind scans every file under `web/src`, so a class that already appears somewhere in the shadcn components works without being added. Adding it to `classes.ts` is the safe way to be sure.
:::

## Prefer theme colours

Use shadcn's theme-aware class names such as `text-muted-foreground`, `bg-popover`, `border` and `text-destructive`. They follow the server's theme and dark mode automatically, unlike fixed colours.
