import { IsDefined } from "class-validator";
import { Readable as ReadableStream } from "node:stream";

export class AddPhotoCommand {
  @IsDefined()
  public photo!: Buffer | ReadableStream;
}
