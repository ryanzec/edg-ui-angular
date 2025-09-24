import { type UiEnvironment, ApplicationName, EnvironmentMode } from '@organization/shared-types';

export const environment: UiEnvironment = {
  mode: EnvironmentMode.STAGING,
  applicationName: ApplicationName.CUSTOMER_PORTAL,
  apiUrl: 'https://localhost:3000',
};
