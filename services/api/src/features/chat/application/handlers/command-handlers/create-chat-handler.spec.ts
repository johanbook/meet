import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { TestSuite } from "src/test";
import { createMockRepository } from "src/test/mocks";

import { ChatConversationService } from "../../../domain/services/chat-conversation.service";
import { ChatConversation } from "../../../infrastructure/entities/chat-conversation.entity";
import { CreateChatCommand } from "../../contracts/commands/create-chat.command";
import { CreateChatHandler } from "./create-chat-handler";

describe(CreateChatHandler.name, () => {
  let chatConversations: Repository<ChatConversation>;

  let chatConversationService: ChatConversationService;
  let commandHandler: CreateChatHandler;
  let testSuite: TestSuite;

  beforeEach(() => {
    testSuite = new TestSuite();

    chatConversations = createMockRepository<ChatConversation>();

    chatConversationService = new ChatConversationService(
      chatConversations,
      testSuite.eventBus,
    );

    commandHandler = new CreateChatHandler(
      chatConversationService,
      testSuite.currentOrganizationService,
      testSuite.currentProfileService,
    );
  });

  describe("execute", () => {
    it("should save new conversation", async () => {
      const { profileId } = await testSuite.createProfile();
      testSuite.addProfileToCurrentOrganization(profileId);

      const command = map(CreateChatCommand, { profileIds: [profileId] });

      await commandHandler.execute(command);

      const savedConversations = await chatConversations.find();
      expect(savedConversations).toHaveLength(1);

      const conversation = savedConversations[0];
      expect(conversation.members).toHaveLength(2);
      expect(conversation.members[0].profileId).toBe("my-profile-id");
      expect(conversation.members[1].profileId).toBe(profileId);
    });

    it("should throw if profiles not part of organization", async () => {
      const command = map(CreateChatCommand, {
        profileIds: [100],
      });

      await expect(commandHandler.execute(command)).rejects.toHaveProperty(
        "message",
        "Profile not found in current organization",
      );
    });

    it("should throw if trying to add current profile twice", async () => {
      const command = map(CreateChatCommand, {
        profileIds: ["my-profile-id" as unknown as number],
      });

      await expect(commandHandler.execute(command)).rejects.toHaveProperty(
        "message",
        "Cannot add current profile twice to chat",
      );
    });
  });
});
