import { IsString, Length } from "class-validator";

export class JournalEntryDetails {
  @IsString()
  @Length(0, 1024)
  public readonly commandName!: string;

  public readonly created!: Date;

  public readonly id!: number;

  public readonly payload!: unknown;
}
