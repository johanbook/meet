import { Type } from "class-transformer";
import {
  Allow,
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsOptional,
  Length,
  ValidateNested,
} from "class-validator";

import { LOG_LEVELS, LogLevel } from "src/core/logging/logger.service";

class LoggingEvent {
  @IsIn(LOG_LEVELS)
  public readonly level!: LogLevel;

  @Length(0, 1024)
  public readonly msg!: string;

  @IsOptional()
  @Allow()
  public readonly props?: object;
}

export class LogEventsCommand {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => LoggingEvent)
  events: LoggingEvent[];
}
