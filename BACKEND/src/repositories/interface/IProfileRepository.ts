import { IUser } from "../../models/User";
import { ICreator } from "../../models/Creator";
import { UpdateQuery } from "mongoose";

export interface IProfileRepository {
  updateProfile(
    profileType: "user" | "creator",
    profileId: string,
    updatedData: UpdateQuery<IUser | ICreator>
  ): Promise<IUser | ICreator | null>;

  findById(
    id: string,
    type: "user" | "creator"
  ): Promise<IUser | ICreator | null>;
}
