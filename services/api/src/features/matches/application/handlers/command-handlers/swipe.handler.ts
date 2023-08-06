import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CurrentProfileService, Profile } from "src/features/profiles";

import { SwipeService } from "../../../domain/services/swipe.service";
import { Swipe } from "../../../infrastructure/entities/swipe.entity";
import { SwipeCommand } from "../../contracts/commands/swipe.command";

@CommandHandler(SwipeCommand)
export class SwipeHandler implements ICommandHandler<SwipeCommand, void> {
  constructor(
    private readonly currentProfileService: CurrentProfileService,
    private readonly swipeService: SwipeService,
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

    await this.swipeService.saveSwipe(swipe);
  }
}
