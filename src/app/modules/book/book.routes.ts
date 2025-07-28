import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
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
bookRoutes.post("/", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), createBook);
bookRoutes.put("/:bookId", updataBookById);
bookRoutes.delete("/:bookId", deleteBookById);
