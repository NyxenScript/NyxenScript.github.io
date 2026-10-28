# Glossary

Plain-language meanings of the words used in these docs.

**ACE (permissions)**
FiveM's built-in permission system. Rules such as `add_ace group.admin nyx_lib.config allow` say who may do what.

**Build**
Turning source code into the final files a browser can run. For nyx_lib, `npm run build` produces `web/dist`.

**Builder**
A function such as `nyx.Button(...)` that creates one component of a window. See [Component builders](/nyx_lib/ui/builders).

**Client / Server**
The *client* is the game on a player's computer. The *server* is the machine that runs your FiveM server. Code in `client/` runs for each player; code in `server/` runs once on the server.

**Command**
Something you type in chat or the F8 console, such as `/nyx_demo`.

**Component**
One building block of a window, such as a button, a dialog or a select. nyx_lib uses the components of shadcn/ui.

**Console (F8)**
The in-game developer console opened with the F8 key. Errors from client scripts appear here.

**Dark mode**
A dark colour scheme for all nyx_lib windows. Set per server.

**Event**
A message one piece of code sends to another. nyx_lib uses events for things like "the theme changed".

**Export**
A function a resource offers to other resources, called like `exports.nyx_lib:notify(...)`. nyx_lib also has one export per shadcn component.

**fxmanifest.lua**
The file that describes a resource: its name, version and which files to load.

**KVP**
"Key-value pair" storage that FiveM keeps on the server. nyx_lib saves the chosen theme there so it survives restarts.

**Library**
A resource that exists to help other resources instead of adding gameplay.

**Node.js / npm / npx**
Tools used on your PC to build the web part of nyx_lib. npm installs packages, npx runs tools.

**NUI**
FiveM's name for web-based user interfaces drawn on top of the game.

**Option (theme option)**
One setting of the theme, such as Base Color, Theme, Chart Color, Heading, Font, Radius or Dark mode. Each option has a list of values to choose from.

**Preset (preset code)**
A short code from ui.shadcn.com (such as `b0` or `b1PzeK`) that stands for a bundle of design choices. nyx_lib no longer lets admins switch between whole presets. It uses preset codes only to *collect* the data for each single option value. See [Theme files](/nyx_lib/reference/theme-files).

**Resource**
A folder of scripts and files that FiveM loads. nyx_lib is a resource.

**shadcn/ui**
A popular collection of web interface components (buttons, dialogs, selects and more). nyx_lib is built on it.

**server.cfg**
Your server's main configuration file, where you `ensure` resources and set permissions.

**Snapshot**
What `npm run themes` does: it applies each preset code with the shadcn tool, compares the result with the default, and saves only the differences as CSS.

**Tailwind CSS**
A styling system that uses short class names such as `text-sm` or `grid`.

**Theme**
The overall look: colours, fonts, corner roundness, dark or light, and so on. In nyx_lib it is shared by the entire server. (Also the name of one option, which picks the accent colour.)

**Toast**
A small notification that slides in at the corner of the screen. See [notify](/nyx_lib/client/notify).

**Tree**
The way nyx_lib describes a window to the web part: a nested list of components. See [Raw tree format](/nyx_lib/ui/raw-tree).

**txAdmin**
The popular web panel used to manage FiveM servers.
