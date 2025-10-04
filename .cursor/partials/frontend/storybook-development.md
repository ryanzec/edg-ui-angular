For references on how we structure our stroybook files and implement a number of feature, reference these files:
- `projects/shared-ui/src/lib/core/button/button.stories.ts`
- `projects/shared-ui/src/lib/core/input/input.stories.ts`
- `projects/shared-ui/src/lib/core/tag/tag.stories.ts`

For reference on how we structure pattern based example stories, reference these files:
- `projects/shared-ui/src/lib/examples/detect-if-output-event-is-listened-to/detect-if-output-event-is-listened-to.stories.ts`

You MUST ALWAYS use these patterns when work on development storybook stories:
- ALWAYS create a story for each variant but group different versions of a variant together (so if there are 5 size for a component, there should be 1 story for sizes that has all 5 size in the same story)
- ALWAYS add `tags: ['autodocs']` for component and directive development stories
<!--
Helps keep better consistent for all stories.
-->
- ALWAYS use the a custom render for stroies utilize the following component:
  - `projects/shared-ui/src/lib/private/storybook-example-container`
  - `projects/shared-ui/src/lib/private/storybook-example-container-section`
- ALWAYS make sure that required property of the component being storied has all its required properties set
- ALWAYS make sure for the interactive demo story, the types for the controls in the correct types based on the component property types
- ALWAYS wrap the docs description content in a `<div class="docs-top-level-overview">...</div>` block

You MUST NEVER use these patterns when work on development storybook stories:
- NEVER write play / tests stories in the development stories file
