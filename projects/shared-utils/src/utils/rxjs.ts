import { Observable, OperatorFunction } from 'rxjs';

const withDelay = <T>(delay: number): OperatorFunction<T, T> => {
  return (source$: Observable<T>) => {
    return new Observable<T>((observer) => {
      setTimeout(() => {
        source$.subscribe({
          next: (value) => {
            observer.next(value);
            observer.complete();
          },
          error: (err) => observer.error(err),
        });
      }, delay);
    });
  };
};

export const rxjsUtils = {
  withDelay,
};
