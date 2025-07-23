import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { borrowService } from "./borrow.service";

export const createBorrow = catchAsync(async (req, res) => {
  const borrow = await borrowService.createBorrow(req);
  sendResponse(res, {
    success: true,
    message: "Book borrowed successfully",
    data: borrow,
    statusCode: 201,
  });
});

export const getBorrowsSummery = catchAsync(async (req, res) => {
  const borrows = await borrowService.getBorrowsSummery(req);
  sendResponse(res, {
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: borrows,
    statusCode: 200,
  });
});
