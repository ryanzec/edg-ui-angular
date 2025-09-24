import { type UiEnvironment, ApplicationName, EnvironmentMode } from '@organization/shared-types';

export const environment: UiEnvironment = {
  mode: EnvironmentMode.DEVELOPMENT,
  applicationName: ApplicationName.INTERNAL_PORTAL,
  apiUrl: 'https://localhost:3000',
};
