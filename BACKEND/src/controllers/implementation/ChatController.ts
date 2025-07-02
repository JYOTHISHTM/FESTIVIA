import { Request, Response } from "express";
import { ChatService } from "../../services/implementation/ChatService";
import { ChatRepository } from "../../repositories/implementation/ChatRepository";
import { StatusCodes } from "../../enums/StatusCodes";
import { IChatController } from "../interface/IChatController";
import { ChatMessages } from "../../enums/StatusCodes";

const chatService = new ChatService(new ChatRepository());

export class ChatController implements IChatController {

  async getChatHistory(req: Request, res: Response) {
  const { roomId } = req.params;
  try {
    const messages = await chatService.getChatHistory(roomId);
    res.json(messages);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: ChatMessages.FAILED_TO_FETCH_MESSAGES});
  }
}

  async getChatHistoryForCreator(req: Request, res: Response) {
  const { roomId } = req.params;
  try {
    const messages = await chatService.getChatHistoryForCreator(roomId);
    res.json(messages);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: ChatMessages.FAILED_TO_FETCH_MESSAGES});
  }
}

  async getChatsForUser(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const chats = await chatService.getChatsForUser(userId);
      res.json(chats);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: ChatMessages.FAILED_TO_FETCH_CHATS });
    }
  }

  async getChatsForCreator(req: Request, res: Response) {
    const { creatorId } = req.params;    
    try {
      const chats = await chatService.getChatsForCreator(creatorId);
      res.json(chats);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: ChatMessages.FAILED_TO_FETCH_CHATS });
    }
  }


  async initiateChat(req: Request, res: Response) {
    const { userId, creatorId } = req.body;
    if (!userId || !creatorId) {
      return res.status(400).json({ error: ChatMessages.MISSING_USER_OR_CREATOR_ID });
    }
    try {
      const roomId = ChatService.generateRoomId(userId, creatorId);
      res.json({ roomId });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: ChatMessages.FAILED_TO_INITIATE_CHAT });
    }
  }

  async getUsersWhoMessagedCreator(req: Request, res: Response)  {
    try {
      const creatorId = req.params.creatorId;
      const users = await chatService.getUsersWhoMessagedCreator(creatorId);
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ChatMessages.SERVER_ERROR });
    }
  }


}