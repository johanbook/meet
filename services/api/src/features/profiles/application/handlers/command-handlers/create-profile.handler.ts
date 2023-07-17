import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { Logger } from "src/infrastructure/logger.service";

import { ProfileService } from "../../../domain/services/profile.service";
import { Profile } from "../../../infrastructure/entities/profile.entity";
import { CreateProfileCommand } from "../../contracts/commands/create-profile.command";

@CommandHandler(CreateProfileCommand)
export class CreateProfileHandler
  implements ICommandHandler<CreateProfileCommand, void>
{
  private logger = new Logger(CreateProfileHandler.name);

  constructor(
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
    profile.recentLocation =
      `${command.recentLocation.lat}, ${command.recentLocation.lon}` as any;
    profile.userId = userId;

    await this.profileService.createProfile(profile);
  }
}
