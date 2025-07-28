/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import { app } from "./app";
import { envVars } from "./app/config/envVars";
import { createSuperAdmin } from "./app/utils/speedSuperAdmin";

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(envVars.DATABASE_URL);
    server = app.listen(envVars.PORT, () => {
      console.log(`✅ Server Running: http://localhost:${envVars.PORT} `);
    });
    console.log("⚡ Connection stabilized with database");
  } catch (error) {
    console.log("Server", error);
  }
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

(async () => {
  await bootstrap();
  await createSuperAdmin();
})();
