import { Server } from "./infrastructure/http/server";

async function main() {
  const server = new Server(process.env.PORT || "3000");
  await server.start();
}

main().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
