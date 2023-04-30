import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { Swipe } from "src/infrastructure/database/entities/swipe.entity";

import { SwipeCommand } from "../contracts/swipe.command";

@CommandHandler(SwipeCommand)
export class SwipeHandler implements ICommandHandler<SwipeCommand, void> {
  constructor(
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    @InjectRepository(Swipe)
    private readonly swipes: Repository<Swipe>,
    private readonly userIdService: UserIdService,
  ) {}

  async execute(command: SwipeCommand) {
    const userId = this.userIdService.getUserId();

    const profile = await this.profiles.findOne({
      select: {
        id: true,
      },
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException();
    }

    const shownProfile = new Profile();
    shownProfile.id = command.shownProfileId;

    const swipe = new Swipe();
    swipe.liked = command.liked;
    swipe.profile = profile;
    swipe.shownProfile = shownProfile;

    await this.swipes.save(swipe);
  }
}
