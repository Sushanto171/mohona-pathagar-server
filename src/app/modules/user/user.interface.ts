import { Types } from "mongoose";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IAuthProvider {
  provider: "Credential" | "google";
  providerId: string;
}

export enum IActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isActive?: IActive;
  isVerified?: boolean;
  isDeleted?: boolean;
  role: Role;
  auths: [IAuthProvider];
  borrows?: [Types.ObjectId];
  reviews?: [Types.ObjectId];
}
