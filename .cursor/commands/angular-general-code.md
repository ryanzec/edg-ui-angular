Please follow the request of the prompt using modern angular 20 standards and best practices.

Guidelines:
- Always prefer Angular 20 modern standards and patterns that might be more "popular" but are for older versions of Angular
- Always prefer signal-based code instead of rxjs whenever possible (api calls and streaming data are 2 example where rxjs is the right tool for the job)
- Always make writeable component state `private` and prefixed with `_`
- Always prefer organizing writable component state into as few unified signal objects (ideally 1) instead of a signal per piece of data
- When component state need to be exposed publicly, make a `public` `readonly` properties that references in `private` internal state
- Always use modern signal-based output() instead of the older EventEmitter pattern
- The compoent in `projects/shared-ui` should never directly make calls from to apis (whether through api services directly or indirectly), data that is needed for those components should have it passed in to it
- Alway prefer tailwind styling over sass whenever possible
- Make sure to follow all guidelines in `./common-command-guidelines.md` (relative from this path)
