import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TimeSeries } from "../../../infrastructure/entities/time-series.entity";
import { UpdateTimeSeriesCommand } from "../../contracts/commands/update-time-series.command";

@CommandHandler(UpdateTimeSeriesCommand)
export class UpdateTimeSeriesHandler
  implements ICommandHandler<UpdateTimeSeriesCommand, void>
{
  constructor(
    @InjectRepository(TimeSeries)
    private readonly timeSeries: Repository<TimeSeries>,
  ) {}

  async execute(command: UpdateTimeSeriesCommand) {
    const timeSeries = await this.timeSeries.findOne({
      where: { id: command.id },
    });

    if (!timeSeries) {
      throw new NotFoundException("Time series not found");
    }

    timeSeries.name = command.name;
    timeSeries.description = command.description;

    await this.timeSeries.save(timeSeries);
  }
}
