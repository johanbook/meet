import { EventBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { createCurrentOrganizationServiceMock } from "src/core/organizations/test";
import { beforeEach, describe, expect, it, vi } from "src/test";
import { createEventBusMock, createMockRepository } from "src/test/mocks";

import { BlogPostService } from "../../../domain/services/blog-post.service";
import { BlogPostComment } from "../../../infrastructure/entities/blog-post-comment.entity";
import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { CreateBlogPostCommentReactionCommand } from "../../contracts/commands/create-blog-post-comment-reaction.command";
import { CreateBlogPostCommentReactionHandler } from "./create-blog-post-comment-reaction.handler";

describe(CreateBlogPostCommentReactionHandler.name, () => {
  let blogPostComments: Repository<BlogPostComment>;
  let blogPostService: BlogPostService;
  let commandHandler: CreateBlogPostCommentReactionHandler;
  let eventBus: EventBus;

  beforeEach(() => {
    blogPostComments = createMockRepository<BlogPostComment>();
    const blogPosts = createMockRepository<BlogPost>();
    eventBus = createEventBusMock();

    const currentOrganizationService = createCurrentOrganizationServiceMock();

    const currentProfileService = {
      fetchCurrentProfileId: vi.fn(() => "my-profile-id"),
    } as any;

    blogPostService = new BlogPostService(
      blogPosts,
      blogPostComments,
      eventBus,
    );

    commandHandler = new CreateBlogPostCommentReactionHandler(
      blogPostComments,
      blogPostService,
      currentOrganizationService,
      currentProfileService,
    );
  });

  describe("can create blog post comment reaction", () => {
    it("should throw if blog post comment not found", async () => {
      const command = map(CreateBlogPostCommentReactionCommand, {
        blogPostCommentId: "non-existent-id",
        reaction: "like",
      });

      await expect(commandHandler.execute(command)).rejects.toHaveProperty(
        "message",
        "Blog post comment not found",
      );
    });

    it("should save changes to blog post comment", async () => {
      const blogPost = new BlogPost();
      blogPost.organizationId = 1;

      const blogPostComment = await blogPostComments.save(
        new BlogPostComment(),
      );
      blogPostComment.reactions = [];
      blogPostComment.blogPost = blogPost;

      const command = map(CreateBlogPostCommentReactionCommand, {
        blogPostCommentId: blogPostComment.id,
        reaction: "like",
      });

      await commandHandler.execute(command);

      expect(blogPostComment.reactions).toHaveLength(1);

      const createdReaction = blogPostComment.reactions[0];
      expect(createdReaction.blogPostCommentId).toBe(blogPostComment.id);
      expect(createdReaction.reaction).toBe("like");
      expect(createdReaction.profileId).toBe("my-profile-id");
    });
  });
});
