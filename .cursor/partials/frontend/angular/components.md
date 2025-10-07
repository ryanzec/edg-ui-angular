
<!--
Things you might want to indicate in your prompt for creating component:
- Should there be a wrapper element in the template for the component
- What parts of the component should be part of a public api
- How you want the component broken out if needed (if there is a part that should be it own re-usable component, create those on their own first in a separate prompt)
- If the component is going to need a store and if so, if it needs to be able to support multiple instances of the component at the same time (important and it indicates of the services injection needs to be structured)
- Defined which services it MUST use with paths to the folder along with:
  - If the service MUST be provided by the parent or itself
  - If the service is optional or not
-->

ALWAYS use the following components over bespoken inline components when appropriate:
- avatar: user display as initials or image - `projects/shared-ui/src/lib/core/avatar`
- avatar stack: for display multiple avatars stacked on each other - `projects/shared-ui/src/lib/core/avatar-stack`
- button: clickable button - `projects/shared-ui/src/lib/core/button`
- card: general purpose content container - `projects/shared-ui/src/lib/core/card`
- checkbox: standard input checkbox - `projects/shared-ui/src/lib/core/checkbox`
- checkbox toggle: a toggle variant of a checkbox - `projects/shared-ui/src/lib/core/checkbox-toggle`
- code block: For simple display of code like data in a block or inline with other text - `projects/shared-ui/src/lib/core/code-block`
- file upload: drag and drop file uploading - `projects/shared-ui/src/lib/core/file-upload`
- icon: icons - `projects/shared-ui/src/lib/core/icon`
- indicator: a small colored / color based indicator with optional number support - `projects/shared-ui/src/lib/core/indicator`
- input: standard text input field - `projects/shared-ui/src/lib/core/input`
- loading icon indicator: loading indicator - `projects/shared-ui/src/lib/core/loading-spinner`
- pagination: pagination for a collection of data - `projects/shared-ui/src/lib/core/pagination`
- tag: badge / tagging / labeling indicator - `projects/shared-ui/src/lib/core/tag`
- textarea: standard textarea input field `projects/shared-ui/src/lib/core/textarea`

ALWAYS use the following directives when valid over duplicating functionality in other components:
- grouping elements with spacing: `projects/shared-ui/src/lib/core/grouped-elements-directive`

When you are requested or need to implement a component that will have an associated store and need to be able to support multiple instances as the same time, you MUST follow the pattern outlined in : `projects/shared-ui/src/lib/examples/parent-child-multiple-nested-communication copy`

For references in how we implement a multitide of component feature, reference these files:
- `projects/shared-ui/src/lib/core/button/button.ts`
- `projects/shared-ui/src/lib/core/input/input.ts`

ALWAYS use the following service with the pattern matches:
- data selection store: for being able to track selected data - `projects/shared-ui/src/lib/core/data-selection-store`


