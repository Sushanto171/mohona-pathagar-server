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
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("../book/book.model");
// book (objectId) — Mandatory. References the borrowed book’s ID.
// quantity (number) — Mandatory. Positive integer representing the number of copies borrowed.
// dueDate (date) — Mandatory. The date by which the book must be returned.
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "bookId is required. Please provide a bookId."],
        ref: "Book",
    },
    quantity: {
        type: Number,
        min: 0,
        required: [true, "Quantity is required. Please provide a quantity."],
    },
    dueDate: {
        type: Date,
        required: [true, "dutDate is required. Please provide a dueDate."],
    },
}, {
    versionKey: false,
    timestamps: true,
});
borrowSchema.static("checkCopies", function (bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        // step -1: Check bookId and quantity
        book_model_1.Book._idIsValid(bookId);
        if (isNaN(quantity))
            throw Error("Invalid quantity");
        if (quantity <= 0)
            throw Error("Invalid quantity");
        // // step-2: find book by id
        let book = yield book_model_1.Book.findById(bookId);
        // // step -3: Is book is null .then return
        if (!book)
            throw Error("Book Found null");
        // // step-4 : check copies
        if (book.copies >= quantity) {
            book.copies = book.copies - quantity;
            if (book.copies === 0) {
                book.available = false;
            }
            //   //step-5 modify actual book
            yield book_model_1.Book.findByIdAndUpdate(bookId, book, {
                new: true,
                runValidators: true,
            });
        }
        else {
            throw Error("Insufficient Number of Copies");
        }
    });
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
