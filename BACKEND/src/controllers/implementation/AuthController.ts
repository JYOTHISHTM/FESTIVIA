import { Request, Response } from "express";
import { IAuthController } from "../interface/IAuthController";
import AuthService from "../../services/implementation/AuthService";
import { StatusCodes } from "../../enums/StatusCodes";
import { AuthMessages } from "../../enums/StatusCodes";

 class AuthController implements IAuthController {

async login(req: Request, res: Response): Promise<Response> {
  try {
    const { email, password, role } = req.body;
    const result = await AuthService.login(email, password, role);

    if (!result || result.status === "error") {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: result?.message || AuthMessages.INVALID_CREDENTIALS });
    }

    if (result.status === "pending" || result.status === "rejected") {
      return res.status(StatusCodes.FORBIDDEN).json({
        error: result.message,
        status: result.status,
        user: result.user 
      })
    }

    if (!result.token || !result.refreshToken || !result.user) {
      return res.status(500).json({ error: "Authentication error" });
    }

    const { token, refreshToken, user } = result;
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });

    if (role === "creator") {
      return res.json({ 
        token, 
        creator: { 
          id: user.id, 
          email: user.email, 
          name: user.name,
          status: user.status

        },
        status: result.status
      });
    }

    return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || AuthMessages.INTERNAL_SERVER_ERROR });
  }
}



async signUp(req: Request, res: Response): Promise<Response> {
  try {
    const { name, email, password, role } = req.body;

    if (role !== "user" && role !== "creator") {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, error:AuthMessages.INVALID_ROLE });
    }

    const result = await AuthService.register(name, email, password, role);

    return res.status(StatusCodes.CREATED).json({ success: true, message: result.message, data: result }); 
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, error: (error as Error).message });
  }
}
    
async verifyOTP(req: Request, res: Response): Promise<void> {
  try {
    const { email, otp, userType } = req.body; 

    if (!["user", "creator"].includes(userType)) {
       res.status(StatusCodes.BAD_REQUEST).json({ success: false, error:AuthMessages.INVALID_USER_TYPE });
    }

    const result = await AuthService.verifyOTP(email, otp, userType);
    res.status(StatusCodes.OK).json({ success: true, message: result.message, data: result });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ success: false, error: (error as Error).message });
  }
}

async logout(req: Request, res: Response): Promise<Response> {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error:AuthMessages.NO_REFRESH_TOKEN });
    }

    const message = await AuthService.logout(refreshToken);
    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "strict" });

    return res.status(StatusCodes.OK).json({ message });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message || AuthMessages.INTERNAL_SERVER_ERROR });
  }
}

async resendOTP(req: Request, res: Response): Promise<Response> {
  try {
    const { email, type } = req.body;


    if (!email || !type || (type !== "user" && type !== "creator")) {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message:AuthMessages.INVALID_REQUEST_DATA });
    }

    const result = await AuthService.resendOTP(email, type);

    return res.status(StatusCodes.OK).json({ success: true, message: result.message });
  } catch (error: any) {
    console.error("❌ Error in resendOTP:", error);
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, error: error.message });
  }
}

  async refreshToken(req: Request, res: Response): Promise<Response> {
    try {
      const { refreshToken } = req.cookies;
      const { type } = req.body; 

      if (!refreshToken || !type) {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
      }

      const newAccessToken = await AuthService.refreshAccessToken(refreshToken, type);

      if (!newAccessToken) {
        res.clearCookie("refreshToken");
        return res.sendStatus(StatusCodes.FORBIDDEN);
      }

      return res.json({ token: newAccessToken });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error:AuthMessages.INTERNAL_SERVER_ERROR });
    }
  }

  async sendOtp(req: Request, res: Response): Promise<void> {
    const { email ,type} = req.body;
    try {
      const result = await AuthService.sendOtp(email,type);
      res.status(StatusCodes.OK).json({
        success: true,
        message: result.message,
        otp: result.otp, 
      }); 
    } catch (err: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });
    }
  }
  
  async verifyOtp(req: Request, res: Response) {
    try {
      const { email, otp, type } = req.body;
      if (!type) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: AuthMessages.INVALID_ROLE });
      }
        const isValid = await AuthService.verifyOtp(email, otp, type);
      if (!isValid) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: AuthMessages.INVALID_OTP});
      }
  
      return res.status(StatusCodes.OK).json({ message: AuthMessages.OTP_VERIFIED_SUCCESSFULLY });
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: AuthMessages.INTERNAL_SERVER_ERROR});
    }
  }
  
  async resetPassword(req: Request, res: Response) {
    try {
      const { email, password, type } = req.body;      
      const result = await AuthService.resetPassword(email, password, type);
      res.status(StatusCodes.OK).json({ success: true, message: result });
    } catch (err: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });
    }
  }


  async googleCallback(req: Request, res: Response): Promise<Response> {
    const user = req.user as {id:string;type:string}
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: AuthMessages.GOOGLE_AUTH_FAILED });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      user,
      message: `Logged in successfully as ${user.type}`,
    });
  }
  
}

export default  AuthController;
