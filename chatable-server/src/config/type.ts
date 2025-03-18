export interface EnvironmentVariables {
  PORT: number;

  DB_HOST: string;
  DB_PORT: number;
  DB_DATABASE: string;
  DB_USER: string;
  DB_PASSWD: string;
  DB_SYNC: boolean;

  OPEN_API_KEY: string;
  OPENAI_BASE_URL: string;
}
