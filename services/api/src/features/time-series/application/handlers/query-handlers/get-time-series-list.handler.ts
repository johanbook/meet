import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { mapArray } from "src/core/mapper";
import { CurrentOrganizationService } from "src/core/organizations";
import { QueryService } from "src/core/query";
import { TimeSeries } from "src/features/time-series/infrastructure/entities/time-series.entity";

import { TimeSeriesListItem } from "../../contracts/dtos/time-series-list-item.dto";
import { GetTimeSeriesListQuery } from "../../contracts/queries/get-time-series-list.query";

@QueryHandler(GetTimeSeriesListQuery)
export class GetTimeSeriesListHandler implements IQueryHandler<
  GetTimeSeriesListQuery,
  TimeSeriesListItem[]
> {
  constructor(
    private readonly currentOrganizationService: CurrentOrganizationService,
    @InjectRepository(TimeSeries)
    private readonly timeSeries: Repository<TimeSeries>,
    private readonly queryService: QueryService<TimeSeries>,
  ) {}

  async execute(query: GetTimeSeriesListQuery) {
    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const foundTimeSeries = await this.queryService.find(this.timeSeries, {
      default: {
        order: {
          name: "asc",
        },
      },
      query,
      required: {
        where: {
          organizationId: currentOrganizationId,
        },
      },
    });

    return mapArray(TimeSeriesListItem, foundTimeSeries, (timeSeries) => ({
      createdAt: timeSeries.createdAt.toISOString(),
      description: timeSeries.description,
      name: timeSeries.name,
      id: timeSeries.id,
    }));
  }
}
