import { Router } from "express";
import {
  createBook,
  deleteBookById,
  getBookByID,
  getBooks,
  updataBookById,
} from "./book.controllers";

export const bookRoutes = Router();

bookRoutes.get("/", getBooks);
bookRoutes.get("/:bookId", getBookByID);
bookRoutes.post("/", createBook);
bookRoutes.put("/:bookId", updataBookById);
bookRoutes.delete("/:bookId", deleteBookById);
