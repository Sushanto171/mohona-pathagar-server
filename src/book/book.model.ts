import { model, Schema, Types } from "mongoose";
import { BookStaticMethod, IBook } from "./book.interfaces";

const bookSchema = new Schema<IBook, BookStaticMethod>(
  {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.static("_idIsValid", function (id) {
  const isValid = Types.ObjectId.isValid(id);
  if (!isValid) throw Error("BookId Is Invalid");
  return isValid;
});

bookSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (!update) return next();
  if ("copies" in update) {
    if (update.copies <= 0) {
      return (update.available = false);
    } else {
      return (update.available = true);
    }
  }
  next();
});
export const Book = model<IBook, BookStaticMethod>("Book", bookSchema);
