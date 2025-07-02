export interface IChatService {
  saveMessage(
    roomId: string,
    sender: string,
    message: string,
    userId?: string,
    creatorId?: string,
    mediaType?: string,
    mediaUrl?: string,
    mediaName?: string,
    mediaSize?: number,
    replyTo?: {
      messageId: string;
      message: string;
      sender: string;
      mediaType?: string;
      mediaName?: string;
    }
  ): Promise<any>; 

  getChatHistory(roomId: string): Promise<any[]>;

  getChatHistoryForCreator(roomId: string): Promise<any[]>;

  getChatsForUser(userId: string): Promise<any[]>;

  getChatsForCreator(creatorId: string): Promise<any[]>;

  getUsersWhoMessagedCreator(creatorId: string): Promise<any[]>;

}
