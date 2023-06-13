import { Repository } from "typeorm";

import { ObjectStorageService } from "src/core/object-storage";
import { createObjectStorageServiceMock } from "src/core/object-storage/test/mocks/object-storage.service.mock";
import { CurrentProfileService } from "src/domain/profiles/services/current-profile.service";
import { ProfilePhoto } from "src/infrastructure/database/entities/profile-photo.entity";
import { createMockRepository } from "src/test/mocks/repository.mock";
import { map } from "src/utils/mapper";

import { AddPhotoCommand } from "../contracts/add-photo.command";
import { AddPhotoHandler } from "./add-photo.handler";

describe(AddPhotoHandler.name, () => {
  let currentProfileService: CurrentProfileService;
  let commandHandler: AddPhotoHandler;
  let objectStorageService: ObjectStorageService;
  let profilePhotos: Repository<ProfilePhoto>;

  beforeEach(() => {
    currentProfileService = { fetchCurrentProfile: jest.fn() } as any;
    objectStorageService = createObjectStorageServiceMock();
    profilePhotos = createMockRepository<ProfilePhoto>();

    commandHandler = new AddPhotoHandler(
      currentProfileService,
      objectStorageService,
      profilePhotos,
    );
  });

  describe("can add new profile photo", () => {
    it("should save new profile photo", async () => {
      const newProfile = {
        photo: Buffer.from(new ArrayBuffer(1)),
        userId: "my-user-id",
      };

      const findOneFn =
        currentProfileService.fetchCurrentProfile as unknown as jest.Mock;
      findOneFn.mockImplementation(() => "my-profile-id");

      const command = map(AddPhotoCommand, newProfile);

      await commandHandler.execute(command);

      expect(profilePhotos.save).toHaveBeenCalledWith({
        objectId: "my-object-id",
        profile: "my-profile-id",
      });
    });
  });
});
