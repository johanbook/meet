import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { NotificationsGateway } from "src/client/gateways/notifications.gateway";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { Swipe } from "src/infrastructure/database/entities/swipe.entity";
import { map } from "src/utils/mapper";

import { SwipeDetails } from "../contracts/swipe-details.dto";
import { SwipeCommand } from "../contracts/swipe.command";

@CommandHandler(SwipeCommand)
export class SwipeHandler
  implements ICommandHandler<SwipeCommand, SwipeDetails>
{
  constructor(
    private readonly notificationsGateway: NotificationsGateway,
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

    return this.fetchSwipeDetails(command, profile);
  }

  private async fetchSwipeDetails(
    command: SwipeCommand,
    currentProfile: Profile,
  ): Promise<SwipeDetails> {
    if (!command.liked) {
      return map(SwipeDetails, { match: false });
    }

    const correspondingSwipe = await this.swipes.findOne({
      where: {
        profileId: command.shownProfileId,
        shownProfileId: currentProfile.id,
      },
    });

    const match = Boolean(correspondingSwipe && correspondingSwipe.liked);

    if (!match) {
      return map(SwipeDetails, { match: false });
    }

    const targetProfile = await this.profiles.findOne({
      select: ["userId"],
      where: { id: command.shownProfileId },
    });

    if (!targetProfile) {
      throw new NotFoundException("An error occured when registering swipe");
    }

    this.notificationsGateway.notifyUsersIfAvailable(
      [currentProfile.userId, targetProfile?.userId],
      "new_match",
      "You got a new match",
    );

    return map(SwipeDetails, { match });
  }
}
