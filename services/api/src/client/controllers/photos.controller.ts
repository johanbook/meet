import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { UserId } from "../decorators/userId.decorator";
import { AddPhotoCommand } from "src/application/photos/contracts/add-photo.command";

@Controller("photos")
@ApiTags("photos")
export class PhotosController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post("add")
  async addPhoto(
    @Body() command: AddPhotoCommand,
    @UserId() userId: string,
  ): Promise<null> {
    command.userId = userId;
    return await this.commandBus.execute(command);
  }
}
