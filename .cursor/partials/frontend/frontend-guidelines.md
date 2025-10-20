You MUST use the following available libraries for there described usage over customer implementation
- `es-toolkit`: General typescript utility functionality
- `luxon`: Anything related to dates
- `scrollparent`: For getting the scroll parent of an element
- `spark-md5`: ONLY when MD5 hashing is specifically needed
- `uuid`: For UUID specific use cases or when a generic id is needed
- `zod`: For Data validation, type generation, and data structure conversion

You MUST ALWAYS place common re-usable functionality into util method in `projects/shared-utils/src/utils`, if a method already exists use it other add it:
- date related functionality: `projects/shared-utils/src/utils/date.ts`
- DOM related functionality: `projects/shared-utils/src/utils/dom.ts`
- email related functionality: `projects/shared-utils/src/utils/email.ts`
- string related functionality: `projects/shared-utils/src/utils/string.ts`
- tailwind related functionality: `projects/shared-utils/src/utils/tailwind.ts`

You MUST ALWAYS follow these abbreviations rules:
- `.cursor/partials/frontend/abbreviations.md`

You MUST ALWAYS use these patterns when work in frontend code in general:
- ALWAYS use `type` for types
- ALWAYS explicitly use `public`, `protected`, and `private` keywords in classes
- ALWAYS prefix `private` methods / members with a `_`
```ts
// MUST DO
private _state;
```
- ALWAYS add property TSDoc comment blocks for class property / methods and exports
- ALWAYS use ALL lowercase for comments
- ALWAYS se strict type checking
- ALWAYS use type inference when the type is obvious
- ALWAYS use `unknown` instead of `any` when the type is not known
- ALWAYS use `any` ONLY if it is requirement by another api
- ALWAYS make sure code is self documenting
- ALWAYS ask when doing a very well defined generic tasks (like hashing) if you should use a 3rd party library or custom build something
- ALWAYS use luxon for any date related functionality
- ALWAYS add comment when this code is complex and can't be self-documenting
- ALWAYS use initialisms and treat them as single word in capitalization
```ts
// MUST DO
class UsersApi { /* ... */ }
```
- ALWAYS prefix `public` method / members or export that are only public for testing purpose with `_` and have a TSDoc block with an `@internal` commenting about this, pattern examples:
```ts
/**
 * @internal Only exposed for testing purposes
 */
export const _SOME_INTERNAL_VALUE = 'test';

class UsersApi = {
  /**
   * @internal Only exposed for testing purposes
   */
  public _baseUrl = '/api/v2/users';
}
```
- ALWAYS use `null` when the value is required but should allow a "no value" to be passed 
- ALWAYS use `undefined` when it should be allowed to omit passing a value completely
- ALWAYS allow both `null` and `undefined` should be allowed if both use case are valid
- ALWAYS co-locate the types in the main file that is using them when they are tightly coupled, pattern example"
```
// MUST DO
export const IconName = 'caret-right' | 'caret-left';

export const iconNames = ['caret-right', 'caret-left'];
// ...
export class Icon {
  public name = input.required<IconName>();
  // ...
```
- ALWAYS create generic types that can be use in many locates (like a `User`) should be placed in there own file
<!--
This produce simplier more predeictable runtime code is is more flexible as a tpye of `'red' | 'green'` can be passed to a type of `'red' | 'green' | 'blue'` where if they where 2 explicit types, you would have to do type casting and such.

There will be edge cases where an const "enum" is better when you want to reference a longer sting by a shorting key (like for error messages) and only in those case use you use that like this:
```ts
export const ErrorMessage = {
  UNKNOWN: 'An unknown error occurred',
  UNAUTHENTICATED: 'unable to authenticate',
  AUTHENTICATION_EXPIRED: 'Logged in session expired',
} as const;

export type ErrorMessage = (typeof ErrorMessage)[keyof typeof ErrorMessage];
```
-->
- ALWAYS use a string literal union type over an enum
```ts
// ALWAY do this
export const IconName = 'caret-right' | 'caret-left';

export const iconNames = ['caret-right', 'caret-left'];
```
- ALWAYS use `unknown` over `any` whenever possible
- ALWAYS return early instead of nesting the continue logic
<!--
Avoid double negative confusion
-->
- ALWAYS use positive naming for `boolean` based variables / fields / methods
```ts
// MUST DO
const enabled = false;
const showDetails = false;
```
- ALWAYS use patch for updating data with an api call
- ALWAYS cast to the specific type when needed
- ALWAYS attempt to fix circular dependencies by import the type one when possible
- ALWAYS omit option values if you are just setting it to the default value
- ALWAYS write code to cleanup when needed (like cleaning up a timeout, a subscription, etc.)

You can NEVER use these patterns when work in frontend code in general:
- NEVER refactor existing code that was not changed as part of your task
- NEVER use `interface` for types
- NEVER comment code that is self documenting
- NEVER add useless comments
- NEVER use negative naming for `boolean` based variables / fields / methods
```ts
// NEVER DO
const disabled = false;
const hideDetails = false;
```
- NEVER use PUT for updating data with an api call
<!--
Since our tolling will auto format code, no need to waste time / money on AI to fix these.
-->
- NEVER fixed stylistic linting errors
- NEVER case to `const` if there is a specific type that can be casted to
