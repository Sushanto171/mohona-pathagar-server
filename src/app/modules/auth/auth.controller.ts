import httpStatus from "http-status-codes";
import { envVars } from "../../config/envVars";
import { AppError } from "../../errorHelpers/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { setAuthCookie } from "../../utils/setAuthCookie";
import { userToken } from "../../utils/userToken";
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
const googleCallbackController = catchAsync(async (req, res) => {
  let redirectTo = (req.query.state as string) || "";
  const user = req.user;
  if (redirectTo.startsWith("/")) {
    redirectTo = redirectTo.slice(1);
  }
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User dose not found");
  }
  const loginInfo = userToken(user);
  setAuthCookie(res, loginInfo);
  // sendResponse(res, {
  //   success: true,
  //   statusCode: httpStatus.OK,
  //   message: "User logged in successfully",
  //   data: user,
  // });
  res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);
});
export const AuthController = {
  credentialLogin,
  logout,
  getNewAccessToken,
  googleCallbackController,
};
