import SeatLayoutModel, { ISeatLayout, SeatLayoutDocument } from '../../models/SeatLayoutModel';
import { ISeatLayoutRepository } from '../interface/ISeatLayoutRepository';
export class SeatLayoutRepository implements ISeatLayoutRepository {
  async save(layout: ISeatLayout): Promise<SeatLayoutDocument> {
  return await SeatLayoutModel.create(layout);
}

  async findAll(): Promise<SeatLayoutDocument[]> {
    return await SeatLayoutModel.find();
  }
}
