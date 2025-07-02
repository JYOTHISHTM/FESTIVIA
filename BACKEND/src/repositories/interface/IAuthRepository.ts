
import { IUser } from "../../models/User";

export interface IAuthRepository {
  clearUserRefreshToken(userId: string): Promise<void>;
  clearCreatorRefreshToken(creatorId: string): Promise<void>;

  deleteOTP(email: string): Promise<void>;
  saveOTP(email: string, otp: string, expiresAt: Date): Promise<void>;

  updateRefreshToken(userId: string, refreshToken: string, type: "user" | "creator"): Promise<any>;

  findByRefreshToken(refreshToken: string, type: "user" | "creator"): Promise<any>;

  clearRefreshToken(userId: string, type: "user" | "creator"): Promise<void>;

  saveOtpToUser(email: string, otp: string, type: "user" | "creator"): Promise<any>;

  deleteByEmail(email: string, type: "user" | "creator"): Promise<any>;

  findUserByEmail(email: string, type: "user" | "creator"): Promise<any>;

  updatePasswordByType(email: string, hashedPassword: string, type: "user" | "creator"): Promise<any>;

  findByGoogleId(googleId: string): Promise<IUser | null>;

  findByEmail(email: string, type: string): Promise<any>;

  createUser(data: any): Promise<IUser>;
}
