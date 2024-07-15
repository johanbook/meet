import { ChatMessageProfileDetails } from "./chat-message-profile.dto";

export class ChatConversationDetails {
  createdAt!: Date;
  id!: string;
  imageUrl?: string;
  lastMessage?: string;
  lastMessageSent?: Date;
  name!: string;
  profiles!: ChatMessageProfileDetails[];
}
