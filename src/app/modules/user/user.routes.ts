import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { userController } from "./user.controller";
import { Role } from "./user.interface";
import {
  createUserZodSchema,
  updateUserZodSchema,
  validateRequest,
} from "./user.validator";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userController.createUser
);

router.patch(
  "/:id",
  checkAuth(...Object.values(Role)),
  validateRequest(updateUserZodSchema),
  userController.updateUser
);

export const userRoutes = router;
