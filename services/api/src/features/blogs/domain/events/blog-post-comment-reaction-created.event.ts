export class BlogPostCommentReactionCreatedEvent {
  public readonly blogPostCommentId!: string;

  public readonly organizationId!: number;

  public readonly profileId!: number;

  public readonly reactionId!: string;
}
