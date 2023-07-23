# Receiving multipart files via HTTP REST

The system supports receiving binary files via the HTTP REST multipart standard.

## Guide

The controller can be setup as following:

```ts
import { Body, Controller, Delete, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { map } from "src/core/mapper";
import { Multipart, MultipartFile, UploadedFile } from "src/core/multipart";

import { AddMonkeyFileCommand } from "../../application/contracts/commands/add-monkey-file.command";

@Controller("monkies")
@ApiTags("monkies")
export class MonkeyController {
  constructor(private commandBus: CommandBus) {}

  @Post("addMonkeyFile")
  @Multipart({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  async addMonkeyFile(
    @UploadedFile() multipartFile: MultipartFile
  ): Promise<null> {
    const command = map(AddMonkeyFileCommand, { file: multipartFile.file });
    return await this.commandBus.execute(command);
  }
}
```

It is also possible to use more specific file decorators that will also perform
additional MIME type checks:

- `UploadedImage` for binary images
