export type EnvironmentMode = 'local' | 'development' | 'staging' | 'production';

export type ApplicationName = 'customer-portal' | 'internal-portal';

export type UiEnvironment = {
  mode: EnvironmentMode;
  applicationName: ApplicationName;
  authenticationApiUrl: string;
  usersApiUrl: string;
  jetCookieName: string;
  launchDarklyClientId: string;
};
