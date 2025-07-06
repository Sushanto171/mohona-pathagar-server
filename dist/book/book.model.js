"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required. Please provide a title."],
    },
    author: {
        type: String,
        required: [true, "Author is required. Please provide a author."],
    },
    genre: {
        type: String,
        required: [
            true,
            "Invalid genre. Please select a valid option from the list.",
        ],
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
        },
    },
    isbn: {
        type: String,
        required: [true, "ISBN is required. Please provide a ISBN."],
        unique: true,
    },
    description: { type: String },
    copies: {
        type: Number,
        required: [true, "Copies is required. Please provide a copies."],
        min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: true,
});
bookSchema.static("_idIsValid", function (id) {
    const isValid = mongoose_1.Types.ObjectId.isValid(id);
    if (!isValid)
        throw Error("BookId Is Invalid");
    return isValid;
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
