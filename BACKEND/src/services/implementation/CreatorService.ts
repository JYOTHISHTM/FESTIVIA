import { ICreatorService } from "../interface/ICreatorService";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { IEvent } from "../../models/Event";
import CreatorRepository from "../../repositories/implementation/CreatorRepository";



dotenv.config();

class CreatorService implements ICreatorService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }


  async getReservedEventsByCreator(layoutId: string) {
    return CreatorRepository.findReservedEventsByCreator(layoutId);
  }


  async getCreator(creatorId: string): Promise<any> {
    return await CreatorRepository.findById(creatorId);
  }
 
  async createEvent(eventData: Partial<IEvent>) {
    const event = await CreatorRepository.createEvent(eventData);
    return event;
  }


}

export default new CreatorService();
