import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserIdService } from "src/client/context/user-id.service";
import { QueryService } from "src/core/query";

import { JournalEntry } from "../../../infrastructure/entities/journal-entry.entity";
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
    private readonly queryService: QueryService<JournalEntry>,
    private readonly userIdService: UserIdService,
  ) {}

  async execute(query: GetJournalQuery) {
    const userId = this.userIdService.getUserId();

    const foundJournalEntries = await this.queryService.find(
      this.journalEntries,
      {
        default: {
          order: { created: "desc" },
        },
        query,
        required: {
          where: { userId: userId },
        },
      },
    );

    return mapToJournalDetails({ entries: foundJournalEntries });
  }
}
