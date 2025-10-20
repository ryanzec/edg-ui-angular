
You MUST ALWAYS use these patterns when work on Angular 20 guards / interceptors:
- ALWAYS make sure it is returning proper types (`Observable`, `Promise`, `boolean`, `UrlTree`)
- ALWAYS make sure async logic is handled correctly and efficiently
<!--
Since this code can runn very often, performance is more of a concern than normal
-->
- ALWAYS Make sure the code is highly performant

You MUST NEVER use these patterns when work on Angular 20 guards / interceptors:
- NEVER have side effect unless 100% NECESSARY
