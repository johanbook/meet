import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AuthorizationService } from "src/core/authorization";
import { EntityNotFoundError } from "src/core/error-handling";

import { TimeSeriesPoint } from "../../../infrastructure/entities/time-series-point.entity";
import { TimeSeries } from "../../../infrastructure/entities/time-series.entity";
import { DeleteTimeSeriesPointCommand } from "../../contracts/commands/delete-time-series-point.command";

@CommandHandler(DeleteTimeSeriesPointCommand)
export class DeleteTimeSeriesPointHandler
  implements ICommandHandler<DeleteTimeSeriesPointCommand, void>
{
  constructor(
    private readonly authorizationService: AuthorizationService,
    @InjectRepository(TimeSeries)
    private readonly timeSeries: Repository<TimeSeries>,
    @InjectRepository(TimeSeriesPoint)
    private readonly timeSeriesPoints: Repository<TimeSeriesPoint>,
  ) {}

  async execute(command: DeleteTimeSeriesPointCommand): Promise<void> {
    const timeSeries = await this.timeSeries.findOne({
      where: { id: command.timeSeriesId },
    });

    if (!timeSeries) {
      throw new EntityNotFoundError(TimeSeries);
    }

    await this.authorizationService.authorizeOwnerOrAdmin(timeSeries);

    const point = await this.timeSeriesPoints.findOne({
      where: { id: command.pointId, timeSeriesId: command.timeSeriesId },
    });

    if (!point) {
      throw new EntityNotFoundError(TimeSeriesPoint);
    }

    await this.timeSeriesPoints.remove(point);
  }
}
