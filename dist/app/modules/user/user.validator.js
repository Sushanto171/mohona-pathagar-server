"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserZodSchema = exports.validateRequest = void 0;
const v3_1 = __importDefault(require("zod/v3"));
const user_interface_1 = require("./user.interface");
const validateRequest = (zodSchema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield zodSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.validateRequest = validateRequest;
exports.createUserZodSchema = v3_1.default.object({
    name: v3_1.default
        .string({ invalid_type_error: "Name must be string format." })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters" }),
    email: v3_1.default
        .string({ invalid_type_error: "Email must be string format" })
        .email({ message: "Email must be email format" }),
    role: v3_1.default
        .enum(Object.values(user_interface_1.Role))
        .default(user_interface_1.Role.USER)
        .optional(),
    password: v3_1.default
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
    address: v3_1.default.string({ message: "Address must be string format" }).optional(),
    isActive: v3_1.default
        .enum(Object.values(user_interface_1.IActive))
        .default(user_interface_1.IActive.ACTIVE)
        .optional(),
    isDeleted: v3_1.default.boolean().default(false).optional(),
    isVerified: v3_1.default.boolean().default(false).optional(),
    phone: v3_1.default
        .string({ invalid_type_error: "Phone must be string format" })
        .regex(/^(\+?88)?01[3-9]\d{8}$/, {
        message: "Phone must be valid for Bangladesh, Format: '+8801########' or 'o1#########' ",
    })
        .optional(),
    picture: v3_1.default.string({ message: "Picture must string ulr" }).optional(),
});
