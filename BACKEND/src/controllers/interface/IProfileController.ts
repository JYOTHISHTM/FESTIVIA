import { Request, Response } from "express";


export interface IProfileController {
  updateProfile(req: Request, res: Response): Promise<void>;
  getProfile(req: Request, res: Response): Promise<void>;
}
