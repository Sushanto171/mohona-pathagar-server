import { Router } from "express";
import { bookRoutes } from "../book/book.routes";
import { borrowRoutes } from "../borrow/borrow.routes";

export const router = Router();

const route = [
  {
    path: "/books",
    router: bookRoutes,
  },
  {
    path: "/borrow",
    router: borrowRoutes,
  },
];

route.forEach((route) => router.use(route.path, route.router));
