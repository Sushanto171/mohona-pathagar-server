import mongoose from "mongoose";
import { app } from "./app";
import config from "./config";

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url!);
    app.listen(config.port, () => {
      console.log(`✅ Server Running: http://localhost:${config.port} `);
    });
    console.log("⚡ Connection stabilized with database");
  } catch (error) {}
}

bootstrap();
