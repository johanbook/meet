import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CurrentProfileService } from "src/domain/profiles/services/current-profile.service";

import { JournalEntry } from "../../../infrastructure/entitities/journal-entry.entity";
import { CreateJournalEntryCommand } from "../../contracts/commands/create-journal-entry.command";

@CommandHandler(CreateJournalEntryCommand)
export class CreateJournalEntryHandler
  implements ICommandHandler<CreateJournalEntryCommand, void>
{
  constructor(
    private readonly currentProfileService: CurrentProfileService,
    @InjectRepository(JournalEntry)
    private readonly journalEntry: Repository<JournalEntry>,
  ) {}

  async execute(command: CreateJournalEntryCommand) {
    const currentProfile =
      await this.currentProfileService.fetchCurrentProfile();

    const newJournalEntry = new JournalEntry();

    newJournalEntry.commandName = command.commandName;
    newJournalEntry.payload = command.payload;
    newJournalEntry.profile = currentProfile;

    await this.journalEntry.save(newJournalEntry);
  }
}
