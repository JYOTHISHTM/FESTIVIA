import { Types } from "mongoose";
import { IEvent } from "../../models/Event";

export interface IEventRepository {
  getEventsByLocation(latitude: number, longitude: number): Promise<IEvent[]>;

  getEventByIdForTicket(eventId: string): Promise<IEvent | null>;

  getHomeEvents(): Promise<IEvent[]>;

  getAllListedEvents(
    creatorId: string,
    page: number,
    limit: number
  ): Promise<IEvent[]>;

  getEventById(id: string): Promise<IEvent | null>;

  getAllEvents(
    filters: Record<string, any>,
    skip: number,
    limit: number
  ): Promise<IEvent[]>;

  countEvents(filters: Record<string, any>): Promise<number>;

  updateDescription(eventId: string, description: string): Promise<IEvent | null>;

  getEventType(): Promise<string[]>;

  toggleListingStatus(id: string): Promise<IEvent>;
}
