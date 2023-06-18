import { Repository } from "typeorm";

import { ClassificationService } from "src/core/classifications/domain/services/classification.service";
import { Classification } from "src/core/classifications/infrastructure/entities/classification.entity";
import { createMockRepository } from "src/test/mocks/repository.mock";
import { map } from "src/utils/mapper";

import { GetClassificationsByCategoryQuery } from "../../contracts/queries/get-classifications-by-category.query";
import { GetClassificationsByCategoryHandler } from "./get-classifications-by-category.handler";

describe(GetClassificationsByCategoryHandler.name, () => {
  let classifications: Repository<Classification>;
  let classificationService: ClassificationService;
  let queryHandler: GetClassificationsByCategoryHandler;

  let classification1: Classification;

  beforeEach(() => {
    classification1 = { id: 1 } as any;
    classifications = createMockRepository([classification1]);

    classificationService = new ClassificationService(classifications);
    queryHandler = new GetClassificationsByCategoryHandler(
      classificationService,
    );
  });

  describe("execute", () => {
    it("should return chat messages", async () => {
      const query = map(GetClassificationsByCategoryQuery, {
        category: "my-category",
      });

      const result = await queryHandler.execute(query);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });
  });
});
