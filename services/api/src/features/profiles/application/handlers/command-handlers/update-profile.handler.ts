import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";

import { Profile } from "../../../infrastructure/entities/profile.entity";
import { UpdateProfileCommand } from "../../contracts/commands/update-profile.command";

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  implements ICommandHandler<UpdateProfileCommand, void>
{
  constructor(
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  async execute(command: UpdateProfileCommand) {
    const userId = this.userIdService.getUserId();

    const profile = await this.profiles.findOne({
      where: { userId },
    });

    if (!profile) {
      throw new BadRequestException("Profile not found");
    }

    // TODO: Find a better solution to this.
    // The `Point` type is different when saving and
    // retreived. Setting it to undefined will make TypeORM
    // ignore it when updating the entity
    profile.recentLocation = undefined as any;

    if (command.description) {
      profile.description = command.description;
    }

    await this.profiles.save(profile);
  }
}
