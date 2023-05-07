import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { ProfileService } from "src/domain/profiles/services/profile.service";
import { Profile } from "src/infrastructure/database/entities/profile.entity";

import { CreateProfileCommand } from "../contracts/create-profile.command";

@CommandHandler(CreateProfileCommand)
export class CreateProfileHandler
  implements ICommandHandler<CreateProfileCommand, void>
{
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
      throw new BadRequestException(
        "Cannot create profile as it already exists",
      );
    }

    const profile = new Profile();
    profile.description = command.description;
    profile.name = command.name;
    profile.recentLocation =
      `${command.recentLocation.lat}, ${command.recentLocation.lon}` as any;
    profile.userId = userId;

    await this.profileService.createProfile(profile);
  }
}
