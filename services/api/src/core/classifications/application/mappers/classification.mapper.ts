import { mapArray } from "src/utils/mapper";

import { Classification } from "../../infrastructure/entities/classification.entity";
import { ClassificationDetails } from "../contracts/dtos/classification.dto";

export function mapToClassificationDetails(
  classifications: Classification[],
): ClassificationDetails[] {
  return mapArray(ClassificationDetails, classifications, (classification) => ({
    id: classification.id,
    label: classification.label,
    parentUuid: classification.parentUuid,
    uuid: classification.uuid,
  }));
}
