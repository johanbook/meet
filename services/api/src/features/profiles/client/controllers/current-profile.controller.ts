import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { Multipart } from "src/core/multipart";

import { CreateProfileCommand } from "../../application/contracts/commands/create-profile.command";
import { UpdateProfilePhotoCommand } from "../../application/contracts/commands/update-profile-photo.command";
import { UpdateProfileCommand } from "../../application/contracts/commands/update-profile.command";
import { ProfileDetails } from "../../application/contracts/dtos/profile.dto";
import { CheckIfProfileExistsQuery } from "../../application/contracts/queries/check-if-profile-exists.query";
import { GetCurrentProfileQuery } from "../../application/contracts/queries/get-current-profile.query";

@Controller("profile/current")
@ApiTags("profile")
export class CurrentProfileController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getCurrentProfile(
    @Query() query: GetCurrentProfileQuery,
  ): Promise<ProfileDetails> {
    return await this.queryBus.execute(query);
  }

  @Get("/exists")
  async checkIfProfileExists(
    @Query() query: CheckIfProfileExistsQuery,
  ): Promise<boolean> {
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

  @Put("/photo/update")
  @Multipart()
  async updateCurrentProfilePhoto(
    @Body() command: UpdateProfilePhotoCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }
}
