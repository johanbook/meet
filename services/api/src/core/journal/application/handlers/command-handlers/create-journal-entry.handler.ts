import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";

import { JournalEntry } from "../../../infrastructure/entities/journal-entry.entity";
import { CreateJournalEntryCommand } from "../../contracts/commands/create-journal-entry.command";

@CommandHandler(CreateJournalEntryCommand)
export class CreateJournalEntryHandler
  implements ICommandHandler<CreateJournalEntryCommand, void>
{
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntry: Repository<JournalEntry>,
    private readonly userIdService: UserIdService,
  ) {}

  async execute(command: CreateJournalEntryCommand) {
    const userId = this.userIdService.getUserId();

    const newJournalEntry = new JournalEntry();

    newJournalEntry.commandName = command.commandName;
    newJournalEntry.payload = command.payload;
    newJournalEntry.userId = userId;

    await this.journalEntry.save(newJournalEntry);
  }
}
