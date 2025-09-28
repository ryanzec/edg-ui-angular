import { type UiEnvironment, ApplicationName, EnvironmentMode } from '@organization/shared-types';

export const environment: UiEnvironment = {
  mode: EnvironmentMode.LOCAL,
  applicationName: ApplicationName.INTERNAL_PORTAL,
  apiUrl: 'https://localhost:3000',
  jetCookieName: 'internal-jwt',
};
