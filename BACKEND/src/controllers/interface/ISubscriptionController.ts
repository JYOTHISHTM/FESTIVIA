import { Request, Response } from 'express';

export interface ISubscriptionController {
  createSubscriptionCheckout(req: Request, res: Response): Promise<void>;
  buyUsingWallet(req: Request, res: Response): Promise<void>;
  getCreatorSubscription(req: Request, res: Response): Promise<void>;
  getAllSubscriptionPlan(req: Request, res: Response): Promise<Response>;
  getCreatorHistory(req: Request, res: Response): Promise<void>;
  getSubscriptionHistory(req: Request, res: Response): Promise<void>;
  expireSubscription(req: Request, res: Response): Promise<void>;
}
