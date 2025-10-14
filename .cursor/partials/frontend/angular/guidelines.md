You MUST always follow these additional rules
- `.cursor/partials/frontend/angular/ckd.md`

Example of patterns that MUST be used when implementing something similar
- Overlay menu use Angular CDK `projects/shared-ui/src/lib/core/application-navigation`

Angular 20 Hard Requirements:
- We are using Angular version 20.3
- Always prefer Angular 20 modern standards and patterns that might be more "popular" but are for older versions of Angular
- Always prefer signal-based code instead of rxjs whenever possible (api calls and streaming data are 2 example where rxjs is the right tool for the job)
- Always prefer organizing writable state into as few unified signal objects (ideally 1 called `_state`) instead of a signal per piece of data
- Always use `rojects/shared-ui/src/lib/core/loading-spinner` for persistent local storage data
- All logging needed to be handled through the `projects/shared-ui/src/lib/core/log-manager` service
- Always explicit pass the generic type when using `computed<>()`
- Implement lazy loading for feature routes
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead
- Does dependency injection, the `inject()` pattern should ALWAYS be used over other older patterns
- Always make writeable state `private` and prefixed with `_`
- Make individual components, services, directives, pipes, and guard are responsible to SINGLE domain and not doing too much
- Make sure performance is always factored in to the implementation but not too at the cost of code readability
- When managing state, make sure it is done in an immutable way to avoid side effects whenever possible
- When import code, a projects should NEVER use the project alias or public api for importing, it should always path to the direct file needed in order to prevent circular depencdencies

You MUST ALWAYS use these patterns when work on Angular 20 in general:
- ALWAYS use `type` for types
<!--
Globals are not available 
-->
- ALWAYS use angular's built in `json` pipe for rendered json in templates
- ALWAYS check if this is a built-in angular callback or lifecycle hook that can be used instead of trying to do a `setTimeout()`

You can NEVER use these patterns when work on Angular 20 components:
- NEVER use `interface` for types
<!--
No idea why AI likes doing this but it is un-needed as can cause issue in templates
-->
- NEVER use `as const` when define an icon name
- NEVER attempt to use `JSON.*` in template files
