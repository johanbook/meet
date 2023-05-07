import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { map } from "src/utils/mapper";

import { ProfileCreatedEvent } from "../events/profile-created.event";

@Injectable()
export class ProfileService {
  constructor(
    private readonly eventBus: EventBus,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
  ) {}

  async createProfile(profile: Profile): Promise<void> {
    const createdProfile = await this.profiles.save(profile);

    const event = map(ProfileCreatedEvent, {
      id: createdProfile.id,
      description: createdProfile.description,
      name: createdProfile.name,
    });

    this.eventBus.publish(event);
  }
}
