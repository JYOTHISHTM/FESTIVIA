import { Request, Response } from 'express';
import { PasswordRepository } from '../../repositories/implementation/PasswordRepository';
import { PasswordService } from '../../services/implementation/PasswordService';
import { StatusCodes } from "../../enums/StatusCodes";
import { IPasswordController } from '../interface/IPasswordController';
const passwordRepo = new PasswordRepository();
const passwordService = new PasswordService(passwordRepo);

interface User {
  id: string;
}

declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}



class PasswordController implements IPasswordController {
  async changePassword(req: Request, res: Response):Promise<Response> {
    try {
      const { currentPassword, newPassword } = req.body;

      const userId = (req.user as any)?.id;
      if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
      }

      await passwordService.changePassword(userId, currentPassword, newPassword);

     return res.status(StatusCodes.OK).json({
  success: true,
  data: { message: 'Password changed successfully' }
});

    } catch (error: any) {
      console.error(" Password change error:", error);
      console.error(" Error stack:", error.stack);
    return  res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  }


}

export default PasswordController