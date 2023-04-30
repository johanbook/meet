import { IsBoolean, IsPositive } from "class-validator";

export class SwipeCommand {
  @IsBoolean()
  public liked!: boolean;

  @IsPositive()
  public shownProfileId!: number;
}
