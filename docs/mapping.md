# Response and request mapping

When receiving requests and sending responses, it is important to map the data
from one format to another.

## Guide

When receiving requests over HTTP REST, the requests are automatically mapped
and validated when using a standard controller like so

```ts
import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { CreateMonkeyCommand } from "../../application/contracts/commands/create-monkey.command";
import { MonkeyDetails } from "../../application/contracts/dtos/monkey.dto";
import { GetCurrentMonkeyQuery } from "../../application/contracts/queries/get-current-monkey.query";

@Controller("monkies")
@ApiTags("monkies")
export class MonkeyController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getCurrentMonkey(
    @Query() query: GetCurrentMonkeyQuery
  ): Promise<MonkeyDetails> {
    return await this.queryBus.execute(query);
  }

  @Post("/create")
  async createMonkey(@Body() command: CreateMonkeyCommand): Promise<null> {
    return await this.commandBus.execute(command);
  }
}
```

When constructing commands, queries or events in other occasions, this should be
done using the `mapAndValidate` method like so

```ts
import { mapAndValidate } from "src/core/mapper";

import { CreateMonkeyCommand } from "../../application/contracts/commands/create-monkey.command";

async function doStuff(): Promise<void> {
  const myCommand = await mapAndValidate(CreateMonkeyCommand, {
    name: "my-name",
  });

  doStuffWithCommand(myCommand);
}
```

For constructing response models, the non-validating method `map` can be used
instead.
