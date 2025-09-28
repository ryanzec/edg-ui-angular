import { type UiEnvironment, ApplicationName, EnvironmentMode } from '@organization/shared-types';

export const environment: UiEnvironment = {
  mode: EnvironmentMode.STAGING,
  applicationName: ApplicationName.INTERNAL_PORTAL,
  apiUrl: 'https://localhost:3000',
  jetCookieName: 'internal-jwt',
};
