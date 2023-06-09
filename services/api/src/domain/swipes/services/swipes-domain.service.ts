import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Swipe } from "src/infrastructure/database/entities/swipe.entity";
import { map } from "src/utils/mapper";

import { MatchMadeEvent } from "../events/match-made.event";

@Injectable()
export class SwipeDomainService {
  constructor(
    private readonly eventBus: EventBus,
    @InjectRepository(Swipe)
    private readonly swipes: Repository<Swipe>,
  ) {}

  async saveSwipe(swipe: Swipe): Promise<void> {
    const createdSwipe = await this.swipes.save(swipe);

    this.raiseEventIfMatch(createdSwipe);
  }

  private async raiseEventIfMatch(swipe: Swipe): Promise<void> {
    if (!swipe.liked) {
      return;
    }

    const correspondingSwipe = await this.swipes.findOne({
      where: {
        profileId: swipe.shownProfileId,
        shownProfileId: swipe.profileId,
      },
    });

    const match = Boolean(correspondingSwipe && correspondingSwipe.liked);

    if (!match) {
      return;
    }

    const event = map(MatchMadeEvent, {
      id: swipe.id,
      swipedProfileId: swipe.shownProfileId,
      swipingProfileId: swipe.profileId,
    });

    this.eventBus.publish(event);
  }
}
