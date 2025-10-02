Angular 20 Directive Hard Requirements:
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- `Directive` should NEVER be part of the selector for the directive
- If the affect of the directive should be able to be turned off, have `null` value that basically removes everything
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- All inputs for a directive MUST have a export default value using the pattern of `[direct name minus the Directive part]_[input name minus the selector prefix part]_DEFAULT`
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
