import { Types } from "mongoose";
import { MessageDocument } from "../../models/Message";

export interface IChatRepository {
  saveMessage(messageData: {
    roomId: string;
    sender: string;
    message: string;
    userId?: string;
    creatorId?: string;
    mediaType?: string | null;
    mediaUrl?: string | null;
    mediaName?: string | null;
    mediaSize?: number | null;
    replyTo?: {
      messageId: string;
      message: string;
      sender: string;
      mediaType?: string;
      mediaName?: string;
    } | null;
  }): Promise<MessageDocument>;

  findMessageById(messageId: string): Promise<MessageDocument | null>;

  getMessagesByRoomId(roomId: string): Promise<MessageDocument[]>;

  getMessagesByRoomIdForCreator(roomId: string): Promise<MessageDocument[]>;

  getUniqueChats(userId: string): Promise<Array<{
    _id: Types.ObjectId;
    lastMessage: string;
    timestamp: Date;
    roomId: string;
    creatorName: string;
  }>>;

  getUniqueChatsForCreator(creatorId: string): Promise<Array<{
    _id: Types.ObjectId;
    lastMessage: string;
    timestamp: Date;
    roomId: string;
    nameFromUser?: string;
    nameFromCreator?: string;
    displayName?: string;
    creatorName?: string;
  }>>;

  getUniqueSendersForCreator(creatorId: string): Promise<string[]>;
}
