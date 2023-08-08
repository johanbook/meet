import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { MissingUserIdError } from "src/core/authentication";

import { JournalEntry } from "../../../infrastructure/entities/journal-entry.entity";
import { CreateJournalEntryCommand } from "../../contracts/commands/create-journal-entry.command";

@CommandHandler(CreateJournalEntryCommand)
export class CreateJournalEntryHandler
  implements ICommandHandler<CreateJournalEntryCommand, void>
{
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntries: Repository<JournalEntry>,
    private readonly userIdService: UserIdService,
  ) {}

  async execute(command: CreateJournalEntryCommand) {
    let userId: string;

    // User ID will not be available for system-issued commands (e.g. event handlers)
    // This skips logging any commands where user id cannot be found
    try {
      userId = this.userIdService.getUserId();
    } catch (error) {
      if (error instanceof MissingUserIdError) {
        return;
      }

      throw error;
    }

    const newJournalEntry = new JournalEntry();

    newJournalEntry.commandName = command.commandName;
    newJournalEntry.payload = command.payload;
    newJournalEntry.userId = userId;

    await this.journalEntries.save(newJournalEntry);
  }
}
