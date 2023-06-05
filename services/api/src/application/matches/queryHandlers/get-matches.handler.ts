import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CurrentProfileService } from "src/domain/profiles/services/current-profile.service";
import { Match } from "src/infrastructure/database/views/matches.view";
import { ObjectStorageService } from "src/infrastructure/objectStorage/object-storage.service";
import { mapArray } from "src/utils/mapper";

import { GetMatchesQuery } from "../contracts/get-matches.query";
import { MatchDetails } from "../contracts/match.dto";

@QueryHandler(GetMatchesQuery)
export class GetMatchesHandler
  implements IQueryHandler<GetMatchesQuery, MatchDetails[]>
{
  constructor(
    private readonly currentProfileService: CurrentProfileService,
    @InjectRepository(Match)
    private readonly matches: Repository<Match>,
    private readonly objectStorageService: ObjectStorageService,
  ) {}

  async execute() {
    const currentProfile =
      await this.currentProfileService.fetchCurrentProfile();

    const foundMatches = await this.matches.find({
      where: { profileId: currentProfile.id },
      order: { lastMessageSent: "desc" },
    });

    return mapArray(MatchDetails, foundMatches, (match) => ({
      imageUrl:
        match.photoObjectId &&
        this.objectStorageService.getUrl("profile-photos", match.photoObjectId),
      lastMessage: match.lastMessage,
      lastMessageSent: match.lastMessageSent,
      name: match.name,
      profileId: match.shownProfileId,
    }));
  }
}
