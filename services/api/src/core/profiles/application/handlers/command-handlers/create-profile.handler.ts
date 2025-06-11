import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { Logger } from "src/core/logging";
import { PhotoService } from "src/core/photos";

import { ProfileService } from "../../../domain/services/profile.service";
import { ProfilePhoto } from "../../../infrastructure/entities/profile-photo.entity";
import { Profile } from "../../../infrastructure/entities/profile.entity";
import { CreateProfileCommand } from "../../contracts/commands/create-profile.command";

@CommandHandler(CreateProfileCommand)
export class CreateProfileHandler
  implements ICommandHandler<CreateProfileCommand, void>
{
  private logger = new Logger(CreateProfileHandler.name);

  constructor(
    private readonly photoService: PhotoService,
    private readonly profileService: ProfileService,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  async execute(command: CreateProfileCommand) {
    const userId = this.userIdService.getUserId();

    const profileExists = await this.profiles.exist({
      where: { userId },
    });

    if (profileExists) {
      this.logger.warn(
        "Attempt at creating profile when profile already exists.",
      );

      throw new BadRequestException(
        "Cannot create profile as it already exists",
      );
    }

    const profile = new Profile();
    profile.dateOfBirth = command.dateOfBirth;
    profile.description = command.description;
    profile.name = command.name;
    profile.recentLocation = `${command.recentLocation?.lat || 0}, ${
      command.recentLocation?.lon || 0
    }` as any;
    profile.userId = userId;

    // Handle photo upload if provided
    if (command.photo) {
      const resizedPhoto = await this.photoService.resize(
        command.photo as Buffer,
        {
          width: 200,
        },
      );

      const photo = await this.photoService.uploadPhoto(
        ProfilePhoto,
        "profile-photo",
        resizedPhoto,
      );

      profile.profilePhoto = photo;
    }

    await this.profileService.createProfile(profile);
  }
}
