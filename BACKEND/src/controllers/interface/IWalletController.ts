import { Request, Response } from "express";

export interface IWalletController {
  addMoney(req: Request, res: Response): Promise<Response>;
  bookTicketWithWalletController(req: Request, res: Response): Promise<Response>;
  createCheckoutSession(req: Request, res: Response): Promise<Response>;
  addMoneyToCreator(req: Request, res: Response): Promise<Response>;
  getWallet(req: Request, res: Response): Promise<Response>;
  getWalletForCreator(req: Request, res: Response): Promise<Response>;
}
