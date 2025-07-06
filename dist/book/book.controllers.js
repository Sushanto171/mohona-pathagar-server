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
exports.deleteBookById = exports.updataBookById = exports.createBook = exports.getBooks = exports.getBookByID = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("./book.model");
// get book by id
const getBookByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        if (!bookId)
            throw Error("Book Id is required");
        if (!mongoose_1.Types.ObjectId.isValid(bookId))
            throw Error("Invalid book id");
        const book = yield book_model_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Successfully retrieved books",
            book,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.getBookByID = getBookByID;
// get books
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_model_1.Book.find();
        res.status(200).json({
            success: true,
            message: "Successfully retrieved books",
            books,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.getBooks = getBooks;
// create a book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield book_model_1.Book.create(body);
        res.status(200).json({
            success: true,
            message: "Successfully retrieved books",
            book,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.createBook = createBook;
// update a book by id
const updataBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        if (!bookId)
            throw Error("Book Id is required");
        if (!mongoose_1.Types.ObjectId.isValid(bookId))
            throw Error("Invalid book id");
        const book = yield book_model_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Successfully retrieved books",
            book,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updataBookById = updataBookById;
//  delete a book by id
const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        if (!bookId)
            throw Error("Book Id is required");
        if (!mongoose_1.Types.ObjectId.isValid(bookId))
            throw Error("Invalid book id");
        const book = yield book_model_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Successfully retrieved books",
            book,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteBookById = deleteBookById;
