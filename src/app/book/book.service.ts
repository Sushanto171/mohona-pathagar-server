import { Request } from "express";
import { Book } from "./book.model";

const getBooks = async (req: Request) => {
  const { filter, sortBy, sort, limit, page } = req.query;
  const limitNum = limit ? parseInt(limit as string) : 10;
  const pageNum = parseInt(page as string) - 1;
  const skip = pageNum * limitNum;
  let books;

  if (filter && sortBy && sort) {
    books = await Book.find({ genre: filter })
      .select("-updatedAt -createdAt")
      .sort({
        [sortBy as string]:
          sort === "ascending" || sort === "asc" || sort === "1" ? 1 : -1,
      })
      .skip(skip)
      .limit(limitNum);
  } else if (filter) {
    books = await Book.find({
      genre: { $regex: filter, $options: "i" },
    })
      .select("-updatedAt  -createdAt")
      .skip(skip)
      .limit(limitNum);
  } else {
    books = await Book.find()
      .select("-updatedAt  ")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);
  }

  const totalBook = await Book.countDocuments();
  const data = {
    books,
    total: { total: totalBook },
  };
  return data;
};

const getBookByID = async (req: Request) => {
  const bookId = req.params.bookId;
  Book._idIsValid(bookId);
  const book = await Book.findById(bookId);
  return book;
};

const countBookNumber = async () => {
  const count = await Book.estimatedDocumentCount();
  return count;
};

const createBook = async (req: Request) => {
  const body = req.body;
  if (!body) throw Error("Invalid books data");
  const book = await Book.create(body);
  return book;
};

const updataBookById = async (req: Request) => {
  const bookId = req.params.bookId;
  const body = req.body;
  if (!body) throw Error("Payload is invalid");
  Book._idIsValid(bookId);
  const book = await Book.findOneAndUpdate({ _id: bookId }, body, {
    new: true,
    runValidators: true,
  });
  return book;
};

const deleteBookById = async (req: Request) => {
  const bookId = req.params.bookId;
  Book._idIsValid(bookId);
  const book = await Book.findOneAndDelete({ _id: bookId });
  return book;
};

export const bookService = {
  getBooks,
  getBookByID,
  countBookNumber,
  createBook,
  updataBookById,
  deleteBookById,
};
