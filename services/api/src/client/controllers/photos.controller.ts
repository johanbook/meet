import { MultipartFile } from "@fastify/multipart";
import { Body, Controller, Delete, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";

import { AddPhotoCommand } from "src/application/photos/contracts/add-photo.command";
import { RemovePhotoCommand } from "src/application/photos/contracts/remove-photo.command";

import { UploadedImage } from "../decorators/uploaded-image.decorator";

@Controller("photos")
@ApiTags("photos")
export class PhotosController {
  constructor(private commandBus: CommandBus) {}

  @Post("add")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
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
