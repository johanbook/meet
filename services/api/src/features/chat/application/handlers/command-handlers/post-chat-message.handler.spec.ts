import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { map } from "src/core/mapper";
import { Profile } from "src/core/profiles";
import { createMockRepository } from "src/test/mocks/repository.mock";
import { createUserIdServiceMock } from "src/test/mocks/user-id.service.mock";

import { ChatMessageService } from "../../../domain/services/chat-message.service";
import { PostChatMessageCommand } from "../../contracts/commands/post-chat-message.command";
import { PostChatMessageHandler } from "./post-chat-message.handler";

describe(PostChatMessageHandler.name, () => {
  let chatMessageService: ChatMessageService;
  let profiles: Repository<Profile>;
  let userIdService: UserIdService;

  let mockProfile: Profile;

  let commandHandler: PostChatMessageHandler;

  beforeEach(() => {
    chatMessageService = { saveChatMessage: jest.fn() } as any;

    mockProfile = new Profile();
    mockProfile.id = 1;

    profiles = createMockRepository<Profile>([mockProfile]);
    userIdService = createUserIdServiceMock();

    commandHandler = new PostChatMessageHandler(
      chatMessageService,
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

      expect(chatMessageService.saveChatMessage).toHaveBeenCalledWith({
        message: command.message,
        receiverId: command.profileId,
        senderId: mockProfile.id,
      });
    });
  });
});
