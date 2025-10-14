Angular 20 Unit Testing Hard Requirements:
- NEVER use `@testing-library`, `karma`, or `jasmine` apis
- ONLY use `vitest` apis
- Unit tests don't need any animation mocking (`provideNoopAnimations`, `NoopAnimationsModule`, etc.)
- Avoid using `debugElement` whenever possible in unit tests
- Dont write unit test that are just a combination of multiple other unit tests (ie. integration tests) in the unit test files (`*.spec`)
- Make sure to properly group related test in nested describes when warranted
