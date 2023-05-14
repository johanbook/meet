import { ChatMessageDetails } from "src/api";

export function createChatMessageMock(
  message?: Partial<ChatMessageDetails>
): ChatMessageDetails {
  return {
    id: 1,
    message: "my-message",
    read: true,
    sentByCurrentUser: false,
    ...message,
  };
}

export function createChatMessagesMock(length: number): ChatMessageDetails[] {
  const messages: ChatMessageDetails[] = [];

  for (let index = 0; index < length; index++) {
    messages.push(
      createChatMessageMock({ id: index, message: `message-${index + 1}` })
    );
  }

  return messages;
}
