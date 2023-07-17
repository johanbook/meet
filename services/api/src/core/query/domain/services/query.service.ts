import { Injectable } from "@nestjs/common";
import { FindManyOptions, ObjectLiteral, Repository } from "typeorm";

import { BaseQuery } from "../../application/contracts/queries/base.query";

interface FindProps<T> {
  default?: FindManyOptions<T>;
  query: BaseQuery;
  required?: FindManyOptions<T>;
}

@Injectable()
export class QueryService<T extends ObjectLiteral> {
  async find(repository: Repository<T>, props: FindProps<T>): Promise<T[]> {
    return repository.find({
      ...props.default,
      skip: props.query.skip,
      take: props.query.top,
      ...props.required,
    });
  }
}
