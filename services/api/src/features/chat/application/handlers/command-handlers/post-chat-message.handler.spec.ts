import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { beforeEach, describe, expect, it } from "src/test";
import { TestSuite } from "src/test";
import { createMockRepository } from "src/test/mocks";

import { ChatMessageService } from "../../../domain/services/chat-message.service";
import { ChatConversation } from "../../../infrastructure/entities/chat-conversation.entity";
import { ChatMessage } from "../../../infrastructure/entities/chat-message.entity";
import { PostChatMessageCommand } from "../../contracts/commands/post-chat-message.command";
import { PostChatMessageHandler } from "./post-chat-message.handler";

describe(PostChatMessageHandler.name, () => {
  let chatConversations: Repository<ChatConversation>;
  let chatMessages: Repository<ChatMessage>;

  let chatMessageService: ChatMessageService;
  let commandHandler: PostChatMessageHandler;
  let testSuite: TestSuite;

  beforeEach(() => {
    testSuite = new TestSuite();

    chatConversations = createMockRepository<ChatConversation>();
    chatMessages = createMockRepository<ChatMessage>();

    chatMessageService = new ChatMessageService(
      testSuite.eventBus,
      chatMessages,
    );

    commandHandler = new PostChatMessageHandler(
      chatConversations,
      chatMessageService,
      testSuite.currentProfileService,
    );
  });

  describe("execute", () => {
    it("should post new chat message", async () => {
      chatConversations.save({} as unknown as ChatConversation);

      const chatMessage = {
        chatConversationId: "my-conversation-id",
        message: "my-message",
        profileId: 2,
      };

      const command = map(PostChatMessageCommand, chatMessage);

      await commandHandler.execute(command);

      const storedMessages = await chatMessages.find();
      expect(storedMessages).toHaveLength(1);
      expect(storedMessages[0].message).toBe(command.message);
    });

    it("should throw if conversation not found", async () => {
      const chatMessage = {
        chatConversationId: "my-conversation-id",
        message: "my-message",
        profileId: 2,
      };

      const command = map(PostChatMessageCommand, chatMessage);

      await expect(commandHandler.execute(command)).rejects.toHaveProperty(
        "message",
        "Chat conversation not found",
      );
    });
  });
});
