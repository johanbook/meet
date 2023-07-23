import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { map } from "src/core/mapper";
import { createMockRepository } from "src/test/mocks/repository.mock";
import { createUserIdServiceMock } from "src/test/mocks/user-id.service.mock";

import { ProfileService } from "../../../domain/services/profile.service";
import { Profile } from "../../../infrastructure/entities/profile.entity";
import { CreateProfileCommand } from "../../contracts/commands/create-profile.command";
import { CreateProfileHandler } from "./create-profile.handler";

describe(CreateProfileHandler.name, () => {
  let commandHandler: CreateProfileHandler;
  let mockRepository: Repository<Profile>;
  let profileService: ProfileService;
  let userIdService: UserIdService;

  beforeEach(() => {
    mockRepository = createMockRepository<Profile>();
    profileService = { createProfile: jest.fn() } as any;
    userIdService = createUserIdServiceMock();

    commandHandler = new CreateProfileHandler(
      profileService,
      mockRepository,
      userIdService,
    );
  });

  describe("execute", () => {
    it("should save new profile", async () => {
      const newProfile = {
        dateOfBirth: new Date("2000-01-01"),
        description: "my-description",
        name: "my-name",
        recentLocation: { lat: 1, lon: 2 },
        userId: "my-user-id",
      };

      const command = map(CreateProfileCommand, newProfile);

      await commandHandler.execute(command);

      expect(profileService.createProfile).toHaveBeenCalledWith({
        ...newProfile,
        recentLocation: "1, 2",
      });
    });
  });
});
