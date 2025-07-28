import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { bookService } from "./book.service";

// get book by id
export const getBookByID = catchAsync(async (req, res) => {
  const book = await bookService.getBookByID(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
});

// get books
export const getBooks = catchAsync(async (req, res) => {
  const result = await bookService.getBooks(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Books retrieved Successfully",
    data: result.books,
    meta: result.total,
  });
});

// get count books number
export const countBookNumber = catchAsync(async (req, res) => {
  const count = await bookService.countBookNumber();
  res.status(200).json({ count });
});

// create a book
export const createBook = catchAsync(async (req, res) => {
  const book = await bookService.createBook(req);
  sendResponse(res, {
    success: true,
    message: "Book created successfully.",
    data: book,
    statusCode: 201,
  });
});

// update a book by id
export const updataBookById = catchAsync(async (req, res) => {
  const book = await bookService.updataBookById(req);
  sendResponse(res, {
    success: true,
    message: "Book updated successfully",
    data: book,
    statusCode: 200,
  });
});

//  delete a book by id
export const deleteBookById = catchAsync(async (req, res) => {
  const book = await bookService.deleteBookById(req);
  sendResponse(res, {
    success: true,
    message: "Book deleted successfully",
    data: book,
    statusCode: 200,
  });
});
