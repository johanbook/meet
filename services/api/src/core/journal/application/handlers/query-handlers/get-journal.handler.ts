import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { JournalEntry } from "src/core/journal/infrastructure/entities/journal-entry.entity";
import { CurrentProfileService } from "src/domain/profiles/services/current-profile.service";

import { JournalDetails } from "../../contracts/dtos/journal-details.dto";
import { GetJournalQuery } from "../../contracts/queries/get-journal.query";
import { mapToJournalDetails } from "../../mappers/journal.mapper";

@QueryHandler(GetJournalQuery)
export class GetJournalHandler
  implements IQueryHandler<GetJournalQuery, JournalDetails>
{
  constructor(
    private readonly currentProfileService: CurrentProfileService,
    @InjectRepository(JournalEntry)
    private readonly journalEntries: Repository<JournalEntry>,
  ) {}

  async execute() {
    const currentProfie =
      await this.currentProfileService.fetchCurrentProfile();

    const foundJournalEntries = await this.journalEntries.find({
      where: { profileId: currentProfie.id },
    });

    return mapToJournalDetails({ entries: foundJournalEntries });
  }
}
