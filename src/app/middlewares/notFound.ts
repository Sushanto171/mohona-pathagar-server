import { Request, Response } from "express";

export const notFOund = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    massage: `The path '${req.path}' was not found on this server.`,
  });
};
