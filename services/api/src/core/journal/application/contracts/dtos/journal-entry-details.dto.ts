import { JournalProfileDetails } from "./journal-profile-details.dto";

export class JournalEntryDetails {
  public readonly commandName!: string;

  public readonly createdAt!: Date;

  public readonly id!: string;

  public readonly payload!: unknown;

  public readonly profile!: JournalProfileDetails;
}
