import { Match } from "src/infrastructure/database/views/matches.view";
import { mapArray } from "src/utils/mapper";

import { MatchDetails } from "../contracts/match.dto";

export function mapToMatchDetails(
  matches: Match[],
  getPhotoUrl: (id: string) => string,
): MatchDetails[] {
  return mapArray(MatchDetails, matches, (match) => ({
    imageUrl: match.photoObjectId && getPhotoUrl(match.photoObjectId),
    lastMessage: match.lastMessage,
    lastMessageSent: match.lastMessageSent,
    name: match.name,
    profileId: match.shownProfileId,
  }));
}
