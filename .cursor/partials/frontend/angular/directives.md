Angular 20 Directive Hard Requirements:


You MUST ALWAYS use these patterns when work on Angular 20 directives:
- ALWAYS ask for the name of the selector if one has not been explicitly given to you
- ALWAYS use host bindings inside the `host` object of the `@Directive` decorator when needed
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
- ALWAYS make sure sure all inputs and outputs of a directive are prefix with the camelCase version of the directive name minus the `Directive` part like this:
```ts
// ...
export class ScrollAreaDirective {
  // ...
  public scrollAreaDirection = input<ScrollAreaDirection | ''>(SCROLL_AREA_DIRECTION_DEFAULT);
  public scrollAreaOnlyShowOnHover = input<boolean>(SCROLL_AREA_ONLY_SHOW_ON_HOVER_DEFAULT);
  // ... 
```
- ALWAYS use Renderer2 when inject html from a directive
- ALWAYS use `@HostListener` ONLY when you need to apply listeners to things that target something outside element (like the `document`)

You MUST NEVER use these patterns when work on Angular 20 directives:
- NEVER use `Directive` in the name of the selector
- NEVER use `@HostBinding` decorators
<!--
This is the default 
-->
- NEVER use `standalone: true` in the `@Directive` decorator
- 
