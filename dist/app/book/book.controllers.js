"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookById = exports.updataBookById = exports.createBook = exports.countBookNumber = exports.getBooks = exports.getBookByID = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const sendResponse_1 = require("../utils/sendResponse");
const book_service_1 = require("./book.service");
// get book by id
exports.getBookByID = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_service_1.bookService.getBookByID(req);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Book retrieved successfully",
        data: book,
    });
}));
// get books
exports.getBooks = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.bookService.getBooks(req);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Books retrieved Successfully",
        data: result.books,
        meta: result.total,
    });
}));
// get count books number
exports.countBookNumber = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield book_service_1.bookService.countBookNumber();
    res.status(200).json({ count });
}));
// create a book
exports.createBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_service_1.bookService.createBook(req);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Book created successfully.",
        data: book,
        statusCode: 201,
    });
}));
// update a book by id
exports.updataBookById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_service_1.bookService.updataBookById(req);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Book updated successfully",
        data: book,
        statusCode: 200,
    });
}));
//  delete a book by id
exports.deleteBookById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_service_1.bookService.deleteBookById(req);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Book deleted successfully",
        data: book,
        statusCode: 200,
    });
}));
