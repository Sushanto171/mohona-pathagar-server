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
bookRoutes.get("/:id", getBookByID);
bookRoutes.post("/", createBook);
bookRoutes.patch("/:id", updataBookById);
bookRoutes.delete("/", deleteBookById);
