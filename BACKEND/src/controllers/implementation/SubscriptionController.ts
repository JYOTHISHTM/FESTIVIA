import { Request, Response } from 'express';
import { ISubscriptionController } from '../interface/ISubscriptionController';
import { SubscriptionService } from '../../services/implementation/SubscriptionService';
import { SubscriptionRepository } from '../../repositories/implementation/SubscriptionRepository';
import { StatusCodes } from "../../enums/StatusCodes";

const subscriptionRepository = new SubscriptionRepository();
const subscriptionService = new SubscriptionService(subscriptionRepository);

export class SubscriptionController implements ISubscriptionController {

  async createSubscriptionCheckout(req: Request, res: Response): Promise<void> {
    try {
      const { creatorId, name } = req.body;
      const checkoutUrl = await subscriptionService.createCheckoutSession(creatorId, name);
      res.status(StatusCodes.OK).json({ url: checkoutUrl });
    } catch (error) {
      console.error('Stripe Checkout Error:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Stripe Checkout Error' });
    }
  }

  async buyUsingWallet(req: Request, res: Response): Promise<void> {
    try {
      const { creatorId, planName } = req.body;
      const subscription = await subscriptionService.buyUsingWallet(creatorId, planName);
      res.status(StatusCodes.OK).json({
        message: 'Subscription purchased using wallet',
        subscription
      });
    } catch (err: any) {
      console.error('Buy wallet error:', err.message);
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }

  async getCreatorSubscription(req: Request, res: Response): Promise<void> {
    try {
      const creatorId = (req as any).creator?.id;
      const subscription = await subscriptionService.fetchCreatorSubscription(creatorId);

      res.status(StatusCodes.OK).json(subscription || null);
    } catch (err) {
      console.error("Error fetching subscription:", err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching subscription' });
    }
  }

  async getAllSubscriptionPlan(req: Request, res: Response): Promise<Response> {
    try {
      const plans = await subscriptionService.getAllSubscriptionPlan();
      return res.status(StatusCodes.OK).json(plans);
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching subscription plans' });
    }
  }

  async getCreatorHistory(req: Request, res: Response): Promise<void> {
    try {
      const creatorId = (req as any).creator?.id;
      if (!creatorId) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Creator ID missing" });
        return;
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = 5;

      const { subscriptions, total } = await subscriptionService.getCreatorHistory(creatorId, page, limit);

      res.status(StatusCodes.OK).json({
        success: true,
        history: subscriptions,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      console.error("Error fetching creator history:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to fetch history.'
      });
    }
  }

  async getSubscriptionHistory(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const { subscriptions, totalCount } = await subscriptionService.getSubscriptionHistory(page, limit);

      res.status(StatusCodes.OK).json({
        success: true,
        history: subscriptions,
        totalCount,
      });
    } catch (error) {
      console.error("Error fetching subscription history:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Failed to fetch history.' });
    }
  }

  async expireSubscription(req: Request, res: Response): Promise<void> {
    try {
      const { creatorId } = req.params;
      await subscriptionService.expireSubscription(creatorId);
      res.status(StatusCodes.OK).json({ message: 'Subscription marked as expired' });
    } catch (err) {
      console.error('Expire subscription error:', err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  }
}
