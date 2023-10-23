export class BlogPostCommentCreatedEvent {
  public readonly content!: string;

  public readonly blogPostId!: string;

  public readonly id!: string;

  public readonly organizationId!: number;

  public readonly profileId!: number;
}
