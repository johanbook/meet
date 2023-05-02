import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { Profile } from "src/infrastructure/database/entities/profile.entity";

import { CheckIfProfileExistsQuery } from "../contracts/check-if-profile-exists.query";

@QueryHandler(CheckIfProfileExistsQuery)
export class CheckIfProfileExistsHandler
  implements IQueryHandler<CheckIfProfileExistsQuery, boolean>
{
  constructor(
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  async execute() {
    const userId = this.userIdService.getUserId();

    return await this.profiles.exist({
      where: { userId },
    });
  }
}
