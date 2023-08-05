import { mapArray } from "src/core/mapper";

import { Match } from "../../infrastructure/views/matches.view";
import { MatchDetails } from "../contracts/dtos/match.dto";

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
