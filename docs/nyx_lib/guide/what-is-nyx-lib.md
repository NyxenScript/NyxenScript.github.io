# What is nyx_lib?

**nyx_lib** is a *library* for FiveM servers. A library is not something players use directly. It is a helper that other scripts use to draw things on the screen.

Think of it like a box of ready-made building blocks: confirmation pop-ups, forms, menus, notifications and progress bars. A script author who uses nyx_lib does not have to design any of these from scratch.

It is built on [shadcn/ui](https://ui.shadcn.com), a popular collection of web components, and its function names follow the style of `ox_lib`, so developers who know ox_lib will feel at home.

## What can it do?

| You want to... | Use |
|---|---|
| Ask "Are you sure?" | [`alertDialog`](/nyx_lib/client/alert-dialog) |
| Show a form (name, age, dropdown, checkbox...) | [`inputDialog`](/nyx_lib/client/input-dialog) |
| Show a menu of choices | [`showContext`](/nyx_lib/client/show-context) |
| Show a small message in the corner | [`notify`](/nyx_lib/client/notify) |
| Show a hint such as "[E] Open" | [`showTextUI`](/nyx_lib/client/text-ui) |
| Show a loading bar | [`progressBar`](/nyx_lib/client/progress-bar) |
| Build a completely custom window | [Component builders](/nyx_lib/ui/builders) |
| Change the look of every window on the server | [Theming](/nyx_lib/theming/how-it-works) |

## Who is this documentation for?

- **Server owners** only need [Installation](/nyx_lib/guide/installation) and [Theming](/nyx_lib/theming/admin-panel). You do not need to write code.
- **Script developers** should read [Quick start](/nyx_lib/guide/quick-start) and then the function pages.

## Good to know

- The theme belongs to the **server**, not to individual players. Only people you give permission to can change it.
- nyx_lib needs a one-time **build step** on your own computer before it works. This is explained step by step in [Installation](/nyx_lib/guide/installation).
- The current version is **0.2.0**.

::: tip New to FiveM terms?
Words like *resource*, *NUI* or *ACE* are explained in the [Glossary](/nyx_lib/guide/glossary).
:::
