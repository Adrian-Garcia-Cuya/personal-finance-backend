declare module "bun" {
  interface Env {
    PORT: string;
    JWT_SECRET: string;
    DATABASE_URL: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_PORT: string;
    HOST_DB: string;
    NODE_ENV: "development" | "production" | "test";
  }
}
