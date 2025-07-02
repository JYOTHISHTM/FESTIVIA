import { ISeatLayout, SeatLayoutDocument } from "../../models/SeatLayoutModel";

export interface ISeatLayoutRepository {
  save(layout: ISeatLayout): Promise<SeatLayoutDocument>;

  findAll(): Promise<SeatLayoutDocument[]>;
}
