import { Controller, Get, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { InfoDetails } from "../../application/contracts/dtos/info.dto";
import { GetInfoQuery } from "../../application/contracts/queries/get-info.query";

@Controller("organizations/info")
@ApiTags("organizations")
export class InfoController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getInfo(@Query() query: GetInfoQuery): Promise<InfoDetails> {
    return await this.queryBus.execute(query);
  }
}
