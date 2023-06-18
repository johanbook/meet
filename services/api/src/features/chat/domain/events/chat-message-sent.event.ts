export class ChatMessageSentEvent {
  public readonly id!: number;

  public readonly message!: string;

  public readonly receiverId!: number;

  public readonly senderId!: number;
}
