export class MatchDetails {
  imageUrl?: string;
  lastMessage?: string;
  lastMessageSent?: Date;
  name!: string;
  profileId!: number;
}

export class AllMatchesDetails {
  notTalkedTo!: MatchDetails[];
  talkedTo!: MatchDetails[];
}
