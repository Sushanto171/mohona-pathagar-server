"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const authSchema = new mongoose_1.Schema({
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
}, { versionKey: false, _id: false });
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    isActive: {
        type: String,
        enum: Object.values(user_interface_1.IActive),
        default: user_interface_1.IActive.ACTIVE,
    },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    role: { type: String, enum: Object.values(user_interface_1.Role), default: user_interface_1.Role.USER },
    auths: [authSchema],
    borrows: [{ type: mongoose_1.Types.ObjectId }],
    reviews: [{ type: mongoose_1.Types.ObjectId }],
}, { versionKey: false, timestamps: true });
exports.User = (0, mongoose_1.model)("user", userSchema);
