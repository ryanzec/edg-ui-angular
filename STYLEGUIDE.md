# Style Guide

The official Angular style guide : https://angular.dev/style-guide#project-structure : should be followed, this document just adds additional guidelines where we think it would be benificial.

Some of the points here are the same as the official documentation but also provide explicit examples to help better convey the idea.

# Use SASS for styling

Since angualr material heavily uses SASS, we should do the same to be consistent and enable better integration / configurability with angular material components.

# Always use --skip-install for `ng generate` when available (tooling handle this)

Requires as having the angular command line use the moonrepo version of the package manager is not easy to do (if possible at all) so skipping install will be the next time a moonrepo is exexuted, the package will be installed through the moon toolchain.

# Component inline templates / styles for very small components only

If either the template or styles for a component exceed 15-20 lines, it should be move into is own file for readability and maintainability.

## Storybook exception

For storybook this standard does not apply for ease of development of DX code.

# Avoid modules whenever possible (tooling handles this)

Modules are more or less a legacy system that is not longer needed and whenever possible should be avoided.

# Use previous file type suffixing (configuration handles this)

To make files read-ability easy we use the previous version of angular file type suffixing (which is automatically handle through confgiuration and tooling).

# Split out development / manual test stories from automated testing stories into separate file

Splitout out the testing stories from the regular / development on provides 2 benefits:

- it help clean the storybook interface clean as all test stories will be in their own nested group
- it optomizes (at least a little) the storybook test runner so that it only have to worry about the files that actually have tests.

# Prefer signal over rxjs when possible

Signal have been around for years and is not stable in Angular 20 and generally is a simplier and more optimized solution for state management (especially for component state / prperties) and should be preferred over rxjs.

Rxjs should only be used when the complexity of the situation requires it.

# Single responsibility

We will always want make sure each to following the single responsibility rule, especially for services, to make the code as re-usable and maintainable as possible.

For example an authentication system needs to make api requests and store state locally and while the two can be seen also closely related, that should be 2 services, an `AuthenticationApiService` and an `AuthenticationStateService`. While the `AuthenticationStateService` might be the only things to call the `AuthenticationApiService` splitting them up make is clear one related to state management (and methods the related to it) and the other is specically for calling backend apis. This also means if there is a case for make an authentication api request outside of `AuthenticationStateService`, it is easy to do.

# Types over interfaces (lint error)

Types are generally more flexible and avoid "magic" merging issues so always use types (tooling has a command to generate new types).

# Only use classes for Angular specific code

While we need to use classes for Angular specific code, for our own data, we should always prefer using types and then create utility Angular services to be able to perform actions on those types. This just make the code more flexible when apis that return the same resource might have different structure depending on the context of the request.

# Service naming (files)

## Components

In general component should be named as what they are but some special cases are:

- `*-view`: Page level component

## Services

make more specific to avoid confusion on if something is a service vs component

- `*-admin-api`: API services design for only internal usage (ex. `users-admin-api`)
- `*-api`: API services (ex. `users-api`)
- `*-manager`: Management of a particular feature that lacks associated internal state (ex. `logger-manager`)
- `*-store`: Management of a pariticular feature or instance of a feature that has state associated (ex. `authentication-store`)
  - `[COMPONENT_NAME]-store`: for components that need a context it needs to follow this pattern (ex. for component `ChatWindow`, the service would be named `ChatWindowStore`)

## Pipes

`*-tranformer`

# Observable `$` suffix

It is widely adopted (in both RxJS and Angualt) to have a $ suffix in the name of observables and so shall we.

# Library shared api

Instead of just having one publis-api.ts file, each module should have its own and the top level one just exported those files. This is to make it so the top level files does not get too large to be easily managed.

# Angular Material

## `camelCase` instead of `kabob-case` directives

While they work on some thing, for angular material directives you need to use `camelCase` instead of `kabob-case` as certain feature will not work (like default options for components).

## Favor property value over

# Avoid relying on parent for injectable of child provider, use the registry pattern instead

# Storybook example classes should be prefixed with EXAMPLE

This is to make is easy to see if we ware importing these in production code

## TODO: move this into it own project that way it can be made impossible to import into production code

# be explicit with public / protected / private

# prifex private with `_`

