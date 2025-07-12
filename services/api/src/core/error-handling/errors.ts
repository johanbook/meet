import { NotFoundException } from "@nestjs/common";

export abstract class BaseError extends Error {}

export class ApplicationError extends BaseError {}
export class ConfigurationError extends BaseError {}
export class MigrationError extends BaseError {}

export class EntityNotFoundError extends NotFoundException {
  constructor(entity: { name: string }) {
    super(`${entity.name} was not found`);
  }
}
