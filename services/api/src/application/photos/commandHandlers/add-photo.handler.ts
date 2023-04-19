import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ProfilePhoto } from "src/infrastructure/database/entities/profile-photo.entity";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { ObjectStorageService } from "src/infrastructure/objectStorage/object-storage.service";

import { AddPhotoCommand } from "../contracts/add-photo.command";

@CommandHandler(AddPhotoCommand)
export class AddPhotoHandler implements ICommandHandler<AddPhotoCommand, void> {
  constructor(
    private objectStorageService: ObjectStorageService,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    @InjectRepository(ProfilePhoto)
    private readonly profilePhotos: Repository<ProfilePhoto>,
  ) {}

  async execute(command: AddPhotoCommand) {
    const profile = await this.profiles.findOne({
      select: { id: true },
      where: { userId: command.userId },
    });

    if (!profile) {
      throw new BadRequestException("Profile not found");
    }

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
