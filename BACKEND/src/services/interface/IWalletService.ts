// services/interface/IWalletService.ts
export interface IWalletService {
  addMoney(userId: string, amount: number): Promise<any>;
  bookTicketUsingWallet(userId: string, totalAmount: number, bookingDetails: any): Promise<any>;
  addMoneyToCreator(creatorId: string, amount: number): Promise<any>;
  getWallet(userId: string): Promise<any>;
  getWalletForCreator(creatorId: string): Promise<any>;
  createStripeSession(userId: string, amount: number): Promise<any>;
  createStripeSessionForCreator(creatorId: string, amount: number): Promise<any>;
}
