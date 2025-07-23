import { NotFoundException } from "@nestjs/common";

import { format } from "src/utils/string.helper";

export class EntityNotFoundError extends NotFoundException {
  constructor(entity: { name: string }) {
    super(`${format(entity.name)} not found`);
  }
}
