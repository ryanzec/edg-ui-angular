import { HttpParams } from '@angular/common/http';

/**
 * builds http params from an object, filtering out undefined and null values
 */
export const buildHttpParams = (params: Record<string, unknown>): HttpParams => {
  let httpParams = new HttpParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (value !== undefined && value !== null) {
      httpParams = httpParams.set(key, String(value));
    }
  });

  return httpParams;
};
