import { Repository } from "typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { createMockRepository } from "src/test/mocks/repository.mock";
import { map } from "src/utils/mapper";

import { UpdateProfileCommand } from "../contracts/update-profile.command";
import { UpdateProfileHandler } from "./update-profile.handler";

describe(UpdateProfileHandler.name, () => {
  let commandHandler: UpdateProfileHandler;
  let mockRepository: Repository<Profile>;

  beforeEach(() => {
    mockRepository = createMockRepository<Profile>();
    commandHandler = new UpdateProfileHandler(mockRepository);
  });

  describe("can update profile", () => {
    it("should throw if profile not found", async () => {
      const newProfile = {
        description: "my-description",
        name: "my-name",
        recentLocation: { lat: 1, lon: 2 },
        userId: "my-user-id",
      };

      const command = map(UpdateProfileCommand, newProfile);

      await expect(commandHandler.execute(command)).rejects.toHaveProperty(
        "message",
        "Profile not found",
      );
    });

    it("should save changes to profile", async () => {
      const profile = {
        description: "my-description",
        name: "my-name",
        recentLocation: { lat: 1, lon: 2 },
        userId: "my-user-id",
      };

      const findOneFn = mockRepository.findOne as unknown as jest.Mock;
      findOneFn.mockImplementation(() => profile);

      const command = map(UpdateProfileCommand, {
        ...profile,
        description: "my-new-description",
      });

      await commandHandler.execute(command);

      expect(mockRepository.save).toHaveBeenCalledWith({
        ...profile,
        description: "my-new-description",
      });
    });
  });
});
