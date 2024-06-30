import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { createCurrentOrganizationServiceMock } from "src/core/organizations/test";
import { Profile } from "src/core/profiles";
import { createMockRepository } from "src/test/mocks";

import { ChatConversation } from "../../../infrastructure/entities/chat-conversation.entity";
import { ChatMessage } from "../../../infrastructure/entities/chat-message.entity";
import { GetChatMessagesQuery } from "../../contracts/queries/get-chat-messages.query";
import { GetChatMessagesHandler } from "./get-chat-messages.handler";

describe(GetChatMessagesHandler.name, () => {
  let chatMessages: Repository<ChatMessage>;

  let sendingProfile: Profile;

  let queryHandler: GetChatMessagesHandler;

  beforeEach(() => {
    sendingProfile = new Profile();
    sendingProfile.id = 1;

    const conversation = new ChatConversation();

    const chatMessage = new ChatMessage();
    chatMessage.conversationId = conversation.id;
    chatMessage.senderId = sendingProfile.id;

    chatMessages = createMockRepository<ChatMessage>([chatMessage]);

    const currentOrganizationService = createCurrentOrganizationServiceMock();

    const currentProfileService = {
      fetchCurrentProfileId: jest.fn(() => sendingProfile.id),
    } as any;

    queryHandler = new GetChatMessagesHandler(
      chatMessages,
      currentOrganizationService,
      currentProfileService,
    );
  });

  describe("execute", () => {
    it("should return chat messages", async () => {
      const query = map(GetChatMessagesQuery, {
        conversationId: "1",
      });

      const result = await queryHandler.execute(query);

      expect(result).toHaveLength(1);
    });
  });
});
