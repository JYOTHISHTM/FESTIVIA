import { IUser } from "../../models/User";

export interface IAuthService {
  login(email: string, password: string,role: "user" | "creator"): Promise<any>;

  register(
    name: string,
    email: string,
    password: string,
    role: "user" | "creator"
  ): Promise<{ email: string; message: string; role: string }>;

  verifyOTP(
    email: string,
    otp: string,
    userType: "user" | "creator"
  ): Promise<{ email: string; message: string }>;

  logoutUser(userId: string): Promise<void>;

  logoutCreator(creatorId: string): Promise<void>;

  logout(refreshToken: string): Promise<string>;

  resendOTP(email: string, type: "user" | "creator"): Promise<{ message: string }>;

  refreshAccessToken(
    refreshToken: string,
    type: "user" | "creator"
  ): Promise<string | null>;

  sendOtp(
    email: string,
    type: "user" | "creator"
  ): Promise<{ message: string; otp: string }>;

  verifyOtp(
    email: string,
    otp: string,
    type: "user" | "creator"
  ): Promise<boolean>;

  resetPassword(
    email: string,
    newPassword: string,
    type: "user" | "creator"
  ): Promise<string>;

  findOrCreate(profile: any): Promise<IUser | null>;
}
