View component are components in an application that are designed to be a page level component that mostly combination other components

You MUST ALWAYS use these patterns when work on Angular 20 view component:
- ALWAYS utilize available components in `projects/shared-ui` project instead of acreate bespken component for the view
- ALWAYS make sure to add the route for a new view component if a route is not already configured
- ALWAYS ask if you need to make a new component if the new component should be created in the `shared-ui` project
- ALWAYS ask if a customization is needed to a component in `shared-ui` if that change should be made in the `shared-ui` component instead of one of in the view component
