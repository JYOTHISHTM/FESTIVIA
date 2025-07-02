
export interface IUserService {
  getTicketsByUserId(userId: string, page: number, limit: number): Promise<any | null>;
  cancelTicketAndRefund(ticketId: string, userId: string): Promise<{ refundAmount: number }>;
  fetchLayoutAndEvent(layoutId: string): Promise<any>;
}
