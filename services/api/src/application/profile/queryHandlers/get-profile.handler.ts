import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";

import { GetProfileQuery } from "../contracts/get-profile.query";

@QueryHandler(GetProfileQuery)
export class GetProfileHandler implements IQueryHandler<GetProfileQuery, any> {
  constructor(
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
  ) {}

  async execute(query: GetProfileQuery) {
    return await this.profiles.findOne({
      select: {
        id: true,
        name: true,
        description: true,
      },
      relations: {
        photos: true,
      },
      where: { userId: query.userId },
    });
  }
}
