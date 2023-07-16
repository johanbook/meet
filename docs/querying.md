# Filtering, sorting and pagination when querying data

**Filtering and sorting are currently under construction**

The system comes with builtin tools for pagination, filtering and sorting by
default.

## Guide

To enable pagination, extend the query class with the `BaseQuery` class like so

```ts
import { BaseQuery } from "src/core/query";

export class GetMonkiesQuery extends BaseQuery {}
```

and use the `QueryService` to fetch the desired data:

```ts
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { QueryService } from "src/core/query";

import { Monkies } from "../../../infrastructure/entities/monkey.entity";
import { MonkeyDetails } from "../../contracts/dtos/journal-details.dto";
import { GetMonkiesQuery } from "../../contracts/queries/get-monkies.query";
import { mapToMonkeyDetails } from "../../mappers/monkey.mapper";

@QueryHandler(GetMonkeyQuery)
export class GetMonkeyHandler
  implements IQueryHandler<GetMonkiesQuery, MonkeyDetails[]>
{
  constructor(
    @InjectRepository(Monkey)
    private readonly monkies: Repository<Monkey>,
    private readonly queryService: QueryService<MonkeyEntry>
  ) {}

  async execute(query: GetMonkiesQuery) {
    const foundMonkies = await this.queryService.find(this.monkies, query);

    return mapToMonkeyDetails({ entries: foundMonkies });
  }
}
```

This will automatically include and handle the pagination parameters.
