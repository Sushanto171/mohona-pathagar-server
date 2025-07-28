import { Server } from "http";
import mongoose from "mongoose";
import { app } from "./app";
import { envVars } from "./app/config/envVars";

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(envVars.DATABASE_URL!);
    server = app.listen(envVars.PORT, () => {
      console.log(`✅ Server Running: http://localhost:${envVars.PORT} `);
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
