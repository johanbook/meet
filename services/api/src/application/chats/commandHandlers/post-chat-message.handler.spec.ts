import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { ChatMessageDomainService } from "src/domain/chatMessages/services/chat-message-domain.service";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { createMockRepository } from "src/test/mocks/repository.mock";
import { createUserIdServiceMock } from "src/test/mocks/user-id.service.mock";
import { map } from "src/utils/mapper";

import { PostChatMessageCommand } from "../contracts/post-chat-message.command";
import { PostChatMessageHandler } from "./post-chat-message.handler";

describe(PostChatMessageHandler.name, () => {
  let chatMessageDomainService: ChatMessageDomainService;
  let profiles: Repository<Profile>;
  let userIdService: UserIdService;

  let mockProfile: Profile;

  let commandHandler: PostChatMessageHandler;

  beforeEach(() => {
    chatMessageDomainService = { saveChatMessage: jest.fn() } as any;

    mockProfile = new Profile();
    mockProfile.id = 1;

    profiles = createMockRepository<Profile>([mockProfile]);
    userIdService = createUserIdServiceMock();

    commandHandler = new PostChatMessageHandler(
      chatMessageDomainService,
      profiles,
      userIdService,
    );
  });

  describe("execute", () => {
    it("should post new chat message", async () => {
      const chatMessage = {
        message: "my-message",
        profileId: 2,
      };

      const command = map(PostChatMessageCommand, chatMessage);

      await commandHandler.execute(command);

      expect(chatMessageDomainService.saveChatMessage).toHaveBeenCalledWith({
        message: command.message,
        receiverId: command.profileId,
        senderId: mockProfile.id,
      });
    });
  });
});
