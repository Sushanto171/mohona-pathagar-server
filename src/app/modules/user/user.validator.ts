import { NextFunction, Request, Response } from "express";
import z, { AnyZodObject } from "zod/v3";
import { IActive, Role } from "./user.interface";

export const validateRequest =
  (zodSchema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = zodSchema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };

export const createUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string format." })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  email: z
    .string({ invalid_type_error: "Email must be string format" })
    .email({ message: "Email must be email format" }),
  role: z
    .enum(Object.values(Role) as [string])
    .default(Role.USER)
    .optional(),
  password: z
    .string({ message: "Password must be string format." })
    .min(8, { message: "Password must be 8 characters longer" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),

  address: z.string({ message: "Address must be string format" }).optional(),
  isActive: z
    .enum(Object.values(IActive) as [string])
    .default(IActive.ACTIVE)
    .optional(),
  isDeleted: z.boolean().default(false).optional(),
  isVerified: z.boolean().default(false).optional(),
  phone: z
    .string({ invalid_type_error: "Phone must be string format" })
    .regex(/^(\+?88)?01[3-9]\d{8}$/, {
      message:
        "Phone must be valid for Bangladesh, Format: '+8801########' or 'o1#########' ",
    })
    .optional(),
  picture: z.string({ message: "Picture must string url" }).optional(),
});
