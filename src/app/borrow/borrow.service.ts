import { Request } from "express";
import { Borrow } from "./borrow.model";

const createBorrow = async (req: Request) => {
  const body = req.body;
  await Borrow.checkCopies(body.book, parseInt(body.quantity));
  const borrow = await Borrow.create(body);
  return borrow;
};

const getBorrowsSummery = async (req: Request) => {
  const borrows = await Borrow.aggregate([
    {
      $sort: { createdAt: -1 },
    },
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
        book: { $first: "$book" },
        latestAddBorrow: { $first: "$createdAt" },
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
        latestAddBorrow: 1,
        book: {
          _id: 1,
          title: 1,
          isbn: 1,
        },
      },
    },
    {
      $sort: { latestAddBorrow: -1 },
    },
  ]);
  return borrows;
};

export const borrowService = {
  createBorrow,
  getBorrowsSummery,
};
