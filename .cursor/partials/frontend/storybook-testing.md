Storybook 9 Play / Testing Story Guidelines:
- These file should be suffixed with `*.test.stories.ts`
- Don't overide the default storybook lauyout, just let it use the default
- When required for testing dom selection, use `data-testid`
- When you need to interact with the ui in the test, always create a `const user = userEvent.setup();` and interact with that
- Tests should simulate the the interaction the user would take, not call component apis directly (these should test the behavior, not the implementation)



<!--
This is for a clean separation of stories in thw storybook interface
-->
- MUST end the storybook title with `/Tests`
