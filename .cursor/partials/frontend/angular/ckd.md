Angular CDK 20 Hard Requirements:

You MUST ALWAYS use these patterns when work on Angular 20 directives:
- ALWAYS use angular cdk's menu for overlay menus
- ALWAYS use `cdkMenuPosition` for positioning angular ck
- ALWAYS use `cdkObserveContent` over native solutions like `MutationObserver` when possible
- ALWAYS use `@HostListener` ONLY when you need to apply listeners to things that target something outside element (like the `document`)

You MUST NEVER use these patterns when work on Angular 20 directives:
- NEVER use `Directive` in the name of the selector
- NEVER use `@HostBinding` decorators
<!--
This is the default 
-->
- NEVER use `standalone: true` in the `@Directive` decorator
