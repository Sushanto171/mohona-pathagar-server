import { Model } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  genre: "FICTION"    | "NON_FICTION"    | "SCIENCE"    | "HISTORY"    | "BIOGRAPHY"    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}


export interface BookStaticMethod extends Model<IBook> {
  _idIsValid(_id:string): string
}