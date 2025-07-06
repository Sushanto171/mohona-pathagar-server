import { model, Schema } from "mongoose";
import { IBook } from "./book.interfaces";

const bookSchema = new Schema<IBook>({
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
});

export const Book = model("Book", bookSchema)