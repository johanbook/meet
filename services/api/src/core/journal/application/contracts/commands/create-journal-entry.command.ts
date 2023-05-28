import { IsString, Length } from "class-validator";

export class CreateJournalEntryCommand {
  @IsString()
  @Length(0, 1024)
  public readonly commandName!: string;

  public readonly payload!: unknown;
}
