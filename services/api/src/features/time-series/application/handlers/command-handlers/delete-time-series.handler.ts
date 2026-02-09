import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AuthorizationService } from "src/core/authorization";
import { EntityNotFoundError } from "src/core/error-handling";

import { TimeSeries } from "../../../infrastructure/entities/time-series.entity";
import { DeleteTimeSeriesCommand } from "../../contracts/commands/delete-time-series.command";

@CommandHandler(DeleteTimeSeriesCommand)
export class DeleteTimeSeriesHandler implements ICommandHandler<
  DeleteTimeSeriesCommand,
  void
> {
  constructor(
    private readonly authorizationService: AuthorizationService,
    @InjectRepository(TimeSeries)
    private readonly timeSeries: Repository<TimeSeries>,
  ) {}

  async execute(command: DeleteTimeSeriesCommand) {
    const timeSeries = await this.timeSeries.findOne({
      where: { id: command.id },
    });

    if (!timeSeries) {
      throw new EntityNotFoundError(TimeSeries);
    }

    await this.authorizationService.authorizeOwnerOrAdmin(timeSeries);

    await this.timeSeries.remove(timeSeries);
  }
}
