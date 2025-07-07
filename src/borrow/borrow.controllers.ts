import { Request, Response } from "express";
import { Borrow } from "./borrow.model";

export const createBorrow = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    await Borrow.checkCopies(body.book, parseInt(body.quantity));
    const borrow = await Borrow.create(body);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    throw error;
  }
};

export const getBorrowsSummery = async (req: Request, res: Response) => {
  try {
    const borrows = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
          book: { $first: "$book" },
        },
      },
      {
        $lookup: {
          as: "book",
          from: "books",
          localField: "book",
          foreignField: "_id",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: 1,
            isbn: 1,
          },
        },
      },
    ]);

    res.status(borrows ? 200 : 404).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrows,
    });
  } catch (error) {
    throw error;
  }
};
