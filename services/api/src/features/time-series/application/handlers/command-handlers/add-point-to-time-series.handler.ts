import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AuthorizationService } from "src/core/authorization";
import { EntityNotFoundError } from "src/core/error-handling";
import { CurrentProfileService } from "src/core/profiles";

import { TimeSeriesService } from "../../../domain/services/time-series.service";
import { TimeSeriesPoint } from "../../../infrastructure/entities/time-series-point.entity";
import { TimeSeries } from "../../../infrastructure/entities/time-series.entity";
import { AddPointToTimeSeriesCommand } from "../../contracts/commands/add-point-to-time-series.command";

@CommandHandler(AddPointToTimeSeriesCommand)
export class AddPointToTimeSeriesHandler
  implements ICommandHandler<AddPointToTimeSeriesCommand, void>
{
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly currentProfileService: CurrentProfileService,
    @InjectRepository(TimeSeries)
    private readonly timeSeries: Repository<TimeSeries>,
    private readonly timeSeriesService: TimeSeriesService,
  ) {}

  async execute(command: AddPointToTimeSeriesCommand): Promise<void> {
    const timeSeries = await this.timeSeries.findOne({
      relations: {
        points: true,
      },
      where: {
        id: command.timeSeriesId,
      },
    });

    if (!timeSeries) {
      throw new EntityNotFoundError(TimeSeries);
    }

    await this.authorizationService.authorizeOwnerOrAdmin(timeSeries);

    const profileId = await this.currentProfileService.fetchCurrentProfileId();

    const point = new TimeSeriesPoint();
    point.value = command.value;
    point.description = command.description;
    point.label = command.label;
    point.profileId = profileId;

    await this.timeSeriesService.addPointToTimeSeries(point, timeSeries);
  }
}
