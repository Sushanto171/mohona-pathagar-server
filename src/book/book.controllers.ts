import { Request, Response } from "express";
import { Book } from "./book.model";

// get book by id
export const getBookByID = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    Book._idIsValid(bookId);
    const book = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Successfully retrieved book",
      book,
    });
  } catch (error) {
    throw error;
  }
};

// get books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;

    const limitNum: number =
      limit && typeof limit === "string" ? parseInt(limit) : 10;

    let books;

    if (filter && sortBy && sort) {
      books = await Book.find({ genre: filter })
        .sort({
          [sortBy as string]:
            sort === "ascending" || sort === "asc" || sort === "1" ? 1 : -1,
        })
        .limit(limitNum);
    } else if (filter) {
      books = await Book.find({ genre: filter }).limit(limitNum);
    } else {
      books = await Book.find().limit(limitNum);
    }
    res.status(200).json({
      success: true,
      message: "Successfully retrieved books",
      books,
    });
  } catch (error) {
    throw error;
  }
};

// create a book
export const createBook = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body) throw Error("Invalid books data");
    const book = await Book.create(body);
    res.status(200).json({
      success: true,
      message: "Successfully created the book",
      book,
    });
  } catch (error) {
    throw error;
  }
};

// update a book by id
export const updataBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const body = req.body;
    if (!body) throw Error("Payload is invalid");
    Book._idIsValid(bookId);
    const book = await Book.findByIdAndUpdate(bookId, body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      message: "Successfully updated the book",
      book,
    });
  } catch (error) {
    throw error;
  }
};

//  delete a book by id
export const deleteBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    Book._idIsValid(bookId);
    const book = await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Successfully deleted this book",
      book,
    });
  } catch (error) {
    throw error;
  }
};
