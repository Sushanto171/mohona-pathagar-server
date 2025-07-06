import { Request, Response } from "express";
import { Borrow } from "./borrow.model";

export const createBorrow = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    await Borrow.checkCopies(body.book, parseInt(body.quantity));
    const borrow = await Borrow.create(body);
    res.status(201).json({
      success: true,
      message: "A Borrow Successfully created",
      borrow,
    });
  } catch (error) {
    throw error;
  }
};
