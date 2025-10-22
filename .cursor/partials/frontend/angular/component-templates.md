You MUST ALWAYS use these patterns when work on Angular 20 component templates:
- ALWAYS use either use `[selected]` for the option or reactive form binding if a reactive form is needed for select elementas
- ALWAYS keep templates simple and avoid complex logic
- ALWAYS use the async pipe to handle observables
- ALWAYS use html entity for angular special character in template (such as `&#64;` instead of `@`)
<!--
This button component is a better choice for accessability and it already unstyled by tailwind so there are not style concerns with this
-->
- ALWAYS use the `buttom` component when needing to create an element that has clickbility
- ALWAYS use the `projects/shared-ui/src/lib/core/logger-pipe` pipe to log things in an angular template
- ALWAYS use `@let` to provide typing for templates that use `let-*` in like this:
```html
<ng-template #body let-tempUser>
  @let user = asUser(tempUser);
  <!-- ... -->
</ng-template>
```
```ts
  protected asUser(tempUser: unknown): User {
    return tempUser as User;
  }
```

You MUST NEVER use these patterns when work on Angular 20 component templates:
- NEVER use `[value]` for select elemts
