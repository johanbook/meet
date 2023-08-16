import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { map } from "src/core/mapper";
import { ProfileService } from "src/features/profiles/domain/services/profile.service";
import { createMockRepository } from "src/test/mocks/repository.mock";
import { createUserIdServiceMock } from "src/test/mocks/user-id.service.mock";

import { Profile } from "../../../infrastructure/entities/profile.entity";
import { UpdateProfilePhotoCommand } from "../../contracts/commands/update-profile-photo.command";
import { UpdateProfilePhotoHandler } from "./update-profile-photo.handler";

describe(UpdateProfilePhotoHandler.name, () => {
  let commandHandler: UpdateProfilePhotoHandler;
  let profiles: Repository<Profile>;
  let profileService: ProfileService;
  let userIdService: UserIdService;

  beforeEach(() => {
    profiles = createMockRepository<Profile>([{} as any]);
    userIdService = createUserIdServiceMock();

    const photoService = { uploadPhoto: jest.fn(() => ({})) } as any;

    profileService = new ProfileService(
      // TODO: Use proper EventBus mock
      { publish: jest.fn() } as any,
      profiles,
    );
    commandHandler = new UpdateProfilePhotoHandler(
      photoService,
      profiles,
      profileService,
      userIdService,
    );
  });

  describe("can update profile", () => {
    it("should save changes to profile", async () => {
      const command = map(UpdateProfilePhotoCommand, {
        photo: "my-photo",
      });

      await commandHandler.execute(command);

      const [updatedProfile] = await profiles.find();

      expect(updatedProfile.profilePhoto).toBeDefined();
    });
  });
});
