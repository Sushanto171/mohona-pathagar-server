import { model, Schema, Types } from "mongoose";
import { IActive, IAuthProvider, IUser, Role } from "./user.interface";

const authSchema = new Schema<IAuthProvider>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  { versionKey: false, _id: false }
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    isActive: {
      type: String,
      enum: Object.values(IActive),
      default: IActive.ACTIVE,
    },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    auths: [authSchema],
    borrows: [{ type: Types.ObjectId }],
    reviews: [{ type: Types.ObjectId }],
  },
  { versionKey: false, timestamps: true }
);

export const User = model<IUser>("user", userSchema);
