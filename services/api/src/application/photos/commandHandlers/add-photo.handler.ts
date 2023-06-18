import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ObjectStorageService } from "src/core/object-storage";
import { CurrentProfileService } from "src/domain/profiles/services/current-profile.service";
import { ProfilePhoto } from "src/infrastructure/database/entities/profile-photo.entity";

import { AddPhotoCommand } from "../contracts/add-photo.command";

@CommandHandler(AddPhotoCommand)
export class AddPhotoHandler implements ICommandHandler<AddPhotoCommand, void> {
  constructor(
    private readonly currentProfileService: CurrentProfileService,
    private readonly objectStorageService: ObjectStorageService,
    @InjectRepository(ProfilePhoto)
    private readonly profilePhotos: Repository<ProfilePhoto>,
  ) {}

  async execute(command: AddPhotoCommand) {
    const profile = await this.currentProfileService.fetchCurrentProfile();

    const objectMetadata = await this.objectStorageService.put(
      "profile-photos",
      command.photo,
    );

    const profilePhoto = new ProfilePhoto();
    profilePhoto.objectId = objectMetadata.id;
    profilePhoto.profile = profile;

    await this.profilePhotos.save(profilePhoto);
  }
}
