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
bookSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        if (!update)
            return next();
        if ("copies" in update) {
            if (update.copies <= 0) {
                return (update.available = false);
            }
            else {
                return (update.available = true);
            }
        }
        next();
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
