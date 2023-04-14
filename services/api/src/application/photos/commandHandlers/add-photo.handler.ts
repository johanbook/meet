import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AddPhotoCommand } from "../contracts/add-photo.command";
import { ProfilePhoto } from "src/infrastructure/database/entities/profile-photo.entity";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { BadRequestException } from "@nestjs/common";
import { ObjectStorageService } from "src/infrastructure/objectStorage/object-storage.service";

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
    profilePhoto.imageUrl = objectMetadata.url;
    profilePhoto.profile = profile;

    await this.profilePhotos.save(profilePhoto);
  }
}
