import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { Swipe } from "src/infrastructure/database/entities/swipe.entity";

import { SwipeCommand } from "../contracts/swipe.command";

@CommandHandler(SwipeCommand)
export class SwipeHandler implements ICommandHandler<SwipeCommand, void> {
  constructor(
    @InjectRepository(Swipe)
    private readonly swipes: Repository<Swipe>,
  ) {}

  async execute(command: SwipeCommand) {
    const profile = new Profile();
    profile.id = command.profileId;

    const shownProfile = new Profile();
    shownProfile.id = command.shownProfileId;

    const swipe = new Swipe();
    swipe.liked = command.liked;
    swipe.profile = profile;
    swipe.shownProfile = shownProfile;

    await this.swipes.save(swipe);
  }
}
