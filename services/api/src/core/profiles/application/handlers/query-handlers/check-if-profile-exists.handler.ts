import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";

import { Profile } from "../../../infrastructure/entities/profile.entity";
import { CheckIfProfileExistsQuery } from "../../contracts/queries/check-if-profile-exists.query";

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
