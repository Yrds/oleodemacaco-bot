declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: 'production' | 'development';
      BOT_HTTP_TOKEN: string;
      DATABASE_URL: string;
    }
  }
}
