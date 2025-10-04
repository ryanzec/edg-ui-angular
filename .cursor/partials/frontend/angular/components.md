
<!--
Things you might want to indicate in your prompt for creating component:
- Should there be a wrapper element in the template for the component
- What parts of the component should be part of a public api
- How you want the component broken out if needed (if there is a part that should be it own re-usable component, create those on their own first in a separate prompt)
- If the component is going to need a store and if so, if it needs to be able to support multiple instances of the component at the same time (important and it indicates of the services injection needs to be structured)
-->

ALWAYS use the following components over bespoken inline components when appropriate:
- buttons: `projects/shared-ui/src/lib/core/button`
- cards: `projects/shared-ui/src/lib/core/card`
- file upload: `projects/shared-ui/src/lib/core/file-upload`
- icons: `projects/shared-ui/src/lib/core/icon`
- input: `projects/shared-ui/src/lib/core/input`
- loading icon indicator: `projects/shared-ui/src/lib/core/loading-spinner`
- pagination: `projects/shared-ui/src/lib/core/pagination`
- tags: `projects/shared-ui/src/lib/core/tag`
- textarea: `projects/shared-ui/src/lib/core/textarea`

ALWAYS use the following directives when valid over duplicating functionality in other components:
- component color: `projects/shared-ui/src/lib/core/component-color-directive`
- grouping elements with spacing: `projects/shared-ui/src/lib/core/grouped-elements-directive`

When you are requested or need to implement a component that will have an associated store and need to be able to support multiple instances as the same time, you MUST follow the pattern outlined in : `projects/shared-ui/src/lib/examples/parent-child-multiple-nested-communication copy`

For references in how we implement a multitide of component feature, reference these files:
- `projects/shared-ui/src/lib/core/button/button.ts`
- `projects/shared-ui/src/lib/core/input/input.ts`

You MUST ALWAYS use these patterns when work on Angular 20 components:
- MUST use angular CDK when it has functionality that be used
- MUST pass the data component need in the inputs
- MUST use modern signal input using `input()`
- MUST use modern event handling using `output()`
- MUST apply best practices for accessibility
- MUST use native control flow like `@if`, `@for`, `@switch` in templates
- MUST use `rxjs` + `outputFromObservable()` when you need to determine if an output event is being listened to like this:
```ts
private _preIconClicked$ = new Subject<void>();
// ...
public preIconClicked = outputFromObservable(this._preIconClicked$);
// ...
```
- MUST use the `host` property when possible of the `@Component` decorator
- MUST add a `dataid` property to top level custom component that is `snake-case` of the component name like `Button` would be `dataid="button"` or `UserList` would be `dataid="user-list"`
- MUST set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- MUST have an input for `class` that is placed on the wrapping element for the component
- MUST have selector be prefixed with `org-`
<!-- Because of the reactive nature of Angular's new signals system, the overhead of something like `computed()` and generally not worth worrying about is order to provide a cleaner api -->
- MUST wrap private state access in `computed()` methods
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
- MUST explicitly mark inputs and outputs as `public`
- MUST explicitly mark members (data) / methods (functions) of the class component `protected` if it need to be accessed by the template
- MUST explicitly mark methods (functions) of the class component as `public` for anything that is request to be part of the public api
<!-- needed to avoid compiler issues -->
- MUST use explicitly pattern for add `hostDirectives` to components
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
- MUST explicitly define the input(s) that the directive defines on the component itself when adding a `hostDirective` to a component
- MUST add icon to `IconName` in `projects/shared-ui/src/lib/core/icon/icon.ts` if request but not available
- MUST prefix any input with `default*` when it is only used to default internal state
- MUST keep components small and focused on a single responsibility
- MUST use Reactive forms over of Template-driven ones
- MUST use `class` attribute for css classes
- MUST use `style` attribute for inline styles
- MUST create a storybook file (`*.story.ts`) in the same folder as the component with stories for all the unique state, DO NOT create any play / test related stories in this file
- MUST create a storybook testing file (`*.tests.story.ts`) in the same folder as the component that is empty
- MUST use a service injection when you ne
- MUST suffix `@ViewChild` member name with `Ref` when it is linked to a native html element and the value for the `@ViewChild` must match:
```ts
// MUST DO
@ViewChild('inputRef')
  public readonly inputRef!: ElementRef<HTMLInputElement>;
```
- MUST suffix `@ViewChild` member name with `Component` when it is linked to an Angular component element and the value for the `@ViewChild` must match:
```ts
// MUST DO
@ViewChild('cardComponent')
  public readonly cardComponent!: Card;
```
<!--
It won't be available in `ngOnInit` without static set to true.

You must make sure this is not wrapped in any conditional logic like `@if` as it will not work in those cases
-->
- MUST use `static: true` for `@ViewChild` ONLY if you need to access the child in the `ngOnInit` lifecycle method
- MUST add a `public mergeClasses` to a component when the template needs condition css classes
- When css class application need to happen based on typescript conditional checks, add `public mergeClasses = tailwindUtils.merge;` to the component class as use that in the html template (usage reference: `projects/shared-ui/src/lib/core/pagination/pagination.html`)

You can NEVER use these patterns when work on Angular 20 components:
- NEVER re-create functionality that is already available in angular CDK
- NEVER make api calls in non-view components
- NEVER use the older input pattern `@Input()` decorator
- NEVER use the older event system pattern `@Output()` decorator
- NEVER use old control flow pattern like `*ngIf`, `*ngFor`, `*ngSwitch` in templates
- NEVER use the `@HostListener` decorator on component class methods
```
// NEVER DO
@HostListener('keydown', ['$event'])
protected keyPress(event: KeyboardEvent): void {
```
- NEVER create methods in components that output css / tailwind class names
```
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
