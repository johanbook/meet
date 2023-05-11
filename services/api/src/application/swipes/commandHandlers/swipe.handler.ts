import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CurrentProfileService } from "src/domain/profiles/services/current-profile.service";
import { SwipeDomainService } from "src/domain/swipes/services/swipes-domain.service";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { Swipe } from "src/infrastructure/database/entities/swipe.entity";

import { SwipeCommand } from "../contracts/swipe.command";

@CommandHandler(SwipeCommand)
export class SwipeHandler implements ICommandHandler<SwipeCommand, void> {
  constructor(
    private readonly currentProfileService: CurrentProfileService,
    private readonly swipeDomainService: SwipeDomainService,
  ) {}

  async execute(command: SwipeCommand) {
    const currentProfile =
      await this.currentProfileService.fetchCurrentProfile();

    const shownProfile = new Profile();
    shownProfile.id = command.shownProfileId;

    const swipe = new Swipe();
    swipe.liked = command.liked;
    swipe.profile = currentProfile;
    swipe.shownProfile = shownProfile;

    await this.swipeDomainService.saveSwipe(swipe);
  }
}
