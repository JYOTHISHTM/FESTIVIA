
export interface IEventService {
    getEventById(id: string): Promise<any>;
    getUser(userId: string): Promise<any>;
    getAllEvents(filters: any, skip: number, limit: number): Promise<any>;
    fetchEventsForUserLocation(latitude: number, longitude: number): Promise<any>;
    updateLocation(userId: string, location: string, latitude: number,longitude:number): Promise<any>;
    getAllListedEvents(creatorId: string, page: number, limit: number): Promise<any>;
  }
  