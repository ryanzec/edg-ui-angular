You MUST use these patterns when work on RxJS code:
- ALWAYS use built-in rxjs utilities
- ALWAYS create subject as `private` implementation detail and only expose `publicly` what is needed
```ts
// MUST DO
private _focusRequestSubject = new Subject<void>();
```
<!--
This prevent external code from triggering `.next()`, by keeping that centralize to the service managing the subject, it should produce far less confusion when debugging pontential bugs
-->
- ALWAYS expose `private` subject as observables
```ts
// MUST DO
private _focusRequestSubject = new Subject<void>();
// ...
public focusRequest$ = this._focusRequestSubject.asObservable();
```
- ALWAYS make sur error handling is robust
- ALWAYS make sure streams properly composed to avoid nested subscriptions whenever possible
- ALWAYS use the async / await version of calling RxJS Observables
- ALWAYS log error in `catchError()` using the `LogManager.warn()` like:
```ts
this._logManager.warn({
  type: 'some-error-type',
  message: this._logManager.getErrorMessage(error),
  error,
});
```

You can NEVER use these patterns when work on RxJS code:
- NEVER expose a subject as `public`
```ts
// NEVER DO
public focusRequestSubject = new Subject<void>();
```
- NEVER create a customer rxjs utility when a built-in one is available
