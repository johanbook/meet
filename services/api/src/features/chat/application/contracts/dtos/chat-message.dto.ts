import { ChatMessageProfileDetails } from "./chat-message-profile.dto";

export class ChatMessageDetails {
  id!: number;
  message!: string;
  profile!: ChatMessageProfileDetails;
  sentByCurrentUser!: boolean;
  read!: boolean;
}
