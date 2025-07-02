import { Request, Response } from "express";

export interface ISeatLayoutController {
  createLayout(req: Request, res: Response): Promise<void>;
  getLayouts(req: Request, res: Response): Promise<void>;
  getLayoutsByCreatorId(req: Request, res: Response): Promise<void>;
}
