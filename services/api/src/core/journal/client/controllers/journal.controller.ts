import { Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { JournalDetails } from "../../application/contracts/dtos/journal-details.dto";
import { GetJournalQuery } from "../../application/contracts/queries/get-journal.query";

@Controller("journal")
@ApiTags("journal")
export class JournalController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getJournal(): Promise<JournalDetails> {
    return await this.queryBus.execute(new GetJournalQuery());
  }
}
