# show-password-toggle

Vanilla JavaScript web component that adds a checkbox to show/hide the value of a password input when wrapped in a simple namespaced custom element.

## Features

- Ability to specify the label if “Show password” is not desired
- Ability to specify the language of the label if different from the page’s language
- Ability to add a small pie chart indicator of minimum characters needed
- Light DOM so its elements can be styled with CSS
- Progressive enhancement, so the input will continue to work if the custom element fails to load

## Usage

Import the custom element and wrap your password inputs.

```html
<script type="module" src="ShowPasswordToggle.js"></script>

<!-- wrap password inputs in custom element -->
<show-password-toggle>
  <input type="password" name="…" id="…">
</show-password-toggle>

<!-- add optional attributes to the custom element -->
<show-password-toggle label="Show/Hide" label-class="inline" min-length="12">
  <input type="password" name="…" id="…" pattern=".{12,}">
</show-password-toggle>
```

## Options

| Attribute name | Type | Behavior |
|----------------|------|----------|
| `label` | String | Display this instead of 'Show password' |
| `label-class` | String | Apply this/these classes to the label |
| `lang` | String | Apply this `lang` attribute to the label |
| `min-length` | Int | If greater than 0, show a pie chart and a label describing minimum password length |
| `min-length-label` | String | Display this instead of 'At least ### characters' (`###` is replaced with the min-length attribute) |

## Styling

- `.show-password-toggle` targets the added content (label, checkbox, optional min-length elements)
- `.show-password-toggle label` targets the label (note you can also use the `label-class="add these classes"` attribute on the `show-password-toggle` element as well)
- `.show-password-toggle .min-length` targets the min length pie chart and text
- `.show-password-toggle-svg` targets the min-length pie chart
- `.show-password-toggle-svg-bg` targets the background of the pie chart
- `.show-password-toggle-svg-bg.is-valid` targets the background of the pie chart when the min length is met
- `.show-password-toggle-svg-bg` targets the foreground slice of the pie chart (note there is no slice when the min length is met)

## License

GNU LGPL 3.0
