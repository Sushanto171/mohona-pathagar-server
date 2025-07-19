import { Router } from "express";
import {
  countBookNumber,
  createBook,
  deleteBookById,
  getBookByID,
  getBooks,
  updataBookById,
} from "./book.controllers";

export const bookRoutes = Router();

bookRoutes.get("/", getBooks);
bookRoutes.get("/countBook", countBookNumber);
bookRoutes.get("/:bookId", getBookByID);
bookRoutes.post("/", createBook);
bookRoutes.put("/:bookId", updataBookById);
bookRoutes.delete("/:bookId", deleteBookById);
