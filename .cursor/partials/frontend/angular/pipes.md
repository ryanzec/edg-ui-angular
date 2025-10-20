You MUST ALWAYS use these patterns when work on Angular 20 pipes:
- ALWAYS make sure pipes are flagged as `pure: true`
- ALWAYS make sure the pipe only does ONE thing and the name of the pipe CLEARLY indicates what is does
<!--
Since this code can runn very often, performance is more of a concern than normal
-->
- ALWAYS Make sure the code is highly performant
- ALWAYS make sure the pipe gracefully handles `null` or `undefined` inputs without throwing errors

You MUST NEVER use these patterns when work on Angular 20 pipes:
- NEVER have side effect unless 100% NECESSARY
