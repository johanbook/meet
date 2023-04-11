import { ApiHideProperty } from "@nestjs/swagger";
import { IsDefined } from "class-validator";
import { Readable as ReadableStream } from "stream";

export class AddPhotoCommand {
  @IsDefined()
  public photo!: Buffer | ReadableStream;

  @ApiHideProperty()
  public userId!: string;
}
