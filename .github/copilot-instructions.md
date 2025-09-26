You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain
- Prefer self comment code and avoid useless comment that just describe what the code is doing
- Always to early returns instead of nesting continue logic
- Always prefer positive name variables / fields / method / etc. to avoid double negative confusion

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.
- Always use the best practices and guidelines for modern Angular 20, don't use older patterns that are no longer favored

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Storybook

- Don't overide the default storybook lauyout, just let it use the default

## Unit Test

- Use vitest for all unit testing needs, don't use karma

## Storybook Testing

- When required for testing dom selection, use `data-testid`
- When you need to interact with the ui in the test, always create a `const user = userEvent.setup();` and interact with that
- Tests should simulate the the interaction they user would take, not call component apis directly (these should test the behavior, not the implementation)

## Classes

- Always be explicit with defining `public` / `protected` / `private`

## Library Version

- We are using version 20.3 of Angular
- We are using version 20.2  of Angular Material
- We are using version 9 of Storybook
- We are using version 4 of Zod

## UX Pattern

- Button should never be disabled before a form is invalid, there should be allowed to submit and see the errors
