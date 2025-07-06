import { Router } from "express";
import { bookRoutes } from "../book/book.routes";
import { borrowRoutes } from "../borrow/borrow.routes";

export const router = Router();

router.use("/books", bookRoutes);
router.use("/borrow", borrowRoutes);
