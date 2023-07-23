import { MultipartFile } from "@fastify/multipart";
import { Body, Controller, Delete, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { Multipart, UploadedImage } from "src/core/multipart";

import { RemovePhotoCommand } from "../..//application/contracts/commands/remove-photo.command";
import { AddPhotoCommand } from "../../application/contracts/commands/add-photo.command";

@Controller("photos")
@ApiTags("photos")
export class PhotosController {
  constructor(private commandBus: CommandBus) {}

  @Post("add")
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
  async addPhoto(@UploadedImage() file: MultipartFile): Promise<null> {
    const command = new AddPhotoCommand();
    command.photo = file.file;
    return await this.commandBus.execute(command);
  }

  @Delete()
  async removePhoto(@Body() command: RemovePhotoCommand): Promise<null> {
    return await this.commandBus.execute(command);
  }
}
