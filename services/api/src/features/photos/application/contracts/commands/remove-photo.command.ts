import { IsPositive } from "class-validator";

export class RemovePhotoCommand {
  @IsPositive()
  public id!: number;
}
