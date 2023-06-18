import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { createMockRepository } from "src/test/mocks/repository.mock";
import { createUserIdServiceMock } from "src/test/mocks/user-id.service.mock";
import { map } from "src/utils/mapper";

import { ChatMessage } from "../../../infrastructure/entities/chat-message.entity";
import { GetChatMessagesQuery } from "../../contracts/queries/get-chat-messages.query";
import { GetChatMessagesHandler } from "./get-chat-messages.handler";

describe(GetChatMessagesHandler.name, () => {
  let chatMessages: Repository<ChatMessage>;
  let profiles: Repository<Profile>;
  let userIdService: UserIdService;

  let receivingProfile: Profile;
  let sendingProfile: Profile;

  let queryHandler: GetChatMessagesHandler;

  beforeEach(() => {
    receivingProfile = new Profile();
    receivingProfile.id = 2;

    sendingProfile = new Profile();
    sendingProfile.id = 1;

    profiles = createMockRepository<Profile>([
      receivingProfile,
      sendingProfile,
    ]);

    const chatMessage = new ChatMessage();
    chatMessage.receiverId = receivingProfile.id;
    chatMessage.senderId = sendingProfile.id;

    chatMessages = createMockRepository<ChatMessage>([chatMessage]);

    userIdService = createUserIdServiceMock(sendingProfile.id);

    queryHandler = new GetChatMessagesHandler(
      chatMessages,
      profiles,
      userIdService,
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
