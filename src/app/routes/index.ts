import { Router } from "express";
import { borrowRoutes } from "../modules/borrow/borrow.routes";
import { bookRoutes } from "../modules/book/book.routes";
import { userRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.route";

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
  {
    path: "/user",
    router: userRoutes
  },
  {
    path: "/auth",
    router: AuthRoutes
  }
];

route.forEach((route) => router.use(route.path, route.router));
