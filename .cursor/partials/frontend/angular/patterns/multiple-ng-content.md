<!--
Within Angular templates you can only have 1 `<ng-content>` but there are cases where you might want to have it multiple times in the same template. The biggest reason for this is when you have component that can be rendered as different components.
-->

YOU can reference this code to see an implementation of it:
- `projects/shared-ui/src/lib/core/list`

You MUST ALWAYS follow theese rules when you need to support multiple `<ng-content>` in the same template:
- ALWAYS import `NgTemplateOutlet` in the component
- ALWAYS create a template that is just the content
```ts
<ng-template #contentTemplate>
  <ng-content />
</ng-template>
```
- ALWAYS use `<ng-container>` in the location where the main content need to be rendered
```ts
<li>
  @switch (asTag()) {
    @case ('a') {
      <a
        [href]="href()"
        [target]="isExternalHref() ? '_blank' : '_self'"
        rel="noopener noreferrer"
        [class]="containerClass()"
      >
      <ng-container [ngTemplateOutlet]="contentTemplate" />
      </a>
    }
    @case ('button') {
      <button type="button" [class]="containerClass()" (click)="handleClick()">
        <ng-container [ngTemplateOutlet]="contentTemplate" />
      </button>
    }
    @default {
      <div [class]="containerClass()">
        <ng-container [ngTemplateOutlet]="contentTemplate" />
      </div>
    }
  }
</li>
```

You must NEVER follow theese rules when you need to support multiple `<ng-content>` in the same template:
- NEVER use `<ng-content>` multiple times in a template
