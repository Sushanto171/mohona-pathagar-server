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
exports.bookService = void 0;
const book_model_1 = require("./book.model");
const getBooks = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy, sort, limit, page } = req.query;
    const limitNum = limit ? parseInt(limit) : 10;
    const pageNum = parseInt(page) - 1;
    const skip = pageNum * limitNum;
    let books;
    if (filter && sortBy && sort) {
        books = yield book_model_1.Book.find({ genre: filter })
            .select("-updatedAt -createdAt")
            .sort({
            [sortBy]: sort === "ascending" || sort === "asc" || sort === "1" ? 1 : -1,
        })
            .skip(skip)
            .limit(limitNum);
    }
    else if (filter) {
        books = yield book_model_1.Book.find({
            genre: { $regex: filter, $options: "i" },
        })
            .select("-updatedAt  -createdAt")
            .skip(skip)
            .limit(limitNum);
    }
    else {
        books = yield book_model_1.Book.find()
            .select("-updatedAt  ")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);
    }
    const totalBook = yield book_model_1.Book.countDocuments();
    const data = {
        books,
        total: { total: totalBook },
    };
    return data;
});
const getBookByID = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    book_model_1.Book._idIsValid(bookId);
    const book = yield book_model_1.Book.findById(bookId);
    return book;
});
const countBookNumber = () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield book_model_1.Book.estimatedDocumentCount();
    return count;
});
const createBook = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (!body)
        throw Error("Invalid books data");
    const book = yield book_model_1.Book.create(body);
    return book;
});
const updataBookById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const body = req.body;
    if (!body)
        throw Error("Payload is invalid");
    book_model_1.Book._idIsValid(bookId);
    const book = yield book_model_1.Book.findOneAndUpdate({ _id: bookId }, body, {
        new: true,
        runValidators: true,
    });
    return book;
});
const deleteBookById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    book_model_1.Book._idIsValid(bookId);
    const book = yield book_model_1.Book.findOneAndDelete({ _id: bookId });
    return book;
});
exports.bookService = {
    getBooks,
    getBookByID,
    countBookNumber,
    createBook,
    updataBookById,
    deleteBookById,
};
