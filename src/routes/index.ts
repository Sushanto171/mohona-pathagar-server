import { Router } from "express";
import { bookRoutes } from "../book/book.routes";

export const router = Router();

router.use("/books", bookRoutes);
// router.use("/borrows");
