For references to use to see what type of strutural styles (padding, margin, border radius, etc.) are common in out existing component set, reference these files:
- `projects/shared-ui/src/lib/core/button/button.html`

You MUST ALWAYS use these patterns when work in styling code:
- ALWAYS use reference images as a rough reference to the structure and over goal but not end goal pixel perfect expection, ALWAYS use existing colors and spaces that best matches when is in the image
- ALWAYS prioritize written instruction over reference images
- ALWAYS use tailwind styling
- ALWAYS use flexbox for aligning and spacing a group of elements
```
// ALWAYS DO
class="flex flex-col gap-2"
```
- ALWAYS omit passing values to component inputs that has a default value other than `null` UNLESS EXPLICITLY told too
- ALWAYS account for both light and dark mode though custom css variable as done in `projects/shared-ui/src/lib/core/button/button-variables.css`
- ALWAYS use `var()` when defining custom css variables
- ALWAYS create component level design system tokens for colors in a component variables file named `[COMPONENT-NAME]-variables.css` and ONLY reference general design system token variables defined in `projects/shared-ui/src/lib/variables.css` when defining those tokens
- ALWAYS import component level design system token into `projects/shared-ui/src/lib/variables.css`
- ALWAYS make sure when using tailwind color css class you are ONLY using component design system token define in the component variables file or general design system token variables defined in `projects/shared-ui/src/lib/variables.css`
- ALWAYS reference component level design system tokens for color for tailwind css classes
<!--
This make the tailwind class much more managable as we don't have to define 2 colors for each mode in tailwind and instead just one
-->
- ALWAYS use the `.dark-theme` for defining dark mode colors
<!-- 
Importing tailwind multiple times cause duplication in styles but referencing the file that imports it does not an still allows use to use @apply in the file
-->
- ALWAYS use `@reference` on `projects/shared-ui/src/lib/tailwind.css` if you must define a component css file to be able to `@apply` in it
- ALWAYS use `/* ... */` to comment is CSS
<!--
This helps breakup very long string and make tailwind far easier to read in my opinion
-->
- ALWAYS group the follow css classes together in there own string when NOT tied to a conditional variable: structural, animations, transitions, hover state, focused state, focus-within, active state like this:
```
<div
    [class]="
      mergeClasses(
        'relative inline-flex items-center w-full px-1.5 py-0.5 gap-1 min-h-[30px]',
        'animate-pulse',
        'transition-colors duration-200',
        'focus:outline-none',
        'hover:bg-secondary-background-hover',
        'active:bg-secondary-background-active',
        'focus-within:ring-1 focus-within:ring-input-ring-focused',
        {
          'border rounded-md bg-input-background-default border-input-border-default': variant() === 'bordered',
        },
        containerClass()
      )
    "
  >
```
- ALWAYS specific explicit `px` or `rem` values for `w-*` / `h-*` / `min-w-*` / `min-h-*` / `max-w-*` / `max-h-*` use tailwind's arbitrary value syntax (`w-[100px]`)
<!--
This ensure tailwind class can override these styles which is almost always the desired case
-->
- ALWAYS wrap css in general component css files (NOT variables component cssfiles) in `@layer components {...}`
- ALWAYS use negative margins as a LAST resort
- ALWAYS utilize flexbox / gap for space element in a container
<!--
This will only apply the styling when the keyboard navigation is being used so it provide good accessability but avoid un-needed styling when a mouse is being used.
-->
- ALWAYS use `focus-visible` over `focus` pseduo selector
- ALWAYS use thing like background color change when styling `focus` elements for accessability
- ALWAYS prevent states based styles from being applied in the component can be and is disabled
<!--
This make keyframes globally able and re-usable.
-->
- ALWAYS place ALL @keyframes definations in `projects/shared-ui/src/lib/animations.css`

You can NEVER use these patterns when work in styling code:
<!-- 
`space-y-*` using styling techniques that were needed when flexbox was not avilable and with flexbox widely avaialble for year, using that solution is more flexible (for example, if the elements in `space-y-*` are display: inline, the styling does not work)
-->
- NEVER use tailwinds `space-*` classes spacing a group of elements
```
// NEVER DO
class="space-y-2"
```
- NEVER use the style tag unless the value NEEDS to be dynamic based on typescript code
- NEVER use tailwinds `theme()` function when defining custom css variables
- NEVER reference tailwind colors outside of the general design system tokens file in `projects/shared-ui/src/lib/variables.css`
- NEVER EVER use tailwind's `dark:` selector, NEVER
<!--
I consider this UX to be far worse than let the user submit an invalid form and just showing the validation errors
-->
- NEVER disabled a button until the form in validate
- NEVER add animations or transitions unless explicitly asked for
- NEVER use variable values for `w-*` / `h-*` / `min-w-*` / `min-h-*` / `max-w-*` / `max-h-*` like `w-2` / `min-h-96`
- NEVER use box shadows unless EXPLICITLY asked for
- NEVER use margin to space element within a container
- NEVER use ring / outline styles
