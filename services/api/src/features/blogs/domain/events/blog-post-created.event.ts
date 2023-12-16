export class BlogPostCreatedEvent {
  public readonly content!: string;

  public readonly id!: string;

  public readonly organizationId!: number;

  public readonly profileId!: number;
}
