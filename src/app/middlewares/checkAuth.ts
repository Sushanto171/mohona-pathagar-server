import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/envVars";
import { AppError } from "../errorHelpers/AppError";
import { User } from "../modules/user/user.model";
import { verifyJwtToken } from "../utils/jwt";
export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        throw new AppError(httpStatus.NOT_FOUND, "No access token retrieved");
      }
      const isVerified = verifyJwtToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;
      const isUserExist = await User.findById(isVerified.userId);
      if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User does not exist.");
      }

      if (!authRoles.includes(isUserExist.role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You are not permitted this route."
        );
      }
      req.user = isVerified;
      next();
    } catch (error) {
      next(error);
    }
  };
