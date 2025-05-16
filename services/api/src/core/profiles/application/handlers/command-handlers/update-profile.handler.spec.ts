import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { map } from "src/core/mapper";
import { ProfileService } from "src/core/profiles/domain/services/profile.service";
import { Mock, beforeEach, describe, expect, it, vi } from "src/test";
import { createMockRepository } from "src/test/mocks/repository.mock";
import { createUserIdServiceMock } from "src/test/mocks/user-id.service.mock";

import { Profile } from "../../../infrastructure/entities/profile.entity";
import { UpdateProfileCommand } from "../../contracts/commands/update-profile.command";
import { UpdateProfileHandler } from "./update-profile.handler";

describe(UpdateProfileHandler.name, () => {
  let commandHandler: UpdateProfileHandler;
  let profiles: Repository<Profile>;
  let profileService: ProfileService;
  let userIdService: UserIdService;

  beforeEach(() => {
    profiles = createMockRepository<Profile>();
    userIdService = createUserIdServiceMock();

    profileService = new ProfileService(
      // TODO: Use proper EventBus mock
      { publish: vi.fn() } as any,
      profiles,
    );
    commandHandler = new UpdateProfileHandler(
      profiles,
      profileService,
      userIdService,
    );
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

      const findOneFn = profiles.findOne as unknown as Mock;
      findOneFn.mockImplementation(() => profile);

      const command = map(UpdateProfileCommand, {
        ...profile,
        description: "my-new-description",
      });

      await commandHandler.execute(command);

      expect(profiles.save).toHaveBeenCalledWith({
        ...profile,
        description: "my-new-description",
      });
    });
  });
});
