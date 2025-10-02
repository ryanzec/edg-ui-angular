ALWAYS use the following components over bespoken inline components when appropriate:
- buttons: `projects/shared-ui/src/lib/core/button`
- cards: `projects/shared-ui/src/lib/core/card`
- file upload: `projects/shared-ui/src/lib/core/file-upload`
- icons: `projects/shared-ui/src/lib/core/icon`
- input: `projects/shared-ui/src/lib/core/input`
- loading icon indicator: `projects/shared-ui/src/lib/core/loading-spinner`
- pagination functionality: `projects/shared-ui/src/lib/core/pagination`
- tags: `projects/shared-ui/src/lib/core/tag`
- textarea: `projects/shared-ui/src/lib/core/textarea`

ALWAYS use the following directives when valid over duplicating functionality in other components:
- component color: `projects/shared-ui/src/lib/core/component-color-directive`
- grouping elements with spacing: `projects/shared-ui/src/lib/core/grouped-elements-directive`

For references in how we implement a multitide of component feature, reference these files:
- `projects/shared-ui/src/lib/core/button/button.ts`
- `projects/shared-ui/src/lib/core/input/input.ts`

Angular 20 Component Guidelines:
- NEVER EVER use any angular material components, ONLY the CDK
- Non-view components need to have it data passed to it, it should NEVER make calls to api and non-component stores
- When component state need to be exposed publicly, make a `public` `readonly` properties that references in `private` internal state
- Always use modern signal-based output() instead of the older EventEmitter pattern
  - When you need to determine if an output event is being listened to, you will need to use `rxjs` + `outputFromObservable()` using the pattern that is implemented in `projects/shared-ui/src/lib/core/input/input.ts`
- Compoents in `projects/shared-ui` should never make calls to apis (whether through api services directly or indirectly), data that it needed should be passed as properties
- Make sure to utilize all applicable functionality from Angualr CDK when create components to provide the best UX / accessibility as possible
- If you find you are creating a component that is highly likely to be used elsewhere inline with another component, break that out into it own component in `projects/shared-ui/src/lib/core/[COMPONENT_NAME]/{...files}`
- If a desired icon is not available, search for an equivalent icon in the Phosphor icon pack and if found, add to the list of available icons
- If an internal managed state need to be allowed to be defaulted, the should be exposed as a property prefixed with `default*` and only every used in default the internal state value
- Use a directive when you want to add behavior or modify the appearance of an existing element. It's perfect for cross-cutting concerns that can be applied to many different types of elements (e.g., a tooltip, a custom ripple effect, a permission-based hide/show)
- Use a wrapper component when you are creating a new, self-contained, and reusable piece of UI. This is better for encapsulation and defining a clear structure, even if it's just a simple styled container (e.g., `<org-card>`, `<org-tag>`, `<org-dialog>`)
- Only have 1 css file even if the component directory has multiple components
- When visable, features for components should be controllable by a property and default to a default / disabled state unless otherwise stated
- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components (template less than 10 lines)
- ALWAYS us Reactive forms over of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- Always create a storybook file (`*.story.ts`) in the same folder as the component with stories for all the unique state, DO NOT create any play / test related stories
- While reference code might had a number of property, only add the property explicitly required based on the requirements of the prompt (ie. if siing is not mentioned, does add a sizing property to the component)
- You should break up component into smaller ones when:
  - When either the html template reaches a size of over 300 lines or the typescript logic reaches a size of over 500 lines of code
  - If the broken out code DOES have a high change of being re-usable outside of that component it is being broken out from, the new files should be put into it own component directory in `projects/shared-ui/core/` and part of the public api
  - If the broken out code does NOT have a high change of being re-usable outside of that component it is being broken out from, the new files should be put in the same directory and not be part of the public api, it should also not have there own stories / unit test file as they will be testing as part of the main component
<!-- this will provide better type safety and a clear api, this also always the component to only allow a subset of the directive input values if needed -->
- When add a `hostDirective` to a component, the component itself MUST define the input(s) that the directive defines 
<!-- this is to avoid compiler issues -->
- When add a `hostDirective` to a component
  - you MUST use the explicit format like this:
  ```ts
  @Component({
    // other code...
    hostDirectives: [
      {
        directive: ComponentColorDirective,
        inputs: ['orgColor'],
      },
    ],
    // other code...
  })
  ```
  <!-- thsi is needed to get better typing support -->
  - you must also add the inputs from the directive into the component itself
    - if the directive has a fasely default value but the component should not, the roperty in the component should be required following this pattern:
    ```ts
    public orgColor = input.required<ComponentColor>();
    ```
<!-- this gives us better flexibility in writing our css code -->
- When applying css classes based on component properties, we should NEVER combine them into 1 css class (like `property1-property2`), they should be separate (like `property1` and `property2`) and the css code can just combine them in the selection (like `.proeprty1.proeprty2`)
- If a component need a registry service, it needs to be in the same file as the component itself to avoid circular dependencies, reference implementation example in `projects/shared-ui/src/lib/examples/parent-child-nested-communication/nested2/nested2.ts`
<!-- Because of the reactive nature of Angular's new signals system, the overhead of something like `computed()` and generally not worth worrying about is order to provide a cleaner api -->
- Feel free to use Angulars new `computed()` method whenever you want include uses cases to provide a cleaner api like:
```ts
// ...
private _state: State = {
  user: defaultUser,
}
// ...

// 😐 ok
if (!!this._state.user) {

}

// ✅ better
public isAuthenticated = computed(() => !!this._state.user);
//...

if (!!this.isAuthenticated()) {

}
```
<!-- this allows us to avoid every component from having to have a .css file -->
- Use the `@Component`'s `host` property to style teh component container element
