import { IEvent } from "../../models/Event";

export interface ICreatorService {
  createEvent(eventData: Partial<IEvent>): Promise<IEvent>;
  getCreator(creatorId: string): Promise<any>;
  getReservedEventsByCreator(creatorId: string): Promise<any>;
}
