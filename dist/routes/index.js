"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const book_routes_1 = require("../book/book.routes");
exports.router = (0, express_1.Router)();
exports.router.use("/books", book_routes_1.bookRoutes);
// router.use("/borrows");
