import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { CurrentOrganizationService } from "src/core/organizations";
import { TimeSeries } from "src/features/time-series/infrastructure/entities/time-series.entity";

import { TimeSeriesDetails } from "../../contracts/dtos/time-series.dto";
import { GetTimeSeriesQuery } from "../../contracts/queries/get-time-series.query";

@QueryHandler(GetTimeSeriesQuery)
export class GetTimeSeriesHandler
  implements IQueryHandler<GetTimeSeriesQuery, TimeSeriesDetails>
{
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    @InjectRepository(TimeSeries)
    private readonly timeSeries: Repository<TimeSeries>,
  ) {}

  async execute(query: GetTimeSeriesQuery) {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const timeSeries = await this.timeSeries.findOne({
      where: {
        id: query.id,
        organizationId: currentOrganizationId,
      },
    });

    if (!timeSeries) {
      throw new NotFoundException("Time series not found");
    }

    return map(TimeSeriesDetails, {
      createdAt: timeSeries.createdAt.toISOString(),
      description: timeSeries.description,
      name: timeSeries.name,
      id: timeSeries.id,
    });
  }
}
