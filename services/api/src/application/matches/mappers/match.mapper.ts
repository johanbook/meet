import { ClassConstructor } from "class-transformer";

import { Match } from "src/infrastructure/database/views/matches.view";
import { map } from "src/utils/mapper";
import { Mapper } from "src/utils/mapper/mapper.decorator";
import { IMapper } from "src/utils/mapper/mapper.interface";

import { MatchDetails } from "../contracts/match.dto";

@Mapper(Match, MatchDetails)
export class MatchDetailsMapper implements IMapper<Match, MatchDetails> {
  map(source: Match, target: ClassConstructor<MatchDetails>) {
    return map(target, {
      name: source.name,
      profileId: source.profileId,
    });
  }
}
