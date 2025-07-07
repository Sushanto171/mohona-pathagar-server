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
const book_model_1 = require("./book.model");
// get book by id
const getBookByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        book_model_1.Book._idIsValid(bookId);
        const book = yield book_model_1.Book.findById(bookId);
        res.status(book ? 200 : 404).json({
            success: true,
            message: "Book retrieved Successfully",
            data: book,
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
        const { filter, sortBy, sort, limit } = req.query;
        const limitNum = limit && typeof limit === "string" ? parseInt(limit) : 10;
        let books;
        if (filter && sortBy && sort) {
            books = yield book_model_1.Book.find({ genre: filter })
                .sort({
                [sortBy]: sort === "ascending" || sort === "asc" || sort === "1" ? 1 : -1,
            })
                .limit(limitNum);
        }
        else if (filter) {
            books = yield book_model_1.Book.find({
                genre: { $regex: filter, $options: "i" },
            }).limit(limitNum);
        }
        else {
            books = yield book_model_1.Book.find().limit(limitNum);
        }
        res.status(200).json({
            success: true,
            message: "Books retrieved Successfully",
            data: books,
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
        if (!body)
            throw Error("Invalid books data");
        const book = yield book_model_1.Book.create(body);
        res.status(200).json({
            success: true,
            message: "Book created successfully.",
            data: book,
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
        const bookId = req.params.bookId;
        const body = req.body;
        if (!body)
            throw Error("Payload is invalid");
        book_model_1.Book._idIsValid(bookId);
        const book = yield book_model_1.Book.findOneAndUpdate({ _id: bookId }, body, {
            new: true,
            runValidators: true,
        });
        res.status(book ? 200 : 404).json({
            success: true,
            message: "Book updated successfully",
            data: book,
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
        const bookId = req.params.bookId;
        book_model_1.Book._idIsValid(bookId);
        const book = yield book_model_1.Book.findOneAndDelete({ _id: bookId });
        res.status(book ? 200 : 404).json({
            success: true,
            message: "Book deleted successfully",
            data: book,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteBookById = deleteBookById;
