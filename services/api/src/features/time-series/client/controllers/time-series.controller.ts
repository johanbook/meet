import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

import { AddPointToTimeSeriesCommand } from "../../application/contracts/commands/add-point-to-time-series.command";
import { CreateTimeSeriesCommand } from "../../application/contracts/commands/create-time-series.command";
import { DeleteTimeSeriesPointCommand } from "../../application/contracts/commands/delete-time-series-point.command";
import { DeleteTimeSeriesCommand } from "../../application/contracts/commands/delete-time-series.command";
import { UpdateTimeSeriesPointCommand } from "../../application/contracts/commands/update-time-series-point.command";
import { UpdateTimeSeriesCommand } from "../../application/contracts/commands/update-time-series.command";
import { TimeSeriesListItem } from "../../application/contracts/dtos/time-series-list-item.dto";
import { TimeSeriesDetails } from "../../application/contracts/dtos/time-series.dto";
import { GetTimeSeriesListQuery } from "../../application/contracts/queries/get-time-series-list.query";
import { GetTimeSeriesQuery } from "../../application/contracts/queries/get-time-series.query";

@Controller("time-series")
@ApiTags("time-series")
export class TimeSeriesController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  async getTimeSeries(
    @Query() query: GetTimeSeriesListQuery,
  ): Promise<TimeSeriesListItem[]> {
    return await this.queryBus.execute(query);
  }

  @Get("byId")
  async getTimeSeriesById(
    @Query() query: GetTimeSeriesQuery,
  ): Promise<TimeSeriesDetails> {
    return await this.queryBus.execute(query);
  }

  @Post()
  async createTimeSeries(
    @Body() command: CreateTimeSeriesCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Post("/points")
  async addPointToTimeSeries(
    @Body() command: AddPointToTimeSeriesCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Patch()
  async updateTimeSeries(
    @Body() command: UpdateTimeSeriesCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Patch("/points")
  async updateTimeSeriesPoint(
    @Body() command: UpdateTimeSeriesPointCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Delete()
  async deleteTimeSeries(
    @Body() command: DeleteTimeSeriesCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }

  @Delete("/points")
  async deleteTimeSeriesPoint(
    @Body() command: DeleteTimeSeriesPointCommand,
  ): Promise<null> {
    return await this.commandBus.execute(command);
  }
}
