import { envVars } from "../../config/envVars";
import { generateHashPassword } from "../../utils/bcrypt";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  payload.password = await generateHashPassword(
    payload.password as string,
    envVars.BCRYPT_SALT_ROUND
  );
  const user = await User.create(payload);
  return user;
};

export const userService = {
  createUser,
};
