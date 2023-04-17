import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { CheckIfProfileExistsQuery } from "src/application/profile/contracts/check-if-profile-exists.query";
import { CreateProfileCommand } from "src/application/profile/contracts/create-profile.command";
import { GetProfileQuery } from "src/application/profile/contracts/get-profile.query";
import { GetProfilesNearbyQuery } from "src/application/profile/contracts/get-profiles-nearby.query";
import { ProfileDetails } from "src/application/profile/contracts/profile.dto";
import { UpdateProfileCommand } from "src/application/profile/contracts/update-profile.command";

import { UserId } from "../decorators/user-id.decorator";

@Controller("profile")
@ApiTags("profile")
export class ProfileController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getCurrentProfile(@UserId() userId: string): Promise<ProfileDetails> {
    const query = new GetProfileQuery(userId);
    return await this.queryBus.execute(query);
  }

  @Get("/exists")
  async checkIfFileExists(@UserId() userId: string): Promise<boolean> {
    const query = new CheckIfProfileExistsQuery(userId);
    return await this.queryBus.execute(query);
  }

  @Get("/nearby")
  async getProfilesNearby(@UserId() userId: string): Promise<ProfileDetails[]> {
    const query = new GetProfilesNearbyQuery(userId);
    return await this.queryBus.execute(query);
  }

  @Post("/create")
  async createCurrentProfile(
    @Body() command: CreateProfileCommand,
    @UserId() userId: string,
  ): Promise<null> {
    command.userId = userId;
    return await this.commandBus.execute(command);
  }

  @Post("/update")
  async updateCurrentProfile(
    @Body() command: UpdateProfileCommand,
    @UserId() userId: string,
  ): Promise<null> {
    command.userId = userId;
    return await this.commandBus.execute(command);
  }
}
