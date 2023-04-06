import { ApiHideProperty } from "@nestjs/swagger";

export class AddPhotoCommand {
  public readonly photo!: string;

  @ApiHideProperty()
  public userId!: string;
}
