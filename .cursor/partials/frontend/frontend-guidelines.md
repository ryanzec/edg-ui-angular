You MUST use the following available libraries for there described usage over customer implementation
- `es-toolkit`: General typescript utility functionality
- `luxon`: Anything related to dates
- `scrollparent`: For getting the scroll parent of an element
- `spark-md5`: ONLY when MD5 hashing is specifically needed
- `uuid`: For UUID specific use cases or when a generic id is needed
- `zod`: For Data validation, type generation, and data structure conversion

You MUST ALWAYS use these patterns when work on Angular 20 in general:
- MUST use `type` for types
- MUST explicitly use `public`, `protected`, and `private` keywords in classes
- MUST prefix `private` methods / members
```ts
// MUST DO
private _state;
```
- MUST use ALL lowercase for comments
- MUST se strict type checking
- MUST use type inference when the type is obvious
- MUST ALWAYS use `unknown` instead of `any` when the type is not known
- MUST use `any` ONLY if it is requirement by another api
- MUST make sure code is self documenting
- MUST ask when doing a very well defined generic tasks (like hashing) if you should use a 3rd party library or custom build something
- MUST use luxon for any date related functionality
- MUST add comment when this code is complex and can't be self-documenting
- MUST use initialisms and treat them as single word in capitalization
```ts
// MUST DO
class UsersApi { /* ... */ }
```
- MUST prefix `public` method / members or export that are only public for testing purpose with `_` and have a TSDoc block with an `@internal` commenting about this, pattern examples:
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
- MUST use `null` when the value is required but should allow a "no value" to be passed 
- MUST use `undefined` when it should be allowed to omit passing a value completely
- MUST allow both `null` and `undefined` should be allowed if both use case are valid
- MUST co-locate the types in the main file that is using them when they are tightly coupled, pattern example"
```
// MUST DO
export const IconName = {
  CARET_RIGHT: 'caret-right',
  CARET_LEFT: 'caret-left',
} as const;

export type IconName = (typeof IconName)[keyof typeof IconName];

export const iconNames = Object.values(IconName);
// ...
export class Icon {
  public name = input.required<IconName>();
  // ...
```
- MUST create generic types that can be use in many locates (like a `User`) should be placed in there own file
<!--
This provides more flexible in the usage of the type
-->
- MUST use a const object and inferred type from that instead of just a type, also create an array of all values which is often usefull defining a type that is a static list of string values, 
```ts
// ALWAY do this
export const IconName = {
  CARET_RIGHT: 'caret-right',
  GEAR: 'gear',
 } as const;

export type IconName = (typeof IconName)[number];

export const iconNames = Object.values(IconName);
```
- MUST use `unknown` over `any` whenever possible
- MUST ALWAYS return early instead of nesting the continue logic
<!--
Avoid double negative confusion
-->
- MUST use positive naming for `boolean` based variables / fields / methods
```ts
// MUST DO
const enabled = false;
const showDetails = false;
```
- MUST use patch for updating data with an api call

You can NEVER use these patterns when work on Angular 20 components:
- NEVER use `interface` for types
- NEVER comment code that is self documenting
- NEVER use abbreviations unless they are the follow abbreviations: `id`, `utils`,
- NEVER provide useless comments
- NEVER use negative naming for `boolean` based variables / fields / methods
```ts
// NEVER DO
const disabled = false;
const hideDetails = false;
```
- MUST use PUT for updating data with an api call
