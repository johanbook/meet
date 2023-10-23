import { Type } from "class-transformer";
import { IsDate } from "class-validator";

import { BaseQuery } from "src/core/query";

export class GetJournalQuery extends BaseQuery {
  @IsDate()
  @Type(() => Date)
  from!: Date;

  @IsDate()
  @Type(() => Date)
  to!: Date;
}
