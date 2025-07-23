import { model, Schema } from "mongoose";
import { BorrowStaticMethod, IBorrow } from "./borrow.interfaces";
import { Book } from "../book/book.model";
import { IBook } from "../book/book.interfaces";
// book (objectId) — Mandatory. References the borrowed book’s ID.
// quantity (number) — Mandatory. Positive integer representing the number of copies borrowed.
// dueDate (date) — Mandatory. The date by which the book must be returned.
const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

borrowSchema.static("checkCopies", async function (bookId, quantity: number) {
  // step -1: Check bookId and quantity
  Book._idIsValid(bookId);
  if (isNaN(quantity)) throw Error("Invalid quantity");
  if (quantity <= 0) throw Error("Invalid quantity");
  // // step-2: find book by id
  let book: IBook | null = await Book.findById(bookId);

  // // step -3: Is book is null .then return
  if (!book) throw Error("Book Found null");
  // // step-4 : check copies
  if (book.copies >= quantity) {
    book.copies = book.copies - quantity;
    if (book.copies === 0) {
      book.available = false;
    }
    //   //step-5 modify actual book
    await Book.findByIdAndUpdate(bookId, book, {
      new: true,
      runValidators: true,
    });
  } else {
    throw Error("Insufficient Number of Copies");
  }
});

export const Borrow = model<IBorrow, BorrowStaticMethod>(
  "Borrow",
  borrowSchema
);
