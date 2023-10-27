import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { Profile } from "src/features/profiles";
import { createMockRepository } from "src/test/mocks";

import { ChatMessage } from "../../../infrastructure/entities/chat-message.entity";
import { GetChatMessagesQuery } from "../../contracts/queries/get-chat-messages.query";
import { GetChatMessagesHandler } from "./get-chat-messages.handler";

describe(GetChatMessagesHandler.name, () => {
  let chatMessages: Repository<ChatMessage>;

  let receivingProfile: Profile;
  let sendingProfile: Profile;

  let queryHandler: GetChatMessagesHandler;

  beforeEach(() => {
    sendingProfile = new Profile();
    sendingProfile.id = 1;

    const chatMessage = new ChatMessage();
    chatMessage.senderId = sendingProfile.id;

    chatMessages = createMockRepository<ChatMessage>([chatMessage]);

    const currentProfileService = {
      fetchCurrentProfileId: jest.fn(() => sendingProfile.id),
    } as any;

    queryHandler = new GetChatMessagesHandler(
      chatMessages,
      currentProfileService,
    );
  });

  describe("execute", () => {
    it("should return chat messages", async () => {
      const query = map(GetChatMessagesQuery, {
        profileId: receivingProfile.id,
      });

      const result = await queryHandler.execute(query);

      expect(result).toHaveLength(1);
    });
  });
});
