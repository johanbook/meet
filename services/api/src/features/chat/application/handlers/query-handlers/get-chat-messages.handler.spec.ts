import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { createCurrentOrganizationServiceMock } from "src/core/organizations/test";
import { Profile } from "src/core/profiles";
import { beforeEach, describe, expect, it, vi } from "src/test";
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
    chatMessage.sender = sendingProfile;
    chatMessage.senderId = sendingProfile.id;

    chatMessages = createMockRepository<ChatMessage>([chatMessage]);

    const currentOrganizationService = createCurrentOrganizationServiceMock();

    const currentProfileService = {
      fetchCurrentProfileId: vi.fn(() => sendingProfile.id),
    } as any;

    const photoService = { getUrl: vi.fn() } as any;

    queryHandler = new GetChatMessagesHandler(
      chatMessages,
      currentOrganizationService,
      currentProfileService,
      photoService,
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
