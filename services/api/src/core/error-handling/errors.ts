export abstract class BaseError extends Error {}

export class ApplicationError extends BaseError {}
export class ConfigurationError extends BaseError {}
export class MigrationError extends BaseError {}
