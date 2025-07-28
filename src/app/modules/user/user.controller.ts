import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Users register successfully",
    data: user,
    success: true,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const decoded = req.user;
  const user = await userService.updateUser(id, req.body, decoded);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Users updated successfully",
    data: user,
    success: true,
  });
});

export const userController = {
  createUser,
  updateUser,
};
