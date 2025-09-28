import { type UiEnvironment, ApplicationName, EnvironmentMode } from '@organization/shared-types';

export const environment: UiEnvironment = {
  mode: EnvironmentMode.PRODUCTION,
  applicationName: ApplicationName.INTERNAL_PORTAL,
  apiUrl: 'https://localhost:3000',
  jetCookieName: 'internal-jwt',
};
