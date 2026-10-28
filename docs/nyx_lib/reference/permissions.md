# Permissions (ACE)

nyx_lib uses one permission:

| Permission | Allows |
|---|---|
| `nyx_lib.config` | Opening `/nyx_config` and running `nyx_theme` in game. |

Example for `server.cfg`:

```cfg
add_ace group.admin nyx_lib.config allow
add_principal identifier.license:XXXXXXXXXXXXXXXX group.admin
```

The server console always has access. Permission checks are made on the server, so players cannot bypass them.
