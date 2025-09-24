export const EnvironmentMode = {
  LOCAL: 'local',
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const;

export type EnvironmentMode = (typeof EnvironmentMode)[keyof typeof EnvironmentMode];

export const ApplicationName = {
  CUSTOMER_PORTAL: 'customer-portal',
  INTERNAL_PORTAL: 'internal-portal',
} as const;

export type ApplicationName = (typeof ApplicationName)[keyof typeof ApplicationName];

export type UiEnvironment = {
  mode: EnvironmentMode;
  applicationName: ApplicationName;
  apiUrl: string;
};
