import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";

import { map, mapArray } from "src/core/mapper";
import { CurrentOrganizationService } from "src/core/organizations";
import { QueryService } from "src/core/query";

import { JournalEntry } from "../../../infrastructure/entities/journal-entry.entity";
import { JournalDetails } from "../../contracts/dtos/journal-details.dto";
import { JournalEntryDetails } from "../../contracts/dtos/journal-entry-details.dto";
import { JournalProfileDetails } from "../../contracts/dtos/journal-profile-details.dto";
import { GetCurrentOrganizationJournalQuery } from "../../contracts/queries/get-current-organization-journal.query";

function formatCommandName(commandName: string): string {
  return commandName.replace(/Command$/, "");
}

@QueryHandler(GetCurrentOrganizationJournalQuery)
export class GetCurrentOrganizationJournalHandler
  implements IQueryHandler<GetCurrentOrganizationJournalQuery, JournalDetails>
{
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    @InjectRepository(JournalEntry)
    private readonly journalEntries: Repository<JournalEntry>,
    private readonly queryService: QueryService<JournalEntry>,
  ) {}

  async execute(query: GetCurrentOrganizationJournalQuery) {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const foundJournalEntries = await this.queryService.find(
      this.journalEntries,
      {
        default: {
          order: { createdAt: "desc" },
        },
        query,
        required: {
          where: {
            createdAt: Between(query.from, query.to),
            organizationId: currentOrganizationId,
          },
        },
      },
    );

    return map(JournalDetails, {
      entries: mapArray(JournalEntryDetails, foundJournalEntries, (entry) => ({
        commandName: formatCommandName(entry.commandName),
        createdAt: entry.createdAt,
        id: entry.id,
        payload: entry.payload,
        profile: map(JournalProfileDetails, {
          id: entry.profileId,
        }),
      })),
    });
  }
}
