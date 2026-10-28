# inputDialog

Shows a form with one or more fields and waits for the player to fill it in.

```lua
local values = nyx.inputDialog(heading, rows)
```

## Parameters

| Name | Type | Description |
|---|---|---|
| `heading` | string | Title of the form. |
| `rows` | table | A list of field definitions, shown top to bottom. |

Each entry in `rows` is a table. These fields work for **every** type:

| Field | Type | Description |
|---|---|---|
| `type` | string | Which kind of field. See the list below. Defaults to `'input'`. |
| `label` | string | Text above the field. |
| `description` | string | Small grey help text under the field. |
| `required` | boolean | The player must fill it in. A `*` is added to the label. |
| `default` | any | Starting value. |

## Field types

| `type` | What it is | Extra options | Value you get back |
|---|---|---|---|
| `'input'` | One-line text | `placeholder`, `password` (true hides the text) | string |
| `'number'` | Number box | `min`, `max`, `step`, `placeholder` | number |
| `'textarea'` | Multi-line text | `placeholder` | string |
| `'select'` | Drop-down list | `options` (list of `{ value = '', label = '' }`), `placeholder` | the chosen option's `value` |
| `'checkbox'` | Tick box | `checked` (or `default`) | `true` / `false` |
| `'switch'` | On/off switch | `checked` (or `default`) | `true` / `false` |
| `'slider'` | Slider | `min` (default 0), `max` (default 100), `step` (default 1) | number |

## Returns

- A **list of values in the same order as `rows`** when the player presses **Simpan** (Save).
- **`nil`** when the player cancels (the **Batal** button or ESC).

If a `required` field is empty, the form stays open and shows "Isi semua kolom yang wajib." (fill in all required fields).

## Example

```lua
local values = nyx.inputDialog('Register', {
  { type = 'input',    label = 'Name',  required = true },
  { type = 'number',   label = 'Age',   min = 0 },
  { type = 'select',   label = 'Role',  options = {
      { value = 'a', label = 'Role A' },
      { value = 'b', label = 'Role B' },
  } },
  { type = 'checkbox', label = 'I agree', required = true },
  { type = 'switch',   label = 'Active', checked = true },
  { type = 'textarea', label = 'Notes' },
  { type = 'slider',   label = 'Amount', min = 0, max = 10 },
})

if not values then return end -- cancelled

local name, age, role = values[1], values[2], values[3]
```

## Good to know

::: warning Untouched fields can be nil
If the player never touches a text, number or select field, its value may be `nil`. Read values with `values[1]`, `values[2]` and so on. Do **not** use `ipairs(values)` because it stops at the first `nil`. Use `required = true` for fields you need.
:::

- For `checkbox` and `switch`, `required = true` means the player must turn it **on**.
- The button texts **Batal** and **Simpan** are fixed in `client/components.lua`.
- A third argument (`options`) is accepted but currently unused.
