import { ValidateNested } from "class-validator";

import { JournalEntryDetails } from "./journal-entry-details.dto";

export class JournalDetails {
  @ValidateNested()
  public readonly entries!: JournalEntryDetails[];
}
