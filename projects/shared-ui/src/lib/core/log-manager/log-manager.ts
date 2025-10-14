import { Injectable, signal } from '@angular/core';
import { ErrorMessage, HttpError } from '@organization/shared-types';

export type LogMode = 'production' | 'development';

type ErrorMessageOptions = {
  defaultMessage?: string;
};

export type LogLevel = 'log' | 'warn' | 'error';

@Injectable({
  providedIn: 'root',
})
export class LogManager {
  private _loggingMode = signal<LogMode>('development');

  // match native api
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public log(...args: any) {
    if (this._loggingMode() !== 'production') {
      console.log(...args);
    }
  }

  // match native api
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public warn(...args: any) {
    // posthog.capture('$exception', {
    //   $exception_type: 'console_warning',
    //   $exception_message: 'Something went wrong',
    //   $exception_stack_trace_raw: console.trace(),
    //   console_arguments: args,
    // });

    console.warn(...args);
  }

  // match native api
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public error(...args: any) {
    // posthog.capture('$exception', {
    //   $exception_type: 'console_error',
    //   $exception_message: 'Something went wrong',
    //   $exception_stack_trace_raw: console.trace(),
    //   console_arguments: args,
    // });

    console.error(...args);
  }

  public setLoggingMode(mode: LogMode): void {
    this._loggingMode.set(mode);
  }

  public getErrorMessage(err: Error, options: ErrorMessageOptions = {}) {
    if (err instanceof HttpError && err.context.jsonResponse?.error?.message) {
      return err.context.jsonResponse?.error?.message;
    }

    if (err instanceof Error) {
      return err.message;
    }

    return options.defaultMessage !== undefined ? options.defaultMessage : ErrorMessage.UNKNOWN;
  }
}
