Angular 20 Services Hard Requirements:
- Design services around a single responsibility and the name of the service CLEARLY indicates what that responsibility is
- Use the `providedIn: 'root'` option for singleton services
- Make sure the public API of the service is clean and intuitive for other developers to understand
- Make sure complex logic (especially with RxJS) is broken down into readable methods
- Make sure error (like one from `HttpClient`) are handled gracefully
