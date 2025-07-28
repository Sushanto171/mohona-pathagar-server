// book (objectId) — Mandatory. References the borrowed book’s ID.
// quantity (number) — Mandatory. Positive integer representing the number of copies borrowed.
// dueDate (date) — Mandatory. The date by which the book must be returned.

import { Model, Schema } from "mongoose";

export interface IBorrow {
  book: Schema.Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export interface BorrowStaticMethod extends Model<IBorrow>{
  checkCopies(bookId :string,quantity: number): void
}