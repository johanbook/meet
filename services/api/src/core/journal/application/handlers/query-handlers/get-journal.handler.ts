import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { And, LessThan, MoreThan, Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { map, mapArray } from "src/core/mapper";
import { QueryService } from "src/core/query";

import { JournalEntry } from "../../../infrastructure/entities/journal-entry.entity";
import { JournalDetails } from "../../contracts/dtos/journal-details.dto";
import { JournalEntryDetails } from "../../contracts/dtos/journal-entry-details.dto";
import { GetJournalQuery } from "../../contracts/queries/get-journal.query";

function formatCommandName(commandName: string): string {
  return commandName.replace(/Command$/, "");
}

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
          where: {
            created: And(LessThan(query.to), MoreThan(query.from)),
            userId,
          },
        },
      },
    );

    return map(JournalDetails, {
      entries: mapArray(JournalEntryDetails, foundJournalEntries, (entry) => ({
        commandName: formatCommandName(entry.commandName),
        created: entry.created,
        id: entry.id,
        payload: entry.payload,
      })),
    });
  }
}
