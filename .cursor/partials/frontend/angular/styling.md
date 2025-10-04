For references to use to see what type of strutural styles (padding, margin, border radius, etc.) are common in out existing component set, reference these files:
- `projects/shared-ui/src/lib/core/button/button.html`
- `projects/shared-ui/src/lib/core/button/button.css`

For a reference of when to split css between inline in the html vs css file, reference this code:
- `projects/shared-ui/src/lib/core/button/button.css`
- `projects/shared-ui/src/lib/core/button/button.html`

Styling Hard Requirements:
- When presented with a image to reference for implementation, you want to use it as a rough reference but use the existing code as a real reference for specific value as it relates to spacing, colors, etc.
- Alway prefer tailwind styling over css whenever possible
- Components that can have a disabled state should make sure other visual states don't show if they are disabled (hover effects, focus effect, aniamtion, etc.)
- For accessibility and focus state, NEVER EVER use rings / outlines, utilize things like background color changes and such
- For accessibility, always use the `focus-visible` pseduo class instead of just `focus` as these styling are for keyboard navigation
- Always utilize flexbox / gap instead of margin for spacing elements
- Avoid usage of box shadow unless explicitly asked for
- Avoid using negative margins
- Wrap all custom styling in a `@layer components {...}` so that it plays nicely with tailwind
- Never apply explicit height or width to a non-view based component unless explicitly asked to
  - When explicit width / height is needed, use `min-w-[]` pattern instead of the `min-w-10` pattern since it is cleaner to read
- Never add any animations unless specifically asked for
- Avoid applying css / tailwind class in the typescript code
  <!-- Not allows this here make styling the host element a bit more tedious than it is worth -->
  - This is acceptable ONLY in the case of applying classes to the host element
- When there are several colors + states, that might warrant a  css file for better readability (like with )
- To make tailwind more readable, please use a pattern of grouping structural styles, animations, and then different states together where there is a large list of tailwind css that are being used on a single element (implementation reference: `projects/shared-ui/src/lib/core/button/button.css`)
- Buttons should never be disabled before a form is invalid, there should be allowed to submit and see the errors
- Comment in `.css` files MUST use `/* ... */` pattern
<!-- I feel using custom variables and then switching them on something like body.dark-theme is more readability and flexible -->
- NEVER EVER use tailwinds `dark:` feature, NEVER
- For coloring we need to make sure to support both light and dark mode by:
  <!-- this is needs as do this in the main css file will not have the variables available globally with how angular manages compoennt css -->
  - creating a [component-name]-variables.css and defining custom compoennt variables like we do in `projects/shared-ui/src/lib/core/button/button-variables.css`
  - import that file into `projects/shared-ui/src/lib/variables.css`
  - then the main component css file should should reference those component level variables
  - again, NEVER EVER use tailwinds `dark:` feature, NEVER
<!-- this make sure that @apply can be used and avoid duplication of styles -->
- when creating css files for compoment, you must use `@reference` on the `projects/shared-ui/src/lib/tailwind.css` file
<!-- `space-y-*` using styling techniques that were needed when flexbox was not avilable and with flexbox widely avaialble for year, using that solution is more flexible (for example, if the elements in `space-y-*` are display: inline, the styling does not work) -->
- Do NOT use tailwind classes like `space-y-*` and instead use modern css flexbox which is a more flexible solution
- When defining custom css variables, ALWAYS use `var(), NEVER tailwinds `theme()` function
- ALWAYS create component design tokens that reference system design components that are defined, availaboe core design taken as in`projects/shared-ui/src/lib/variables.css`, pattern of implementation can be found in `projects/shared-ui/src/lib/core/button/button-variables.css`
- For color styling, please make sure all colors being usse are using custom design tokens.
- NEVER USE TAILWIND COLORS WITH CSS CLASSES, ONLY USE WHEN DEFINING OTHER COLOR DESIGN TOKENS







ALWAYS use these patterns:
- ALWAYS use flexbox over tailwinds `space-*` classes
```
// ALWAYS DO
class="flex flex-col gap-2"

// NEVER DO
class="space-y-2"
```

NEVER use these patterns:







