# Style Guide

The official Angular style guide : https://angular.dev/style-guide#project-structure : should be followed, this document just adds additional guidelines where we think it would be benificial.

Some of the points here are the same as the official documentation but also provide explicit examples to help better convey the idea.

# Styling

## Overriding angular material

In general, the internal parts of angular material component should only be overriden at the global level, we want to avoud one off overrides in order to keep the styling consistent within the application.

## Tailwind

Tailwind has been configured can can be used to add inline styles. This should be the primary method for styling custom component. Tailwind's color palette has been removed and replaced with the color palette from angular material.

## SASS over CSS

While tailwind should be able to handle most cases of customer component styling, if we need something more powerful, we should use SASS. Angular material still heavily uses SASS so it will probably just make things easier to also use SASS when needed.

# Package management / tooling

# Always use --skip-install for `ng generate` when available

- ✅ `moon :generate` handles this automatically

Some `ng generate` commands will attempt to install packages however there are two issue with that isn the current setup:

- It makes assumptions as to where they should be installed
- Running the command manually would not use moon's version of pnpm

Since we have only a root level `package.json` file, we need to skip the install and manually add them through `moon :pnpm -- add ...` to avoid both of those issue.

# Avoid component inline templates / styles

Ideally we should never use inline templates / styles but it is ok if the component is trivial (like no more than 10 lines of inline code) however if the component is that simple, you should think if a directive could be used.

## Storybook exception

For storybook this standard does not apply for ease of development of DX code.

# Avoid modules whenever possible (tooling handles this)

- ✅ `moon :generate` handles this automatically

Modules are more or less a legacy system that is not longer needed and whenever possible should be avoided. Component should be create as standalone and services that are truly global can be created with `providedIn: 'root'`.

# Split out development stories from testing stories

Splitting out the testing stories from the development stories provides 2 benefits:

- It helps keep the storybook interface clean as all test stories will be in their own nested group (that should only be needed with the storybook cli tests fail)
- It optomizes (at least a little) the storybook test runner so that it only have to worry about the files that actually have tests.

# Prefer signal over rxjs when possible

Signal have been around for years and is now stable in Angular 20 and generally is a simplier and more optimized solution for state management (especially for component state / properties) and should be preferred over rxjs.

Rxjs should only be used for things like api request and when the complexity of the situation requires it.

# Single responsibility

We will always want make sure each to following the single responsibility rule, especially for services, to make the code as re-usable and maintainable as possible.

For example an authentication system needs to make api requests and store state locally and while the two can be seen also closely related, that should be 2 services, an `AuthenticationApiService` and an `AuthenticationStateService`. While the `AuthenticationStateService` might be the only things to call the `AuthenticationApiService` splitting them up make is clear one related to state management (and methods the related to it) and the other is specically for calling backend apis. This also means if there is a case for make an authentication api request outside of `AuthenticationStateService`, it is easy to do.

# Types over interfaces (lint error)

Types are generally more flexible and avoid "magic" merging issues so always use types (tooling has a command to generate new types).

# Only use classes for Angular specific code

While we need to use classes for Angular specific code, for our own data, we should always prefer using types and then create utility Angular services to be able to perform actions on those types. This just make the code more flexible when apis that return the same resource might have different structure depending on the context of the request.

# Component state

In almost al use cases we should be able to store component state on the component class itself.

Int he rare case where that does not work, you can create a store service for it however this is a last resort and class state is preferred and should work in nearly all use cases.

## Exposing component state to parent

When a parent needs access to a child's component state, there are 2 main pattern for this.

### Direct child

When the child is directly in the parent component, you can use the `@ViewChild` decorator since this is the simplest and mmost performant pattern.

### Nested chid

When the child is nested at least one from the parent, you need to use a registry pattern where the child component registers itself (and a registry services is available) and the parent who needs the access provides the registry service

# Naming

## Files

With the recent version(s) of angular, they have moved away from certain patterns for some thing (like removing `.component` and `.service` in generated file name) but kept other patterns (like guard files automatically having `-guard` in it) so these are some patterns to help make it easier to know what something is just by the file name.

## Modules directories

While we don't use angualr modules (as the are effective deprecated), we use modules in the context of directories so modules should be singular in nature.

```
❌ bad

projects/shared-ui/src/lib/users
projects/shared-ui/src/lib/projects

projects/customer-portal/src/app/dashboards

✅ good
```

## Components

In general component should be named as what they are but some special cases are:

- `*-view`: Page level component

## Services

make more specific to avoid confusion on if something is a service vs component

- `*-api`: API services (ex. `users-api`)
- `*-admin-api`: API services design for only internal usage (ex. `users-admin-api`)
  - This code should be located in the application that is using it to avoid is being mistakenly imported other applications
- `*-manager`: A service that is used to manage a global level feature (ex. `logger-manager` or `global-notification-manager`, `authentication-store`)
- `*-store`: Management of a pariticular feature or instance of a feature that has state associated (ex. `pagi`)
  - `[COMPONENT_NAME]-store`: This should be used as a last resort.
- `*data-store`: Management of api related data.
- `*-registry`: A registry component used for component to register themselves that allow for parent multiple levels up the tree to access those child component's public apis.

## Pipes

`*-tranformer`

## Guard

`*-guard`

## Directives

- ✅ automatically handling in tooling

- `*-directive`

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

# Types over interfaces whenever possible

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

# Use unified signals whenever possinle

Instead of doing something like this in a class:

