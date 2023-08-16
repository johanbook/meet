import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { ObjectStorageService } from "src/core/object-storage";
import { CurrentProfileService } from "src/features/profiles";

import { Match } from "../../../infrastructure/views/matches.view";
import { AllMatchesDetails } from "../../contracts/dtos/match.dto";
import { GetMatchesQuery } from "../../contracts/queries/get-matches.query";
import { mapToMatchDetails } from "../../mappers/match.mapper";

@QueryHandler(GetMatchesQuery)
export class GetMatchesHandler
  implements IQueryHandler<GetMatchesQuery, AllMatchesDetails>
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

    const talkedTo = foundMatches.filter((match) =>
      Boolean(match.lastMessageSent),
    );
    const notTalkedTo = foundMatches.filter((match) => !match.lastMessageSent);

    return map(AllMatchesDetails, {
      notTalkedTo: mapToMatchDetails(notTalkedTo, this.getPhotoUrl),
      talkedTo: mapToMatchDetails(talkedTo, this.getPhotoUrl),
    });
  }

  private getPhotoUrl(photoId: string) {
    return this.objectStorageService.getUrl("profile-photo", photoId);
  }
}
