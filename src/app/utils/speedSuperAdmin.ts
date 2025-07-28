/* eslint-disable no-console */
import { envVars } from "../config/envVars";
import { IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { generateHashPassword } from "./bcrypt";

export const createSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });

    if (isSuperAdminExist) {
      return console.log("Super Admin already exist");
    }

    const hashedPass = await generateHashPassword(
      envVars.SUPER_ADMIN_PASSWORD,
      envVars.BCRYPT_SALT_ROUND
    );

    const payload: IUser = {
      name: "Super Admin",
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hashedPass,
      isVerified: true,
      role: Role.SUPER_ADMIN,
      auths: [
        {
          provider: "Credential",
          providerId: envVars.SUPER_ADMIN_EMAIL,
        },
      ],
    };
    const superAdmin = await User.create(payload);
    return superAdmin;
  } catch (error) {
    console.log(error);
  }
};