```tsx
// ❌ bad
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
// ✅ good
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

When you want to have a styled based component, while in frameworks like React or SolidJS you would create a component that applies the styles and re-use that component, the Angular idomatic way to handle this is instead to create a directive. Not only is this idomatic in Angular, it also has the benifit of avoiding complexity when you want to be able to apply these styles on multiple types of elements and this method can be used on any element by default.

## Use `@HostBinding` whenever possible instead of `Renderer2`

When creating these directives, we should always opt for `@HostBinding` instead of `Renderer2`. It automatically handles cleanup of classes and that results in far less boilerplate code and mistakes from being introduced.

```tsx
// ❌ not opitomal
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

// ✅ generally preferred
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

# AI

## Thing to watch out for

- When though ai it told to use Angular material and avoid unneeded custom css, it will often add tailwind padding for things like padding on angualr material components that already have padding (often in nested elements) create extra padding

# Pattern Examples

There are a nubmer of pattern example in the `shared-ui` examples module (usually in a storybook file).

More compllex example can be referenced:

- Search the codebase for `USERS_API_URL` to be a pattern for adding configuable options for a root provided service

# Typing

## Zod

When we are going to what to be able to validate a type, instead of creating the type manually, we should should generate a zod schema for it and then the type can be inferred from the schema with `z.infer<typeof [SCHEMA_VARIABLE_NAME]>`. This allow us to get validation and typing for the type that better automatically syncs.

## Multiple schemas / types

Often there will be case where you need multiple schemas / types for the same base type. In those cases, you should create the full base schema (for example `userSchema`) and then derived other schema by picking from that one instead of omit, for example:

```ts
export const userSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  name: z.string(),
  email: z.email(),
  roles: z.array(z.enum(['admin', 'user'])),
  hasPassword: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// ❌ bad
export const createUserSchema = userSchema.omit({
  id: true,
  organizationId: true,
  hasPassword: true,
  createdAt: true,
  updatedAt: true,
});

// ✅ good
export const createUserSchema = userSchema.pick({
  name: true,
  email: true,
  roles: true,
});
```

## This make the schemas / types more explicit as it would be harder to accidently add a properly that should not be there and is make that type easier to read as the omit pattern does not really tell you what is there, just want it not.

---

---

Patterns to implement:

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

# AI Examples

## Simple

If the example can be expressed relatively easily in the code snippit, just inline the code snipper to the ai file

## Complex

If the example is more complex, just reference a location where it is being used.

When possible, we should create a minimal storybook example that can be used to reference it so that we feed minial context into the ai and also have a manual example we can reference in the future.

# Good bad code example template

```ts
// ❌ bad

// 😐 ok

// ✅ good
```

# Tips

## `inline-flex` to fix weird extra spacing

## `min-h-0` / `min-w-0` to child overflowing their `flex` based parent

## AI can sometimes create custom implementation of thing where a 3rd part library would be better (like creating a md5 hashing solution that ironically indefinately loops)

## refactoring names in component typescript code does not auto update template code

## Only create directive when the styles being applied are true generic

## will sometimes miss required proeprty in storybook file which does not have template validation

- added rule to ai rules

## seems to often want to use the seconard color in general for dark mode, not sure why our how best to guide the api about this

- TODO: add to add rules

## you will often need to update story titles to match our pattern for story organization

## BE DETAILED, if you add a new variant, you should say Update the existing variant story

# Common ai mistake that need to be cleared up

- putting styles in a .css file
- organization storybook stories (by the title value) incorrect
- storybook will sometimes implement functionality inline in the story that is already implemented in a service
- storybook will sometimes implement functionality inline in the story that should be abstract into a service / component to prevent duplication of code
- will sometimes use `setTimeout` in areas where it should not be used as it many case it can be flacky (like using `setTimeout` to run code after a `scrollIntoView` instead of doing an event binding like `(scrollend)="handleScrollEnd()"` on the scroll element or using a `setTimeout` instead of a angular lifecycle hook)
- while using `nativeElement` for things like calling `focus()` or in a directive for append dom elements, AI will sometimes use it for event binding which should almost always be handle through the host property of the `@Component` or `@Directive` or event binding on the element itself like `(scrollend)="handleScrollEnd()"`
- if you have a default value, it will default at every step of the way instead of just as the end (making refactoring the default harder)
- you need to be explicitly on when you have checks on data trigger certain action and be clear if it should happen whenever the data changes (that would be an `effect()`) or only on that (which should be in an `ngOninit()` method)
- when dealing with a form, indicate if there is a zod schema that should be used with the validation piece

AI will also just forget very obvious things (like placing a <ng-content />)

# AI Usage / Tips and Tricks

## Do full testing and give full information if asking AI to resolve the issue

Be sure to give as much information as possible, telling it a form is not validating properly and that alone can have the AI go down a path trying to look at and modify all the input components instead of looking at the form but if you say one worm does and but another does not, that can avoid this (then again sometimes is need to be told to use `(submit)` instead of `(ngSubmit)`).

## Cursor

While we have AI rule / guide files for the most popular AI tools, we have addition tooling for Cursor with custom commands.

### Updating Storybook

Lets say you made updates to the dialog component but now you want to make sure the stories are updated. There is a Cursor command of `/storybook/update` to do this so all you have to do is:

```
/storybook/update @dialog/
```

## Ask for question for larger requests.

When you are doing a larger request it is recommend guide the AI to ask question to avoid unexcepted implementation details by adding something like this to the end of the prompt:

```
If you have any questions about the present functionality or ideas for functionality that should be considered, present those questions before fully planning the coding work.
```

I would also add this line for each time you reply to any question to make sure your anwsers did not produce and other questions.

As answer previous may trigger new questions.

TODO:

- make sure all command that need a references directory are guided to ask for one (`/storybook/update` does this)

## always pass the context of the error

Just passing an error message alone can often have the ai think the error is related to the code it generated in previous prompts but the error might be somewhere completely unrelated
