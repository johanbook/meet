import { IsBoolean, IsPositive } from "class-validator";

export class SwipeCommand {
  @IsBoolean()
  public liked!: boolean;

  @IsPositive()
  public profileId!: number;

  @IsPositive()
  public shownProfileId!: number;
}
