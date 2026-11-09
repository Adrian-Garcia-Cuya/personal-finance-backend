import { buildContainer } from "./composition/container";
import { Server } from "./infrastructure/http/server";

async function main() {
  const container = buildContainer();
  const hostname = process.env.HOST;
  const server = new Server(process.env.PORT || "3004", hostname, container);
  await server.start();
}

main().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
