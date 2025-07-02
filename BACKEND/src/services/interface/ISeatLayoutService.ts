import { ISeatLayout, SeatLayoutDocument } from '../../models/SeatLayoutModel';

export interface ISeatLayoutService {
  createLayout(data: Omit<ISeatLayout, 'createdAt'>): Promise<SeatLayoutDocument>;

  getAllLayouts(): Promise<SeatLayoutDocument[]>;

  getLayoutsByCreatorId(creatorId: string): Promise<SeatLayoutDocument[]>;
}
