import { EventBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { createCurrentOrganizationServiceMock } from "src/core/organizations/test";
import { beforeEach, describe, expect, it, vi } from "src/test";
import { createEventBusMock, createMockRepository } from "src/test/mocks";

import { BlogPostService } from "../../../domain/services/blog-post.service";
import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { CreateBlogPostCommentCommand } from "../../contracts/commands/create-blog-post-comment.command";
import { CreateBlogPostCommentHandler } from "./create-blog-post-comment.handler";

describe(CreateBlogPostCommentHandler.name, () => {
  let blogPosts: Repository<BlogPost>;
  let blogPostService: BlogPostService;
  let commandHandler: CreateBlogPostCommentHandler;
  let eventBus: EventBus;

  beforeEach(() => {
    blogPosts = createMockRepository<BlogPost>();
    eventBus = createEventBusMock();

    const currentOrganizationService = createCurrentOrganizationServiceMock();

    const currentProfileService = {
      fetchCurrentProfileId: vi.fn(() => "my-profile-id"),
    } as any;

    blogPostService = new BlogPostService(blogPosts, eventBus);

    commandHandler = new CreateBlogPostCommentHandler(
      blogPosts,
      blogPostService,
      currentOrganizationService,
      currentProfileService,
    );
  });

  describe("can create blog post comment", () => {
    it("should save changes to blog post", async () => {
      const blogPost = await blogPosts.save(new BlogPost());
      blogPost.comments = [];

      const command = map(CreateBlogPostCommentCommand, {
        blogPostId: blogPost.id,
        content: "my-post",
      });

      await commandHandler.execute(command);

      expect(blogPost.comments).toHaveLength(1);

      const createdComment = blogPost.comments[0];
      expect(createdComment.blogPostId).toBe(blogPost.id);
      expect(createdComment.content).toBe("my-post");
    });
  });
});
