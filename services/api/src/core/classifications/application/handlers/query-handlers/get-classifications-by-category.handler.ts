import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { ClassificationService } from "src/core/classifications/domain/services/classification.service";

import { ClassificationDetails } from "../../contracts/dtos/classification.dto";
import { GetClassificationsByCategoryQuery } from "../../contracts/queries/get-classifications-by-category.query";
import { mapToClassificationDetails } from "../../mappers/classification.mapper";

@QueryHandler(GetClassificationsByCategoryQuery)
export class GetClassificationsByCategoryHandler
  implements
    IQueryHandler<GetClassificationsByCategoryQuery, ClassificationDetails[]>
{
  constructor(private readonly classificationService: ClassificationService) {}

  async execute(query: GetClassificationsByCategoryQuery) {
    const matchingClassifications =
      await this.classificationService.fetchClassificationsByCategory({
        category: query.category,
        includeManual: query.includeManual,
        includeObsolete: query.includeObsolete,
        locale: query.locale || "en-US",
        parentUuid: query.parentUuid,
      });

    return mapToClassificationDetails(matchingClassifications);
  }
}
