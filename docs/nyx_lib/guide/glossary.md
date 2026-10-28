# Glossary

Plain-language meanings of the words used in these docs.

**ACE (permissions)**
FiveM's built-in permission system. Rules such as `add_ace group.admin nyx_lib.config allow` say who may do what.

**Build**
Turning source code into the final files a browser can run. For nyx_lib, `npm run build` produces `web/dist`.

**Client / Server**
The *client* is the game on a player's computer. The *server* is the machine that runs your FiveM server. Code in `client/` runs for each player; code in `server/` runs once on the server.

**Command**
Something you type in chat or the F8 console, such as `/nyx_demo`.

**Console (F8)**
The in-game developer console opened with the F8 key. Errors from client scripts appear here.

**Dark mode**
A dark colour scheme for all nyx_lib windows. Set per server.

**Event**
A message one piece of code sends to another. nyx_lib uses events for things like "the theme changed".

**Export**
A function a resource offers to other resources, called like `exports.nyx_lib:notify(...)`.

**fxmanifest.lua**
The file that describes a resource: its name, version and which files to load.

**Library**
A resource that exists to help other resources instead of adding gameplay.

**Node.js / npm / npx**
Tools used on your PC to build the web part of nyx_lib. npm installs packages, npx runs tools.

**NUI**
FiveM's name for web-based user interfaces drawn on top of the game.

**Preset**
A saved bundle of design choices (colours, fonts, corner roundness and so on) from shadcn. Identified by a short code such as `b0`.

**Resource**
A folder of scripts and files that FiveM loads. nyx_lib is a resource.

**shadcn/ui**
A popular collection of web interface components (buttons, dialogs, selects and more). nyx_lib is built on it.

**server.cfg**
Your server's main configuration file, where you `ensure` resources and set permissions.

**Tailwind CSS**
A styling system that uses short class names such as `text-sm` or `grid`.

**Theme**
The overall look: colours, dark or light, and so on. In nyx_lib it is shared by the entire server.

**Tree**
The way nyx_lib describes a window to the web part: a nested list of components. See [Raw tree format](/nyx_lib/ui/raw-tree).

**txAdmin**
The popular web panel used to manage FiveM servers.