This make it easy to identify private data and make it easy in naming if there also need to be a `private` or `protected` equivlant (which would be the name without the `_`)

# component data encapsulation

Data on a component should be made private and prefix with `_` and then if it needs to be exposed, use a public or protected field that maps to a readonly version (signals have a helper method for this) that way modification of this data can be better controlled.

# use types over interfaces whenever possible

- ✅ error in linting

Types can basically do everything that interface can but more, type can handle:

Union Types: Combining multiple types into one.

```ts
type Status = 'success' | 'error' | 'loading';
type ID = string | number;
```

Intersection Types: Merging multiple types together.

```ts
type Writable = { write: () => void };
type Closable = { close: () => void };

type WritableAndClosable = Writable & Closable;
```

Primitives: Creating an alias for a primitive type.

```ts
type UserID = string;
```

Tuples: Defining arrays with a fixed number of elements of specific types.

```ts
type Point = [number, number];
```

Complex Mapped Types: Creating new types by transforming properties of an existing type.

```ts
type ReadonlyUser = { readonly [K in keyof User]: User[K] };
```

Because type can do all of this in addition to defining object shapes, using it exclusively means you only need to use one keyword for all your type definitions, creating a more consistent style.

## Interface use case

The one thing the interfaces can do the types can't is add to an existing interface. While this might seems useful, it becomes and maintain headache and to know how a interface is defined, you need to know all the locations where it is defined and it is almost always easier to just use types.

If a 3rd aprt requires you to add to an interface, that is fine, but that should be the only use case for using interfaces

# use const + derived types instead of enums

-

Instead of using typescripts `enum`, we should be using a const + a derived type. The reasoning for this is:

- Produces simplier, smaller, and more predictable code
- Better type safety

## Simplier / Smaller / More Predictable Code

For `enum`:

```ts
// typescript code
enum UserRole {
  ADMIN,
  USER,
  MANAGER,
}

// generated javascript code
var UserRole;
(function (UserRole) {
  UserRole[(UserRole['ADMIN'] = 0)] = 'ADMIN';
  UserRole[(UserRole['USER'] = 1)] = 'USER';
  UserRole[(UserRole['MANAGER'] = 2)] = 'MANAGER';
})(UserRole || (UserRole = {}));
```

For const + dervied type:

```ts
// typescript code
export const UserRoleName = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type UserRoleName = (typeof UserRoleName)[keyof typeof UserRoleName];

// generated javascript code
export const UserRoleName = {
  ADMIN: 'admin',
  USER: 'user',
};
```

### Getting array of all values

For `enum`:

```ts
enum UserRole {
  ADMIN,
  USER,
}

const roles = Object.keys(UserRole).filter((key) => isNaN(Number(key)));
// Result: ['admin', 'user', 'manager']
```

For const + derived type:

```ts
export const UserRoleName = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

const allRoles = Object.values(UserRoleName);
// Result: ['admin', 'user', 'manager']
```

## Better type safety

For `enum`:

```ts
enum Status {
  SUCCESS,
  FAILURE,
}

let jobStatus: Status = Status.SUCCESS; // good as it should be
jobStatus = 123; // no typescript error even though it should not be allowed 😱
```

For const + derived type:

```ts
export const UserRoleName = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type UserRoleName = (typeof UserRoleName)[keyof typeof UserRoleName];

let myRole: UserRoleName = 'admin'; // good as it should be
myRole = 'super-admin'; // errors as it should
```

# Use unified signals whenever possinle

Instead of doing something like this in a class:

```tsx
// ❌ Bad
class AuthenticationServices {
  private _user = signal<User | null>(null);
  private _isLoading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  public readonly user = computed(() => this._user());
  public readonly isLoading = computed(() => this._isLoading());
  public readonly error = computed(() => this._error());
  public readonly isAuthenticated = computed(() => this._user() !== null);
}
```

you want to do this:

```tsx
// ✅ Good
class AuthenticationServices {
  private readonly _state = signal<AuthenticationState>({
    user: null,
    isLoading: false,
    error: null,
  });

  public readonly user = computed(() => this._state().user);
  public readonly isLoading = computed(() => this._state().isLoading);
  public readonly error = computed(() => this._state().error);
  public readonly isAuthenticated = computed(() => !!this._state().user);
}
```

