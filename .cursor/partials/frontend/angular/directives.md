Angular 20 Directive Hard Requirements:


You MUST ALWAYS use these patterns when work on Angular 20 directives:
- ALWAYS ask for the name of the selector if one has not been explicitly given to you
- ALWAYS use host bindings inside the `host` object of the `@Directive` decorator when needed
- ALWAYS allow `null `as a value if the directive is designed to be turned off
- ALWAYS have a export default value for each input of the directive using the pattern of `[direct name minus the Directive part]_[input name minus the selector prefix part]_DEFAULT`
```ts
export const COMPONENT_COLOR_COLOR_DEFAULT: ComponentColor | null = null;

@Directive({
  // ...
})
export class ComponentColorDirective {
  public orgColor = input<ComponentColor | null>(COMPONENT_COLOR_COLOR_DEFAULT);
  // ...
}
```
You MUST NEVER use these patterns when work on Angular 20 components:
- NEVER use `Directive` in the name of the selector
- NEVER use `@HostBinding` and `@HostListener` decorators
<!--
This is the default 
-->
- NEVER use `standalone: true` in the `@Directive` decorator
- 
