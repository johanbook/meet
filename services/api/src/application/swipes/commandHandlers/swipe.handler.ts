import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { SwipeDomainService } from "src/domain/swipes/services/swipes-domain.service";
import { CurrentProfileService, Profile } from "src/features/profiles";
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
