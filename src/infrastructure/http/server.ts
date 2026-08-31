import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prisma } from "../database/prisma";

import { AuthRouter, accountRouter, categoryRouter, tagRouter } from "./routes";

import { authMiddleware } from "./middlewares/auth.middleware";
import { transactionRouter } from "./modules/transaction/router";

export class Server {
  private app = new Hono().basePath("/api");

  constructor(private readonly port: string) {}

  private async initDatabase() {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connected successfully");
  }

  private setupRoutes() {
    this.app.get("/health", (c) => {
      return c.text("ok");
    });

    this.app.route("/auth", AuthRouter);

    this.app.use(authMiddleware);
    this.app.route("/category", categoryRouter);
    this.app.route("/account", accountRouter);
    this.app.route("/tag", tagRouter);
    this.app.route("/transaction", transactionRouter);

    this.app.notFound((c) => {
      return c.json(
        {
          message: "Route not found",
        },
        404,
      );
    });
  }

  private setupErrorhandling() {
    this.app.onError((err, c) => {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";

      return c.json(
        {
          success: false,
          message: errorMessage,
        },
        500,
      );
    });
  }

  private setupMiddleware() {
    this.app.use(cors());
    this.app.use(logger());
  }

  public async start() {
    await this.initDatabase();
    this.setupErrorhandling();
    this.setupMiddleware();
    this.setupRoutes();

    console.log("Server started on port", this.port);

    Bun.serve({
      port: Number(this.port),
      fetch: this.app.fetch,
    });
  }
}
