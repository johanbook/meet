import { Controller, Get, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { ClassificationDetails } from "../../application/contracts/dtos/classification.dto";
import { GetClassificationsByCategoryQuery } from "../../application/contracts/queries/get-classifications-by-category.query";

@Controller("classifications")
@ApiTags("classifications")
export class ClassificationsController {
  constructor(private queryBus: QueryBus) {}

  @Get("/byCategory")
  async getClassifications(
    @Query() query: GetClassificationsByCategoryQuery,
  ): Promise<ClassificationDetails[]> {
    return await this.queryBus.execute(query);
  }
}
