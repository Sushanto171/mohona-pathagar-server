import cors from "cors";
import express, { Application, Request, Response } from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFOund } from "./app/middlewares/notFound";
import { router } from "./app/routes";
export const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://mohona-pathagar.vercel.app", "http://localhost:5173"],
  })
);
app.use("/api/", router);

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "Hello World...." });
});

// global 404 route handler
app.use(notFOund);

// global error handler
app.use(globalErrorHandler);
