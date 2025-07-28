import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/envVars";
import { AppError } from "../../errorHelpers/AppError";
import { verifyPassword } from "../../utils/bcrypt";
import { generateJwtToken, verifyJwtToken } from "../../utils/jwt";
import { userToken } from "../../utils/userToken";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist.");
  }

  const isMatch = await verifyPassword(
    password as string,
    isUserExist.password as string
  );

  if (!isMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password does not match.");
  }

  const token = userToken(isUserExist);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pass, ...rest } = isUserExist.toObject();

  return {
    token,
    user: rest,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const isVerifyToken = verifyJwtToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;

  if (!isVerifyToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token is invalid");
  }
  
  const isUserExist = await User.findById(isVerifyToken.userId);

  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist");
  }
  const jwtPayload = {
    userId: isUserExist._id,
    name: isUserExist.name,
    email: isUserExist.email,
    role: isUserExist.role,
  };
  const newAccessToken = generateJwtToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );
  return {
    accessToken: newAccessToken,
  };
};
export const AuthService = {
  credentialLogin,
  getNewAccessToken,
};
