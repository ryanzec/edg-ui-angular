Angular 20 Component Template Guidelines:
- don't use `[value]` for selects, either use `[selected]` for the option or reactive form binding if a reactive form is needed
- Keep templates simple and avoid complex logic
- ALWAYS use native control flow (`@if`, `@for`, `@switch`), NEVER use `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
