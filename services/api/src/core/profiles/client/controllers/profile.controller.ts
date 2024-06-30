import { Controller, Get, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { ProfileDetails } from "../../application/contracts/dtos/profile.dto";
import { GetProfileQuery } from "../../application/contracts/queries/get-profile.query";

@Controller("profile")
@ApiTags("profile")
export class ProfileController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getProfile(@Query() query: GetProfileQuery): Promise<ProfileDetails> {
    return await this.queryBus.execute(query);
  }
}
