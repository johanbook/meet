export class BlogPostReactionCreatedEvent {
  public readonly blogPostId!: string;

  public readonly organizationId!: number;

  public readonly profileId!: number;

  public readonly reactionId!: string;
}
