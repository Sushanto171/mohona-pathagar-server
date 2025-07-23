import { Router } from "express";
import { createBorrow, getBorrowsSummery } from "./borrow.controllers";

export const borrowRoutes = Router();

borrowRoutes.get("/", getBorrowsSummery);
borrowRoutes.post("/", createBorrow);