Since we are exposing the internal unified store at a grainular level, we gain the best of both worlds.

- We keep the benifit of updates being fine-grained so if a component is using the `user` property and the signal updates it `error` data, the component using `user` but not `error` will not trigger a reactive update.
- If we need to update multiple pieces of data at the same time, we can do that is one atomic update trigger one reactive event instead of multiple smaller updates triggering multiple reactive events.

# AI flow for net new code

In order to best get AI to generate working but also good code the flow should be:

- use `moon :generate` to generate the scalfolding for the component, services, etc
- after that you can give a detailed prompt to ai passing reference to where code should go and other references , like:

```
I would like you to create a login form utilizing angular material and the native reactive forms in Angular in @login-form/. this should be using the @authenticationAuthenticateRequestSchema and associated type for form validation and typing. This code should not directly interact with the authentication api / store but instead is should have an `output()` (modern) define that will emit events for login when the form is valid and submitted
```

- review the code and refactor as needed

## Enable auto ai rules / guidelines inclusion

Some editors might require you to configure the that that ai files in the repository are added as context when interacting with it so make sure do to do otherwise the generated code will not be upto the standard we want it to be.

# exporting / public for unit test

If something is being exported or made public for the sole purpose of allow better and easier testing, is should have a `TSDoc` block that has at a minimum a @internal line explaining why is it being exported / made public and it should be prefixed with `_` to make it easy to identify in code.

# Directives should be assumed to also be on the element

With how certain feature of Angular and directives work (like `@HostBinding`), when a directive is added to a component, that directive should always be on the component until the component itself is destoried. If the directive need a `off` state, the directive should have a fasely value that can be used to turn it `off` instead of dynamically adding and removing the directive.

# Style based components

When you want to have a styled based component, while in frameworks like React or SolidJS you would create a component that applies the styles, the Angular idomatic way to handle this is instead to create a directive. Not only is this idomatic in Angular, it also has the benifit of avoiding complexity when you want to be able to apply these styles on multiple types of element and this method can be used on any element by default.

## Use `@HostBinding` whenever possible instead of `Renderer2`

When creating these directives, we should always opt for `@HostBinding` instead of `Renderer2`. It automatically handles cleanup of classes and that results in far less boilerplate code and mistakes from being introduced.

```tsx
// ❌ Not Opitomal 
import { Directive, ElementRef, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[orgFormFields]',
})
export class FormFieldsDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  public ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'flex');
    this.renderer.addClass(this.el.nativeElement, 'flex-col');
    this.renderer.addClass(this.el.nativeElement, 'gap-form-fields');
  }

  public ngOnDestroy(): void {
    this.renderer.removeClass(this.el.nativeElement, 'flex');
    this.renderer.removeClass(this.el.nativeElement, 'flex-col');
    this.renderer.removeClass(this.el.nativeElement, 'gap-form-fields');
  }
}

// ✅ Generally Preferred
import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[orgFormFields]',
  standalone: true, // Modern directives should be standalone
})
export class FormFieldsDirective {
  @HostBinding('class')
  readonly classes = 'flex flex-col gap-form-fields';
}
```


---

---

---

Patterns to implement:

- http requests
- loading state for table views

NOTES:

- editor weirdness (sass files)
- custom scrip to get angular cli to not install on generate as it can't easily use moonrepo;s version of pnpm (and the process of move that around)
- access pnpm feels hacky
- using a root only package.json files is generally no recommended but the easiest option that I know works
- does not have https in local development (will leave as is until it is an issue)
- pnpm usage is weird (in order to make sure it uses the moonrepo version)
- still need to figure out node version with moon tasks
- moon task seem to be running for everything instead of just the project named (moon shared-ui:lint show message for cusotmer-portal)
- making sure all ng command are represented in moon (for ng is accessing correct version of moon toolchain)
- added component with ng generate --module does not update the module automatically
- a little weirdness with moonrepo and angular also providing it own level on moonrepo support
- need to run moon sync hook
- need to manually refresh storybook to get style changes sometimes
- if using web ai client, make sure to pass in ai file as context to the prompt to have it generate better code
-

# References:

- karma based testing: https://gemini.google.com/app/6dcecc1c94590766

# To Look Into

- storybook autodocs
