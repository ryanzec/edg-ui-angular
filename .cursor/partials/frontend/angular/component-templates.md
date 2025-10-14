Angular 20 Component Template Hard Requirements:
- don't use `[value]` for selects, either use `[selected]` for the option or reactive form binding if a reactive form is needed
- Keep templates simple and avoid complex logic
- Use the async pipe to handle observables
- ALWAYS use html entity for angualr special character in template (such as `&#64;` instead of `@`)
<!--
This button component is a better choice for accessability and it already unstyled by tailwind so there are not style concerns with this
-->
- ALWAYS use the `buttom` component when needing to create an element that has clickbility
- ALWAYS use the `projects/shared-ui/src/lib/core/logger-pipe` pipe to log things in an angualr template
