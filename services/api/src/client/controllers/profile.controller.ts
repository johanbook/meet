import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { UpdateProfileCommand } from "src/application/profile/contracts/update-profile.command";
import { GetProfileQuery } from "src/application/profile/contracts/get-profile.query";
import { GetProfilesNearbyQuery } from "src/application/profile/contracts/get-profiles-nearby.query";
import { CreateProfileCommand } from "src/application/profile/contracts/create-profile.command";
import { UserId } from "../decorators/user-id.decorator";
import { ProfileDetails } from "src/application/profile/contracts/profile.dto";

@Controller("profile")
@ApiTags("profile")
export class ProfileController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getCurrentProfile(@UserId() userId: string): Promise<ProfileDetails> {
    const query = new GetProfileQuery(userId);
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
