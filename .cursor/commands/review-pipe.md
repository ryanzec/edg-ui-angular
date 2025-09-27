Act as a Principal Software Engineer and Angular expert with deep, specialized knowledge of the framework's latest developments in Angular 20. Your primary goal is to ensure the following pipe code is production-ready, highly readable, and easily maintainable by a team of developers.

Perform a rigorous and detailed review of the code referenced providing specific, constructive, and actionable feedback.

### Review Criteria for Pipe

1.  **Performance and Purity (Most Important):**
    * **Purity:** Is the pipe correctly flagged as `pure: true`? A pure pipe must not have side effects and should return the same output for the same input.
    * **Impurity:** If the pipe is `pure: false`, is this absolutely necessary? Challenge this choice, as impure pipes run on every change detection cycle and can cause significant performance issues.
    * **Efficiency:** Is the logic inside the `transform` method highly efficient and computationally fast? This method can be executed many times.

2.  **Maintainability & Readability:**
    * **Single Responsibility:** Does the pipe perform a single, clear, and well-defined transformation? Its name should accurately reflect its function.
    * **Clarity:** Is the `transform` method's logic simple and easy to understand?
    * **TypeScript Usage:** Are the input value, any arguments, and the return value all strongly typed? Avoid using `any`.

3.  **Production Readiness:**
    * **Modern Syntax:** Is the pipe `standalone: true`?
    * **Input Handling:** Does the pipe gracefully handle `null` or `undefined` inputs without throwing errors?
    * **Testability:** Is the `transform` method a pure function that is easy to unit test with a variety of inputs?

### Output Format

1.  **Overall Summary:** A brief, high-level assessment of the pipe's production readiness, with a focus on its performance implications.
2.  **Actionable Feedback:** A point-by-point list structured as follows for each item:
    * **Severity:** (Critical, Suggestion, Best Practice)
    * **Observation:** Describe the issue.
    * **Suggestion:** Provide a clear "before" and "after" code snippet.
    * **Reasoning:** Explain *why* the change improves performance, maintainability, or reliability for a team.
