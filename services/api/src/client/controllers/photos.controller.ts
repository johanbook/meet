import { BadRequestException, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";

import { UserId } from "../decorators/userId.decorator";
import { AddPhotoCommand } from "src/application/photos/contracts/add-photo.command";
import { UploadedFile } from "../decorators/UploadedFile";
import { MultipartFile } from "@fastify/multipart";

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
  async addPhoto(
    @UploadedFile() file: MultipartFile,
    @UserId() userId: string,
  ): Promise<null> {
    if (!file.mimetype.startsWith("image")) {
      throw new BadRequestException("Invalid file format");
    }

    const command = new AddPhotoCommand();
    command.photo = file.file;
    command.userId = userId;
    return await this.commandBus.execute(command);
  }
}
