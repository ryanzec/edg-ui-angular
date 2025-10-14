Angular 20 Pipe Hard Requirements:
- Make sure pipes are flagged as `pure: true` whenever possible, only use `pure: false` when absolutely needed
- Make sure the code is highly performant (in the case of angular pipes, performances in more important than readability as they can run often but make sure to comment on code that is being optomized for performance and explain any complexity that might be needed)
- Make sure the pipe only does ONE thing and the name of the pipe CLEARLY indicates what is does
- MAke sure the pipe gracefully handles `null` or `undefined` inputs without throwing errors
