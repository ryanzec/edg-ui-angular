You MUST ALWAYS use these patterns when work on Angular 20 unit tests:
- ALWAYS use `vitest` apis
- ALWAYS make sure the pipe only does ONE thing and the name of the pipe CLEARLY indicates what is does
- ALWAYS Avoid using `debugElement` unless 100% NECESSARY
- ALWAYS group related test in nested describes

You MUST NEVER use these patterns when work on Angular 20 unit tests:
- NEVER use `@testing-library`, `karma`, or `jasmine` apis
<!--
This seems to only be required and work for older version of angular
-->
- NEVER mock and animation stuff (`provideNoopAnimations`, `NoopAnimationsModule`, etc.)
- NEVER write unit tests that are just a combination of multiple other unit tests (ie. integration tests) in the unit test files (`*.spec`)
