import { ICreatorSubscription } from "../../models/CreatorSubscription";

export interface ISubscriptionService {
  createCheckoutSession(creatorId: string, name: string): Promise<string>;

  buyUsingWallet(creatorId: string, planName: string): Promise<any>;

  fetchCreatorSubscription(creatorId: string): Promise<any>;

  getAllSubscriptionPlan(): Promise<ICreatorSubscription[] | null>;

  getCreatorHistory(creatorId: string, page?: number, limit?: number): Promise<any>;

  getSubscriptionHistory(page?: number, limit?: number): Promise<any>;

  saveSubscription(data: any): Promise<any>;

  expireSubscription(creatorId: string): Promise<any>;
}
