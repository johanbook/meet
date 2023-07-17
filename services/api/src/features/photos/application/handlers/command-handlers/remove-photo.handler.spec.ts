import { Repository } from "typeorm";

import { ObjectStorageService } from "src/core/object-storage";
import { createObjectStorageServiceMock } from "src/core/object-storage/test/mocks/object-storage.service.mock";
import { CurrentProfileService, Profile } from "src/features/profiles";
import { createMockRepository } from "src/test/mocks/repository.mock";
import { map } from "src/utils/mapper";

import { ProfilePhoto } from "../../../infrastructure/entities/profile-photo.entity";
import { RemovePhotoCommand } from "../../contracts/commands/remove-photo.command";
import { RemovePhotoHandler } from "./remove-photo.handler";

describe(RemovePhotoHandler.name, () => {
  let commandHandler: RemovePhotoHandler;

  let photo: ProfilePhoto;
  let currentProfileService: CurrentProfileService;
  let objectStorageService: ObjectStorageService;
  let profilePhotos: Repository<ProfilePhoto>;

  beforeEach(() => {
    photo = new ProfilePhoto();

    profilePhotos = createMockRepository<ProfilePhoto>([photo]);
    objectStorageService = createObjectStorageServiceMock();

    const profile = new Profile();
    profile.id = 1;

    currentProfileService = {
      fetchCurrentProfileId: jest.fn(() => profile.id),
    } as any;

    commandHandler = new RemovePhotoHandler(
      currentProfileService,
      objectStorageService,
      profilePhotos,
    );
  });

  describe("can add new profile photo", () => {
    it("should save new profile photo", async () => {
      const command = map(RemovePhotoCommand, { id: 1 });

      await commandHandler.execute(command);

      expect(profilePhotos.remove).toHaveBeenCalledWith(photo);
    });
  });
});
