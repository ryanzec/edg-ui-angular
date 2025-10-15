import { InjectionToken } from '@angular/core';

export const AUTHENTICATION_API_URL = new InjectionToken<string>('Authentication API URL');
export const LOCAL_STORAGE_SESSION_USER_KEY = new InjectionToken<string>('Local Storage Session User Key');
export const LAUNCH_DARKLY_CLIENT_ID = new InjectionToken<string>('Launch Darkly Client ID');
export const USERS_API_URL = new InjectionToken<string>('Users API URL');
