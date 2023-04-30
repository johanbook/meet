import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { ChatMessage } from "src/infrastructure/database/entities/chat-message.entity";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { createMapperServiceMock } from "src/test/mocks/mapper.service.mock";
import { createMockRepository } from "src/test/mocks/repository.mock";
import { createUserIdServiceMock } from "src/test/mocks/user-id.service.mock";
import { MapperService } from "src/utils/mapper/mapper.service";

import { GetChatMessagesQuery } from "../contracts/get-chat-messages.query";
import { GetChatMessagesHandler } from "./get-chat-messages.handler";

describe(GetChatMessagesHandler.name, () => {
  let chatMessages: Repository<ChatMessage>;
  let profiles: Repository<Profile>;

  let mapperService: MapperService;
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

    mapperService = createMapperServiceMock();
    userIdService = createUserIdServiceMock(sendingProfile.id);

    queryHandler = new GetChatMessagesHandler(
      chatMessages,
      mapperService,
      profiles,
      userIdService,
    );
  });

  describe("execute", () => {
    it("should return chat messages", async () => {
      const query = new GetChatMessagesQuery(receivingProfile.id);

      const result = await queryHandler.execute(query);

      expect(result).toHaveLength(1);
    });
  });
});
