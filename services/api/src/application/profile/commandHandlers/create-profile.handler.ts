import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { CreateProfileCommand } from "../contracts/create-profile.command";

@CommandHandler(CreateProfileCommand)
export class CreateProfileHandler
  implements ICommandHandler<CreateProfileCommand, void>
{
  constructor(
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
  ) {}

  async execute(command: CreateProfileCommand) {
    const profileExists = await this.profiles.exist({
      where: { userId: command.userId },
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
    profile.userId = command.userId;

    await this.profiles.save(profile);
  }
}
