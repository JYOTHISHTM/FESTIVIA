import { Request, Response } from "express";

export interface IPasswordController {
  changePassword(req: Request, res: Response): Promise<Response>;
}
