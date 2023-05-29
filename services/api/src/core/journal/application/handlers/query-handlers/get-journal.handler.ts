import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { JournalEntry } from "src/core/journal/infrastructure/entities/journal-entry.entity";

import { JournalDetails } from "../../contracts/dtos/journal-details.dto";
import { GetJournalQuery } from "../../contracts/queries/get-journal.query";
import { mapToJournalDetails } from "../../mappers/journal.mapper";

@QueryHandler(GetJournalQuery)
export class GetJournalHandler
  implements IQueryHandler<GetJournalQuery, JournalDetails>
{
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntries: Repository<JournalEntry>,
    private readonly userIdService: UserIdService,
  ) {}

  async execute() {
    const userId = this.userIdService.getUserId();

    const foundJournalEntries = await this.journalEntries.find({
      where: { userId: userId },
      order: { created: "desc" },
    });

    return mapToJournalDetails({ entries: foundJournalEntries });
  }
}
