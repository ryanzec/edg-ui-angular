import { HttpStatusCode, httpStatusCodeMessage } from './http-status-code';

export type HttpErrorContext = {
  // this can be able data so it needs to support any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonResponse?: Record<string, any>;

  // this can be able data so it needs to support any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type HttpErrorOptions = {
  message?: string;
  context?: HttpErrorContext;
};

// using a class here as it seems to be standard practice for errors
export class HttpError extends Error {
  statusCode: number;

  context: HttpErrorContext;

  constructor(statusCode: HttpStatusCode, options: HttpErrorOptions = {}) {
    super(options.message ?? httpStatusCodeMessage[statusCode]);

    this.statusCode = statusCode;
    this.context = options.context ?? {};
  }
}
