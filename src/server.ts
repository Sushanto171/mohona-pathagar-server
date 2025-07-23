import { Server } from "http";
import mongoose from "mongoose";
import { app } from "./app";
import config from "./app/config";

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url!);
    server = app.listen(config.port, () => {
      console.log(`✅ Server Running: http://localhost:${config.port} `);
    });
    console.log("⚡ Connection stabilized with database");
  } catch (error) {}
}

process.on("unhandledRejection", () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGTERM", () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

bootstrap();
