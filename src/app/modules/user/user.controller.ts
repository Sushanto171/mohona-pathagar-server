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



export const userController = {
  createUser,
};
