import { ICreatorSubscription } from "../../models/CreatorSubscription";

export interface ISubscriptionRepository {
  buySubscriptionUsingWallet(
    creatorId: string,
    planName: string
  ): Promise<ICreatorSubscription>;

  saveCustomerSubscription(
    customerId: string,
    subscriptionId: string
  ): Promise<{ customerId: string; subscriptionId: string }>;

  getSubscriptionByCreatorId(
    creatorId: string
  ): Promise<ICreatorSubscription | null>;

  getAllSubscriptionPlan(): Promise<ICreatorSubscription[] | null>;

  getSubscriptionsByCreatorId(
    creatorId: string,
    page?: number,
    limit?: number
  ): Promise<{ subscriptions: ICreatorSubscription[]; total: number }>;

  getSubscriptionsForAdmin(
    page?: number,
    limit?: number
  ): Promise<{ subscriptions: ICreatorSubscription[]; totalCount: number }>;

  createSubscription(data: any): Promise<ICreatorSubscription>;

  setSubscriptionExpired(
    creatorId: string
  ): Promise<ICreatorSubscription | null>;
}
