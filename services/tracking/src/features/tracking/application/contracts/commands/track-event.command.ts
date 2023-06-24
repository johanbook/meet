import { IsAlpha } from "class-validator";

export class TrackEventCommand {
  @IsAlpha()
  public readonly level!: "info";
}
