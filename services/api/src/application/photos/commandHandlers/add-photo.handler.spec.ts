import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { ProfilePhoto } from "src/infrastructure/database/entities/profile-photo.entity";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { ObjectStorageService } from "src/infrastructure/objectStorage/object-storage.service";
import { createObjectStorageServiceMock } from "src/test/mocks/object-storage.service.mock";
import { createMockRepository } from "src/test/mocks/repository.mock";
import { createUserIdServiceMock } from "src/test/mocks/user-id.service.mock";
import { map } from "src/utils/mapper";

import { AddPhotoCommand } from "../contracts/add-photo.command";
import { AddPhotoHandler } from "./add-photo.handler";

describe(AddPhotoHandler.name, () => {
  let commandHandler: AddPhotoHandler;
  let objectStorageService: ObjectStorageService;
  let profilePhotos: Repository<ProfilePhoto>;
  let profiles: Repository<Profile>;
  let userIdService: UserIdService;

  beforeEach(() => {
    objectStorageService = createObjectStorageServiceMock();
    profilePhotos = createMockRepository<ProfilePhoto>();
    profiles = createMockRepository<Profile>();
    userIdService = createUserIdServiceMock();

    commandHandler = new AddPhotoHandler(
      objectStorageService,
      profiles,
      profilePhotos,
      userIdService,
    );
  });

  describe("can add new profile photo", () => {
    it("should save new profile photo", async () => {
      const newProfile = {
        photo: Buffer.from(new ArrayBuffer(1)),
        userId: "my-user-id",
      };

      const findOneFn = profiles.findOne as unknown as jest.Mock;
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
