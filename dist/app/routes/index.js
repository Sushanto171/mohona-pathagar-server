"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const borrow_routes_1 = require("../modules/borrow/borrow.routes");
const book_routes_1 = require("../modules/book/book.routes");
const user_routes_1 = require("../modules/user/user.routes");
exports.router = (0, express_1.Router)();
const route = [
    {
        path: "/books",
        router: book_routes_1.bookRoutes,
    },
    {
        path: "/borrow",
        router: borrow_routes_1.borrowRoutes,
    },
    {
        path: "/user",
        router: user_routes_1.userRoutes
    }
];
route.forEach((route) => exports.router.use(route.path, route.router));
