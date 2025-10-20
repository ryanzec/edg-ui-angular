<!--
WORK IN PROGRESS

Have not done heavy work here so this is still a work in progress
-->
Storybook 9 Play / Testing Story Guidelines:
- These file should be suffixed with `*.test.stories.ts`
- Don't overide the default storybook lauyout, just let it use the default
- When required for testing dom selection, use `data-testid`
- When you need to interact with the ui in the test, always create a `const user = userEvent.setup();` and interact with that
- Tests should simulate the the interaction the user would take, not call component apis directly (these should test the behavior, not the implementation)


- ALWAYS combine testing stories (`*.tests.stories.ts`) into one file when a directory has multiple components
- ALWAYS use custom component from `projects/shared-ui/src/lib/core` instead of creating inline components
<!--
This is for a clean separation of stories in thw storybook interface
-->
- ALWAYS end the storybook title with `/Tests`

- NEVER EVER add TSDoc to code created only for storybook, NEVER