You MUST ALWAYS use these patterns when work on Angular 20 components:
- ALWAYS use angular CDK when it has functionality that be used
- ALWAYS pass the data component need in the inputs
- ALWAYS use modern signal input using `input()`
- ALWAYS use modern event handling using `output()`
- ALWAYS apply best practices for accessibility
- ALWAYS use native control flow like `@if`, `@for`, `@switch` in templates
- ALWAYS use `rxjs` + `outputFromObservable()` when you need to determine if an output event is being listened to like this:
```ts
private _preIconClicked$ = new Subject<void>();
// ...
public preIconClicked = outputFromObservable(this._preIconClicked$);
// ...
```
- ALWAYS use the `host` property when possible of the `@Component` decorator
- ALWAYS add a `dataid` property to top level custom component that is `snake-case` of the component name like `Button` would be `dataid="button"` or `UserList` would be `dataid="user-list"`
- ALWAYS set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- ALWAYS have an input for `class` that is placed on the wrapping element for the component
- ALWAYS have selector be prefixed with `org-`
- ALWAYS ask for the name of the selector if one has not been explicitly given to you
<!-- Because of the reactive nature of Angular's new signals system, the overhead of something like `computed()` and generally not worth worrying about is order to provide a cleaner api -->
- ALWAYS wrap private state access in `computed()` methods
```ts
// ✅ MUST DO
// ...
private _state: State = {
  user: defaultUser,
}
// ...
public isAuthenticated = computed(() => !!this._state.user);
//...
if (!!this.isAuthenticated()) {
  // ...
}
```
- ALWAYS explicitly mark inputs and outputs as `public`
- ALWAYS explicitly mark members (data) / methods (functions) of the class component `protected` if it need to be accessed by the template
- ALWAYS explicitly mark methods (functions) of the class component as `public` for anything that is request to be part of the public api
<!-- needed to avoid compiler issues -->
- ALWAYS use explicitly pattern for add `hostDirectives` to components
```ts
@Component({
  //...
  hostDirectives: [
    {
      directive: ComponentColorDirective,
      inputs: ['orgColor'],
    },
  ],
  //...
})
```
<!-- this will provide better type safety and a clear api, this also always the component to only allow a subset of the directive input values if needed -->
- ALWAYS explicitly define the input(s) that the directive defines on the component itself when adding a `hostDirective` to a component
- ALWAYS add icon to `IconName` in `projects/shared-ui/src/lib/core/icon/icon.ts` if request but not available
- ALWAYS prefix any input with `default*` when it is only used to default internal state
- ALWAYS keep components small and focused on a single responsibility
- ALWAYS use Reactive forms over of Template-driven ones
- ALWAYS use `class` attribute for css classes
- ALWAYS use `style` attribute for inline styles
- ALWAYS create a storybook file (`*.stories.ts`) in the same folder as the component with stories for all the unique state, DO NOT create any play / test related stories in this file
- ALWAYS create a storybook testing file (`*.tests.stories.ts`) in the same folder as the component that is empty
- ALWAYS use a service injection when you ne
- ALWAYS suffix `@ViewChild` member name with `Ref` when it is linked to a native html element and the value for the `@ViewChild` must match:
```ts
// MUST DO
@ViewChild('inputRef')
  public readonly inputRef!: ElementRef<HTMLInputElement>;
```
- ALWAYS suffix `@ViewChild` member name with `Component` when it is linked to an Angular component element and the value for the `@ViewChild` must match:
```ts
// MUST DO
@ViewChild('cardComponent')
  public readonly cardComponent!: Card;
```
<!--
It won't be available in `ngOnInit` without static set to true.

You must make sure this is not wrapped in any conditional logic like `@if` as it will not work in those cases
-->
- ALWAYS use `static: true` for `@ViewChild` ONLY if you need to access the child in the `ngOnInit` lifecycle method
- ALWAYS add a `public mergeClasses` to a component when the template needs condition css classes
- ALWAYS add `public mergeClasses = tailwindUtils.merge;` to the component class and use that in the html template when css class application need to happen based on typescript conditional checks, usage reference: `projects/shared-ui/src/lib/core/pagination/pagination.html`
- ALWAYS define class inputs to a component with a prefix that is a semantic name for what it is applied to
```ts
// MUST DO
public containerClass = input<string>('');
public iconClass = input<string>('');
public inputClass = input<string>('');
```
- ALWAYS default size inputs to `base`
- ALWAYS use `Extract<>` on the ComponentSize type in `projects/shared-ui/src/lib/core/types/component-types.ts` when a component has a size type input for defining the component's size
```ts
export type TestSize = Extract<ComponentSize, 'sm' | 'base' | 'lg'>;
```
- ALWAYS use `Extract<>` on the ComponentSize type in `projects/shared-ui/src/lib/core/types/component-types.ts` when a component has a color type input for defining the component's color
```ts
export type TestColor = Extract<ComponentSize, 'primary' | 'danger'>;
```
- ALWAYS make sure they are no rules in the component css file (`component.css) and removw that file

You can NEVER use these patterns when work on Angular 20 components:
- NEVER re-create functionality that is already available in angular CDK
- NEVER make api calls in non-view components
- NEVER use the older input pattern `@Input()` decorator
- NEVER use the older event system pattern `@Output()` decorator
- NEVER use old control flow pattern like `*ngIf`, `*ngFor`, `*ngSwitch` in templates
- NEVER use the `@HostListener` decorator on component class methods
```ts
// NEVER DO
@HostListener('keydown', ['$event'])
protected keyPress(event: KeyboardEvent): void {
```
- NEVER create methods in components that output css / tailwind class names
```ts
// NEVER DO
public containerClasses() {
  return ['container', 'flex', 'flex-col'];
}
```
- NEVER make internal state `public` or `protected`
- NEVER mark members (data) `public`
- NEVER create an inline template in `@Component` unless less then 10 lines of code
- NEVER use `ngClass` attribute for css classes
- NEVER use `ngStyle` attribute for inline styles
- NEVER add an attribute to a angular component if the default value for the angular component is the same
- NEVER use class as a property for a component
```ts
// NEVER DO
public class = input<string>('');
```
