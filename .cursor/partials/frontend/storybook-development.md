For references on how we structure our stroybook files and implement a number of feature, reference these files:
- `projects/shared-ui/src/lib/core/button/button.stories.ts`
- `projects/shared-ui/src/lib/core/input/input.stories.ts`
- `projects/shared-ui/src/lib/core/tag/tag.stories.ts`

For reference on how we structure pattern based example stories, reference these files:
- `projects/shared-ui/src/lib/examples/detect-if-output-event-is-listened-to/detect-if-output-event-is-listened-to.stories.ts`

Storybook 9 Guidelines:
- These file should be suffixed with `.stories.ts`
- Don't overide the default storybook lauyout, just let it use the default
- Make sure to account for all component states
- Make sure to NOT write and test / play related stories in the generated code
