import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { PhotoService } from "src/core/photos";
import { ProfileService } from "src/features/profiles/domain/services/profile.service";
import { ProfilePhoto } from "src/features/profiles/infrastructure/entities/profile-photo.entity";
import { Profile } from "src/features/profiles/infrastructure/entities/profile.entity";

import { UpdateProfilePhotoCommand } from "../../contracts/commands/update-profile-photo.command";

@CommandHandler(UpdateProfilePhotoCommand)
export class UpdateProfilePhotoHandler
  implements ICommandHandler<UpdateProfilePhotoCommand, void>
{
  constructor(
    private readonly photoService: PhotoService,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly profileService: ProfileService,
    private readonly userIdService: UserIdService,
  ) {}

  async execute(command: UpdateProfilePhotoCommand) {
    const userId = this.userIdService.getUserId();

    const profile = await this.profiles.findOne({
      where: { userId },
    });

    if (!profile) {
      throw new BadRequestException("Profile not found");
    }

    // TODO: Remove existing photo

    const resizedPhoto = await this.photoService.compress(
      command.photo as Buffer,
      [50, 50],
    );

    const photo = await this.photoService.uploadPhoto(
      ProfilePhoto,
      "profile-photo",
      resizedPhoto,
    );
    photo.profileId = profile.id;

    profile.profilePhoto = photo;

    // TODO: Find a better solution to this.
    // The `Point` type is different when saving and
    // retreived. Setting it to undefined will make TypeORM
    // ignore it when updating the entity
    profile.recentLocation = undefined as any;

    await this.profileService.updateProfile(profile);
  }
}
