import { Request, Response } from "express";
import { Book } from "./book.model";

// get book by id
export const getBookByID = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    Book._idIsValid(bookId);
    const book = await Book.findById(bookId);
    res.status(book ? 200 : 404).json({
      success: true,
      message: "Book retrieved Successfully",
      data: book,
    });
  } catch (error) {
    throw error;
  }
};

// get books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit, page } = req.query;
    const limitNum = limit ? parseInt(limit as string) : 10;
    const pageNum = parseInt(page as string) - 1;
    const skip = pageNum * limitNum;
    let books;

    if (filter && sortBy && sort) {
      books = await Book.find({ genre: filter })
        .select("-updatedAt -description -createdAt")
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
        .select("-updatedAt -description -createdAt")
        .skip(skip)
        .limit(limitNum);
    } else {
      books = await Book.find()
        .select("-updatedAt -description ")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);
    }
    res.status(200).json({
      success: true,
      message: "Books retrieved Successfully",
      data: books,
    });
  } catch (error) {
    throw error;
  }
};

// get count books number
export const countBookNumber = async (req: Request, res: Response) => {
  try {
    const count = await Book.estimatedDocumentCount();
    res.status(200).json({ count });
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
      message: "Book created successfully.",
      data: book,
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
    const book = await Book.findOneAndUpdate({ _id: bookId }, body, {
      new: true,
      runValidators: true,
    });
    res.status(book ? 200 : 404).json({
      success: true,
      message: "Book updated successfully",
      data: book,
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
    const book = await Book.findOneAndDelete({ _id: bookId });
    res.status(book ? 200 : 404).json({
      success: true,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (error) {
    throw error;
  }
};
