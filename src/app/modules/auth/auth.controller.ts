import httpStatus from "http-status-codes";
import { AppError } from "../../errorHelpers/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { setAuthCookie } from "../../utils/setAuthCookie";
import { AuthService } from "./auth.service";

const credentialLogin = catchAsync(async (req, res) => {
  const loginInfo = await AuthService.credentialLogin(req.body);
  setAuthCookie(res, loginInfo.token);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: loginInfo,
  });
});

const logout = catchAsync(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User log out successfully",
    data: null,
  });
});

const getNewAccessToken = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new AppError(httpStatus.NOT_FOUND, "no retrieved refresh token");
  }
  const tokenInfo = await AuthService.getNewAccessToken(refreshToken);
  setAuthCookie(res, tokenInfo);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User log out successfully",
    data: tokenInfo,
  });
});
export const AuthController = {
  credentialLogin,
  logout,
  getNewAccessToken,
};
