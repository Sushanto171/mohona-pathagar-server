import bcrypt from "bcryptjs";

export const generateHashPassword = async (
  plainPassword: string,
  saltRound: string | number
) => {
  const hashedPassword = await bcrypt.hash(plainPassword, Number(saltRound));
  return hashedPassword;
};

export const verifyPassword = async (
  enteredPassword: string,
  hashedPassword: string
) => {
  const verified = await bcrypt.compare(enteredPassword, hashedPassword);
  return verified;
};
