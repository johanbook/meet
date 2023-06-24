import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsAlpha,
  IsArray,
  Length,
  ValidateNested,
} from "class-validator";

class TrackingEvent {
  @IsAlpha()
  @Length(0, 128)
  public readonly eventName!: string;

  @Length(0, 1024)
  public readonly message!: string;

  public readonly props?: object;
}

export class TrackEventsCommand {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TrackingEvent)
  events: TrackingEvent[];
}
