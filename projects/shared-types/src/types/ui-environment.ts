export type EnvironmentMode = 'local' | 'development' | 'staging' | 'production';

export type ApplicationName = 'customer-portal' | 'internal-portal';

export type UiEnvironment = {
  mode: EnvironmentMode;
  applicationName: ApplicationName;
  apiUrl: string;
  jetCookieName: string;
  launchDarklyClientId: string;
};
