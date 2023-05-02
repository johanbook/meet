import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { createMockRepository } from "src/test/mocks/repository.mock";
import { createUserIdServiceMock } from "src/test/mocks/user-id.service.mock";
import { map } from "src/utils/mapper";

import { CreateProfileCommand } from "../contracts/create-profile.command";
import { CreateProfileHandler } from "./create-profile.handler";

describe(CreateProfileHandler.name, () => {
  let commandHandler: CreateProfileHandler;
  let mockRepository: Repository<Profile>;
  let userIdService: UserIdService;

  beforeEach(() => {
    mockRepository = createMockRepository<Profile>();
    userIdService = createUserIdServiceMock();

    commandHandler = new CreateProfileHandler(mockRepository, userIdService);
  });

  describe("can create new profile", () => {
    it("should save new profile", async () => {
      const newProfile = {
        description: "my-description",
        name: "my-name",
        recentLocation: { lat: 1, lon: 2 },
        userId: "my-user-id",
      };

      const command = map(CreateProfileCommand, newProfile);

      await commandHandler.execute(command);

      expect(mockRepository.save).toHaveBeenCalledWith({
        ...newProfile,
        recentLocation: "1, 2",
      });
    });
  });
});
