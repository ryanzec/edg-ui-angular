Please follow the request of the prompt using modern angular 20 standards and best practices.

Guidelines:
- Always use `@HostBinding` over `Renderer2` whenever possible
- NEVER use the host decorator to apply styles
- `Directive` should NEVER be part of the selector for the directive
- If the affect of the directive should be able to be turned off, have `null` value that basically removes everything
- Make sure to follow all guidelines in `./common-command-guidelines.md` (relative from this path)
