export interface EnvironmentVariables {
  PORT: number;

  ALLOWED_ORIGINS: string; // ,分隔

  DB_HOST: string;
  DB_PORT: number;
  DB_DATABASE: string;
  DB_USER: string;
  DB_PASSWD: string;
  DB_SYNC: boolean;

  OPEN_API_KEY: string;
  OPENAI_BASE_URL: string;
  OPENAI_PROXY_URL: string;

  OAUTH_GITHUB_CLIENT_ID: string;
  OAUTH_GITHUB_CLIENT_SECRET: string;
  OAUTH_GITHUB_CALLBACK_URL: string;
}
