Please write component code using modern angular 20 standards and best practices.

Guidelines:
- Always prefer Angular 20 modern standards and patterns that might be more "popular" but are for older versions of Angular
- Always prefer signal-based component state management over rxjs. Only use rxjs when the complexity or use case (such as streaming) requires it
- Always make writeable component state `private` and prefixed with `_`
- Always prefer organizing writable component state into as few unified signal objects (ideally 1) instead of a signal per piece of data
- When component state need to be exposed publicly, make a `public` `readonly` properties that references in `private` internal state
- Always use modern signal-based output() instead of the older EventEmitter pattern
- The compoent should never directly make calls from
- Alway prefer tailwind styling over sass whenever possible
- Always create a storybook files in the same folder as the component with stories for all the unique state, DO NOT create and play / test related stories
- Always present the planned approach in detial for the implementation and get validation from me to continue before you start coding
- Make sure to follow all guidelines in `./common-command-guidelines.md` (relative from this path)



