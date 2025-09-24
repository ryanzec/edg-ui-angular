export const HttpStatusCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  RATE_LIMITED: 429,
  INTERNAL_ERROR: 500,
} as const;

export type HttpStatusCode = (typeof HttpStatusCode)[keyof typeof HttpStatusCode];

export const httpStatusCodeMessage: Record<HttpStatusCode, string> = {
  [HttpStatusCode.BAD_REQUEST]: 'Bad Request',
  [HttpStatusCode.UNAUTHORIZED]: 'Unauthorized',
  [HttpStatusCode.FORBIDDEN]: 'Forbidden',
  [HttpStatusCode.NOT_FOUND]: 'Not Found',
  [HttpStatusCode.RATE_LIMITED]: 'Too Many Requests',
  [HttpStatusCode.INTERNAL_ERROR]: 'Unknown Error Occurred',
};

