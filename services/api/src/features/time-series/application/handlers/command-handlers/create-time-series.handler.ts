import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CurrentOrganizationService } from "src/core/organizations";
import { CurrentProfileService } from "src/core/profiles";

import { TimeSeriesService } from "../../../domain/services/time-series.service";
import { TimeSeries } from "../../../infrastructure/entities/time-series.entity";
import { CreateTimeSeriesCommand } from "../../contracts/commands/create-time-series.command";

@CommandHandler(CreateTimeSeriesCommand)
export class CreateTimeSeriesHandler implements ICommandHandler<
  CreateTimeSeriesCommand,
  void
> {
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly currentProfileService: CurrentProfileService,
    private readonly timeSeriesService: TimeSeriesService,
  ) {}

  async execute(command: CreateTimeSeriesCommand): Promise<void> {
    const organizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();
    const profileId = await this.currentProfileService.fetchCurrentProfileId();

    const timeSeries = new TimeSeries();

    timeSeries.name = command.name;
    timeSeries.description = command.description;
    timeSeries.organizationId = organizationId;
    timeSeries.profileId = profileId;

    await this.timeSeriesService.createTimeSeries(timeSeries);
  }
}
