# Permissions (ACE)

nyx_lib uses one permission:

| Permission | Allows |
|---|---|
| `nyx_lib.config` | Opening `/nyx_config`, changing the theme from the panel, and running `nyx_theme` in game. |

Example for `server.cfg`:

```cfg
add_ace group.admin nyx_lib.config allow
add_principal identifier.license:XXXXXXXXXXXXXXXX group.admin
```

The server console always has access. Permission checks are made on the server, so players cannot bypass them. This also covers the internal events the panel uses (`nyx_lib:setTheme` and `nyx_lib:resetTheme`). A request from a player without the permission is ignored.

The theme exports (`SetTheme`, `ResetTheme`) can only be called by server scripts and do not check the permission. Only give trusted resources server access.
