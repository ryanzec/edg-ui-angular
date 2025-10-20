You MUST ALWAYS use these patterns when work on Angular 20 services:
- ALWAYS use an `initialize()` method for figuring `@Injectable`s that are NOT provided in `root`
- ALWAYS design services around a single responsibility and the name of the service CLEARLY indicates what that responsibility is
- ALWAYS use the `providedIn: 'root'` option for global, one instance services
- ALWAYS make sure the public API of the service is clean and intuitive for other developers to understand
- ALWAYS make sure complex logic (especially with RxJS) is broken down into readable methods
- ALWAYS make sure errors (like one from `HttpClient`) are handled gracefully
