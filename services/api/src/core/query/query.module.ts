import { Module } from "@nestjs/common";

import { QueryService } from "./domain/services/query.service";

@Module({
  exports: [QueryService],
  imports: [],
  controllers: [],
  providers: [QueryService],
})
export class QueryModule {}
