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
exports.getBorrowsSummery = exports.createBorrow = void 0;
const borrow_model_1 = require("./borrow.model");
const createBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        yield borrow_model_1.Borrow.checkCopies(body.book, parseInt(body.quantity));
        const borrow = yield borrow_model_1.Borrow.create(body);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.createBorrow = createBorrow;
const getBorrowsSummery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrows = yield borrow_model_1.Borrow.aggregate([
            {
                $sort: { createdAt: -1 },
            },
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                    book: { $first: "$book" },
                    latestAddBorrow: { $first: "$createdAt" },
                },
            },
            {
                $lookup: {
                    as: "book",
                    from: "books",
                    localField: "book",
                    foreignField: "_id",
                },
            },
            {
                $unwind: "$book",
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    latestAddBorrow: 1,
                    book: {
                        _id: 1,
                        title: 1,
                        isbn: 1,
                    },
                },
            },
            {
                $sort: { latestAddBorrow: -1 },
            },
        ]);
        res.status(borrows ? 200 : 404).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrows,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.getBorrowsSummery = getBorrowsSummery;
