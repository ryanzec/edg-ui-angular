General Frontend Guidelines:
- For data validation / schema generation / type generation use Zod version 4
- Always use Luxon for any date related functionality
- Always explicitly use `public`, `protected`, and `private` keywords in classes
- Make sure the code is self explaining and ONLY comment when the complexity of the code requires it
- Avoid ALL abbreviations except for the following ones: id, utils
- While abbreviations are not allowed, initialisms are however don't capatilze the entire initialisms, treat the initialism  as word and capitalize normal (e.g. `uiThemeManager`, `setUiTheme`)
- If a property is needed to be exposed publicly for testing or internal use only or there is an export that needs the same treatment
  - Name the class property or export prefixed with `_`
  - Add a TSDoc block with an `@internal` noting it is public for testing / internal use only
  - If this is a class property, make it public even though it is named with a private pattern (the @TSDoc is there to indicate why this mismatch)
- `null` should be utilized when the value is required but should allow a none value to be passed and `undefined` should be used when it should be allowed to omit passing a value (both should be allowed if both use case are valid)
- When creating types that are specific (like `IconName`), co-locate the types in the main file (so `IconName` would be in the `icon.ts` component file)
- When creating types that are generic and use in many locations (like `User`), create them in there own file
- When defining a type that is a static list of string values, use a const object and infer type from that instead of just a types as it is more flexible, also create an array of all values which is often usefull
```ts
// BAD, DONT DO
export type IconName =
  | 'caret-right'
  | 'gear';

// ALWAY do this
export const IconName = {
  CARET_RIGHT: 'caret-right',
  GEAR: 'gear',
 } as const;

export type IconName = (typeof IconName)[number];

export const iconNames = Object.values(IconName);
```
- Always have comments to be ALL lowercase
- Use strict type checking
- ALWAYS use type inference when the type is obvious
- Make sure to always use proper types when possible
- Avoid the `any` type, use `unknown` when type is uncertain
- Prefer self comment code and avoid useless comment that just describe what the code is doing
- Always to early returns instead of nesting continue logic
- Always prefer positive name variables / fields / method / etc. to avoid double negative confusion
- ALWAYS use `patch` for http upate requests, NEVER use `put`
