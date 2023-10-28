export class ChatMessageSentEvent {
  public readonly conversationId!: string;

  public readonly id!: number;

  public readonly message!: string;

  public readonly senderId!: number;
}
