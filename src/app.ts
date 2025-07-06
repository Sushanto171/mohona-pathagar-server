import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { router } from "./routes";
export const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/api/", router);

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "Hello World...." });
});

// global 404 route handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    massage: `The path '${req.path}' was not found on this server.`,
  });
});


// global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // console.log(err);

  res.json({
    success: false,
    message: err.message,
    error: err,
  });
});
