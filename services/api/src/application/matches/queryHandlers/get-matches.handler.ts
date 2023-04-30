import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { Match } from "src/infrastructure/database/views/matches.view";

import { GetMatchesQuery } from "../contracts/get-matches.query";

@QueryHandler(GetMatchesQuery)
export class GetMatchesHandler implements IQueryHandler<GetMatchesQuery, any> {
  constructor(
    @InjectRepository(Match)
    private readonly matches: Repository<Match>,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  async execute() {
    const userId = this.userIdService.getUserId();

    const profile = await this.profiles.findOne({
      select: {
        id: true,
      },
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException();
    }

    return await this.matches.find({ where: { profileId: profile.id } });
  }
}
