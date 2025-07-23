"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const book_routes_1 = require("../book/book.routes");
const borrow_routes_1 = require("../borrow/borrow.routes");
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
];
route.forEach((route) => exports.router.use(route.path, route.router));
