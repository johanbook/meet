import { Injectable } from "@nestjs/common";
import { FindManyOptions, ObjectLiteral, Repository } from "typeorm";

import { BaseQuery } from "../../application/contracts/queries/base.query";

@Injectable()
export class QueryService<T extends ObjectLiteral> {
  async find(
    repository: Repository<T>,
    query: BaseQuery,
    options?: FindManyOptions<T>,
  ): Promise<T[]> {
    return repository.find({ skip: query.skip, take: query.top, ...options });
  }
}
