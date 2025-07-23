import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EntityNotFoundError } from "src/core/error-handling";
import { map, mapArray } from "src/core/mapper";
import { CurrentOrganizationService } from "src/core/organizations";
import { TimeSeries } from "src/features/time-series/infrastructure/entities/time-series.entity";
import { uniqify } from "src/utils/array.helper";

import { TimeSeriesPointDetails } from "../../contracts/dtos/time-series-point.dto";
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
      order: {
        points: {
          createdAt: "DESC",
        },
      },
      relations: {
        points: true,
      },
      where: {
        id: query.id,
        organizationId: currentOrganizationId,
      },
    });

    if (!timeSeries) {
      throw new EntityNotFoundError(TimeSeries);
    }

    const labels = uniqify(timeSeries.points.map((point) => point.label));

    return map(TimeSeriesDetails, {
      aggregation: timeSeries.aggregation,
      createdAt: timeSeries.createdAt.toISOString(),
      description: timeSeries.description,
      labels,
      name: timeSeries.name,
      id: timeSeries.id,
      points: mapArray(TimeSeriesPointDetails, timeSeries.points, (point) => ({
        createdAt: point.createdAt.toISOString(),
        description: point.description,
        label: point.label,
        id: point.id,
        value: point.value,
      })),
    });
  }
}
