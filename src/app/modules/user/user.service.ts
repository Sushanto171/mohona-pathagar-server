import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/envVars";
import { AppError } from "../../errorHelpers/AppError";
import { generateHashPassword } from "../../utils/bcrypt";
import { IUser, Role } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  payload.password = await generateHashPassword(
    payload.password as string,
    envVars.BCRYPT_SALT_ROUND
  );
  payload.auths = [
    {
      provider: "Credential",
      providerId: payload.email as string,
    },
  ];
  const user = await User.create(payload);
  return user;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>,
  decoded: JwtPayload
) => {
  const isUserExist = await User.findOne({ email: decoded.email });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (decoded.role === Role.USER) {
    if (payload.isActive || payload.isDeleted || payload.isVerified) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User are unauthorized.");
    }
  }

  if (payload.role) {
    if (decoded.role === Role.USER) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User are unauthorized.");
    }
    if (decoded.role === Role.ADMIN && payload.role === Role.SUPER_ADMIN) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User are unauthorized.");
    }
  }
  if (payload.password) {
    payload.password = await generateHashPassword(
      payload.password as string,
      envVars.BCRYPT_SALT_ROUND
    );
  }
  const user = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select("-password");

  return user;
};

export const userService = {
  createUser,
  updateUser,
};
