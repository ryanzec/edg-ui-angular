import { type UiEnvironment, ApplicationName, EnvironmentMode } from '@organization/shared-types';

export const environment: UiEnvironment = {
  mode: EnvironmentMode.PRODUCTION,
  applicationName: ApplicationName.CUSTOMER_PORTAL,
  apiUrl: 'https://localhost:3000',
  jetCookieName: 'jwt',
};
