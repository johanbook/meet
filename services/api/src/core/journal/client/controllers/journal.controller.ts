import { Controller, Get, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { JournalDetails } from "../../application/contracts/dtos/journal-details.dto";
import { GetCurrentOrganizationJournalQuery } from "../../application/contracts/queries/get-current-organization-journal.query";
import { GetProfileJournalQuery } from "../../application/contracts/queries/get-profile-journal.query";

@Controller("journal")
@ApiTags("journal")
export class JournalController {
  constructor(private queryBus: QueryBus) {}

  @Get("/current-organization")
  async getCurrentOrganizationJournal(
    @Query() query: GetCurrentOrganizationJournalQuery,
  ): Promise<JournalDetails> {
    return await this.queryBus.execute(query);
  }

  @Get("/profile")
  async getProfileJournal(
    @Query() query: GetProfileJournalQuery,
  ): Promise<JournalDetails> {
    return await this.queryBus.execute(query);
  }
}
