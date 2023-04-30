import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { ChatMessage } from "src/infrastructure/database/entities/chat-message.entity";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { createMockRepository } from "src/test/mocks/repository.mock";
import { createUserIdServiceMock } from "src/test/mocks/user-id.service.mock";
import { map } from "src/utils/mapper";

import { PostChatMessageCommand } from "../contracts/post-chat-message.command";
import { PostChatMessageHandler } from "./post-chat-message.handler";

describe(PostChatMessageHandler.name, () => {
  let chatMessages: Repository<ChatMessage>;
  let profiles: Repository<Profile>;
  let userIdService: UserIdService;

  let mockProfile: Profile;

  let commandHandler: PostChatMessageHandler;

  beforeEach(() => {
    chatMessages = createMockRepository<ChatMessage>();

    mockProfile = new Profile();
    mockProfile.id = 1;

    profiles = createMockRepository<Profile>([mockProfile]);
    userIdService = createUserIdServiceMock();

    commandHandler = new PostChatMessageHandler(
      chatMessages,
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

      expect(chatMessages.save).toHaveBeenCalledWith({
        message: command.message,
        receiverId: command.profileId,
        senderId: mockProfile.id,
      });
    });
  });
});
