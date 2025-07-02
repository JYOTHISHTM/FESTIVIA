import { Request, Response } from 'express';

export interface ITicketController {
  getUsersWhoBoughtTickets(req: Request, res: Response): Promise<void>;
  getTicketSummary(req: Request, res: Response): Promise<Response>;
}
