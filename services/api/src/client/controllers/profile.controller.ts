import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { CheckIfProfileExistsQuery } from "src/application/profile/contracts/check-if-profile-exists.query";
import { CreateProfileCommand } from "src/application/profile/contracts/create-profile.command";
import { GetProfileQuery } from "src/application/profile/contracts/get-profile.query";
import { GetProfilesNearbyQuery } from "src/application/profile/contracts/get-profiles-nearby.query";
import { ProfileDetails } from "src/application/profile/contracts/profile.dto";
import { UpdateProfileCommand } from "src/application/profile/contracts/update-profile.command";

@Controller("profile")
@ApiTags("profile")
export class ProfileController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getCurrentProfile(): Promise<ProfileDetails> {
    const query = new GetProfileQuery();
    return await this.queryBus.execute(query);
  }

  @Get("/exists")
  async checkIfFileExists(): Promise<boolean> {
    const query = new CheckIfProfileExistsQuery();
    return await this.queryBus.execute(query);
  }

  @Get("/nearby")
  async getProfilesNearby(): Promise<ProfileDetails[]> {
    const query = new GetProfilesNearbyQuery();
    return await this.queryBus.execute(query);
  }

  @Post("/create")
  async createCurrentProfile(
    @Body() command: CreateProfileCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Post("/update")
  async updateCurrentProfile(
    @Body() command: UpdateProfileCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }
}
