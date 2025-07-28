import { envVars } from "../config/envVars";
import { IUser } from "../modules/user/user.interface";
import { generateJwtToken } from "./jwt";

export const userToken = (Payload: Partial<IUser>) => {
  const jwtPayload = {
    userId: Payload._id,
    name: Payload.name,
    email: Payload.email,
    role: Payload.role,
  };
  const accessToken = generateJwtToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );
  const refreshToken = generateJwtToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );
  return {
    accessToken,
    refreshToken,
  };
};
