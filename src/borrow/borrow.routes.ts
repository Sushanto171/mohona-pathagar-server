import { Router } from "express";
import { createBorrow } from "./borrow.controllers";

export const borrowRoutes = Router();

borrowRoutes.post("/", createBorrow);
