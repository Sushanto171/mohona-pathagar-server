import { Request, Response } from "express";
import { Types } from "mongoose";
import { Book } from "./book.model";

// get book by id
export const getBookByID = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    if (!bookId) throw Error("Book Id is required");
    if (!Types.ObjectId.isValid(bookId)) throw Error("Invalid book id");
    const book = await Book.findById(bookId)
    res.status(200).json({
      success: true,
      message: "Successfully retrieved books",
      book,
    });
  } catch (error) {
    throw error;
  }
};

// get books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
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
    const book = await Book.create(body);
    res.status(200).json({
      success: true,
      message: "Successfully retrieved books",
      book,
    });
  } catch (error) {
    throw error;
  }
};

// update a book by id
export const updataBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    if (!bookId) throw Error("Book Id is required");
    if (!Types.ObjectId.isValid(bookId)) throw Error("Invalid book id");
    const book = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Successfully retrieved books",
      book,
    });
  } catch (error) {
    throw error;
  }
};

//  delete a book by id
export const deleteBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    if (!bookId) throw Error("Book Id is required");
    if (!Types.ObjectId.isValid(bookId)) throw Error("Invalid book id");
    const book = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Successfully retrieved books",
      book,
    });
  } catch (error) {
    throw error;
  }
};