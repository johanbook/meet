import { EventBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { map } from "src/core/mapper";
import { ProfileService } from "src/core/profiles/domain/services/profile.service";
import { beforeEach, describe, expect, it, vi } from "src/test";
import {
  createEventBusMock,
  createMockRepository,
  createUserIdServiceMock,
} from "src/test/mocks";

import { Profile } from "../../../infrastructure/entities/profile.entity";
import { UpdateProfilePhotoCommand } from "../../contracts/commands/update-profile-photo.command";
import { UpdateProfilePhotoHandler } from "./update-profile-photo.handler";

describe(UpdateProfilePhotoHandler.name, () => {
  let commandHandler: UpdateProfilePhotoHandler;
  let eventBus: EventBus;
  let profiles: Repository<Profile>;
  let profileService: ProfileService;
  let userIdService: UserIdService;

  beforeEach(() => {
    eventBus = createEventBusMock();
    profiles = createMockRepository<Profile>([{} as any]);
    userIdService = createUserIdServiceMock();

    const photoService = {
      resize: vi.fn(),
      uploadPhoto: vi.fn(() => ({})),
    } as any;

    profileService = new ProfileService(eventBus, profiles);
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
