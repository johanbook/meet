import { AggregateRoot } from "@nestjs/cqrs";

export class Profile extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly description: string,
    private readonly name: string,
    private readonly userId: string,
  ) {
    super();
  }

  updateDescription(description: string): void {}
}
