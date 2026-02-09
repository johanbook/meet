import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { MissingUserIdError } from "src/core/authentication";
import { CurrentOrganizationService } from "src/core/organizations";
import { CurrentProfileService } from "src/core/profiles";
import { redactBinaries } from "src/utils/object.helper";

import { JournalEntry } from "../../../infrastructure/entities/journal-entry.entity";
import { CreateJournalEntryCommand } from "../../contracts/commands/create-journal-entry.command";

@CommandHandler(CreateJournalEntryCommand)
export class CreateJournalEntryHandler implements ICommandHandler<
  CreateJournalEntryCommand,
  void
> {
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly currentProfileService: CurrentProfileService,
    @InjectRepository(JournalEntry)
    private readonly journalEntries: Repository<JournalEntry>,
  ) {}

  async execute(command: CreateJournalEntryCommand) {
    let organizationId;
    let profileId;

    // User ID will not be available for system-issued commands (e.g. event handlers)
    // This skips logging any commands where user id cannot be found
    try {
      organizationId =
        await this.currentOrganizationService.fetchCurrentOrganizationId();
      profileId = await this.currentProfileService.fetchCurrentProfileId();
    } catch (error) {
      if (
        error instanceof MissingUserIdError ||
        error instanceof NotFoundException
      ) {
        return;
      }

      throw error;
    }

    const newJournalEntry = new JournalEntry();

    newJournalEntry.commandName = command.commandName;
    newJournalEntry.organizationId = organizationId;
    newJournalEntry.payload = redactBinaries(command.payload);
    newJournalEntry.profileId = profileId;

    await this.journalEntries.save(newJournalEntry);
  }
}
