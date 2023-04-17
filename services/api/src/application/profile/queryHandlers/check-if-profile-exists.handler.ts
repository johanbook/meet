import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";

import { CheckIfProfileExistsQuery } from "../contracts/check-if-profile-exists.query";

@QueryHandler(CheckIfProfileExistsQuery)
export class CheckIfProfileExistsHandler
  implements IQueryHandler<CheckIfProfileExistsQuery, any>
{
  constructor(
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
  ) {}

  async execute(query: CheckIfProfileExistsQuery) {
    return await this.profiles.exist({
      where: { userId: query.userId },
    });
  }
}
