"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const user_validator_1 = require("./user.validator");
const router = (0, express_1.Router)();
router.post("/register", (0, user_validator_1.validateRequest)(user_validator_1.createUserZodSchema), user_controller_1.userController.createUser);
exports.userRoutes = router;
