import { IsString, Length } from "class-validator";

import { NoJournal } from "src/core/journal/no-journal.decorator";

@NoJournal()
export class CreateJournalEntryCommand {
  @IsString()
  @Length(0, 1024)
  public readonly commandName!: string;

  public readonly payload!: unknown;
}
