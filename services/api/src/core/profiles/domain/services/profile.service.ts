import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";

import { Profile } from "../../infrastructure/entities/profile.entity";
import { ProfileCreatedEvent } from "../events/profile-created.event";
import { ProfileDeletedEvent } from "../events/profile-deleted.event";
import { ProfileUpdatedEvent } from "../events/profile-updated.event";

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

  async deleteProfile(profile: { id: number }): Promise<void> {
    await this.profiles.delete(profile.id);

    const event = map(ProfileDeletedEvent, {
      id: profile.id,
    });

    this.eventBus.publish(event);
  }

  async updateProfile(profile: Profile): Promise<void> {
    const updatedProfile = await this.profiles.save(profile);

    const event = map(ProfileUpdatedEvent, {
      id: updatedProfile.id,
      description: updatedProfile.description,
      name: updatedProfile.name,
    });

    this.eventBus.publish(event);
  }
}
