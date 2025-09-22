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

# Split out development / manual test stories from automated testing stories

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
- `*-store`: Management of a pariticular feature or instance of a feature that has state associated (ex. )

## Pipes

`*-tranformer`

# Observable `$` suffix

It is widely adopted (in both RxJS and Angualt) to have a $ suffix in the name of observables and so shall we.

# Library shared api

Instead of just having one publis-api.ts file, each module should have its own and the top level one just exported those files. This is to make it so the top level files does not get too large to be easily managed.

# Angular Material

## `kabob-case` directives

While they work on some thing, for angular material directives you need to use `camelCase` instead of `kabob-case` as certain feature will not work (like default options for components).

## Favor property value over

## Always use

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
- have to use unocss instead of tailwind and tailwind working with a modern monorepo angular 20 application seems a bit hard to do
- still need to figure out node version with moon tasks
- moon task seem to be running for everything instead of just the project named (moon shared-ui:lint show message for cusotmer-portal)
- making sure all ng command are represented in moon (for ng is accessing correct version of moon toolchain)
- added component with ng generate --module does not update the module automatically
- a little weirdness with moonrepo and angular also providing it own level on moonrepo support
- need to run moon sync hook
- need to manually refresh storybook to get sass changes
- if using web ai client, make sure to pass in ai file as context to the prompt to have it generate better code
-

# References:

- karma based testing: https://gemini.google.com/app/6dcecc1c94590766

# To Look Into

- storybook autodocs
