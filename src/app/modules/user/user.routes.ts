import { Router } from "express";
import { userController } from "./user.controller";
import { createUserZodSchema, validateRequest } from "./user.validator";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userController.createUser
);

export const userRoutes = router;
