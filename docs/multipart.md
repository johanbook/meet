# Receiving multipart files via HTTP REST

The system supports receiving binary files via the HTTP REST multipart standard.

Multipart requests are parsed using
[@fastify/multipart](https://github.com/fastify/fastify-multipart). By default,
they are accumulated in memory which allows using similar command declarations
for JSON and Multipart requests. However, if there is need for larger file
uploads, it is recommended to create a separate service to handle this.

## Guide

Files are declared in the command using the `BinaryFile` or `BinaryFileArray`
decorators from `sr/core/multipart` as shown below:

```ts
import { IsOptional, Length } from "class-validator";

import { BinaryFileArray } from "src/core/multipart";
import { IStorableObject } from "src/core/object-storage";

export class CreateBlogPostCommand {
  @Length(1, 2048)
  content!: string;

  @IsOptional()
  @BinaryFileArray()
  photos?: IStorableObject[];
}
```

This command can then be used in the controller standard manner by as done
below. The only difference is that the `Multipart` decorator is used on the
method.

```ts
import { Body, Controller, Post, Query } from "@nestjs/common";
import { CommandBus,  from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { Multipart } from "src/core/multipart";

import { CreateBlogPostCommand } from "../../application/contracts/commands/create-blog-post.command";

@Controller("blogs")
@ApiTags("blogs")
export class BlogsController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  @Multipart()
  async createBlogPost(@Body() command: CreateBlogPostCommand): Promise<null> {
    return await this.commandBus.execute(command);
  }
}
```
