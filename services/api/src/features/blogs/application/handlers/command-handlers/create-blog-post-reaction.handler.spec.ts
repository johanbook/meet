import { EventBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { createCurrentOrganizationServiceMock } from "src/core/organizations/test";
import { beforeEach, describe, expect, it, vi } from "src/test";
import { createEventBusMock, createMockRepository } from "src/test/mocks";

import { BlogPostService } from "../../../domain/services/blog-post.service";
import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { CreateBlogPostReactionCommand } from "../../contracts/commands/create-blog-post-reaction.command";
import { CreateBlogPostReactionHandler } from "./create-blog-post-reaction.handler";

describe(CreateBlogPostReactionHandler.name, () => {
  let blogPosts: Repository<BlogPost>;
  let blogPostService: BlogPostService;
  let commandHandler: CreateBlogPostReactionHandler;
  let eventBus: EventBus;

  beforeEach(() => {
    blogPosts = createMockRepository<BlogPost>();
    eventBus = createEventBusMock();

    const currentOrganizationService = createCurrentOrganizationServiceMock();

    const currentProfileService = {
      fetchCurrentProfileId: vi.fn(() => "my-profile-id"),
    } as any;

    blogPostService = new BlogPostService(blogPosts, eventBus);

    commandHandler = new CreateBlogPostReactionHandler(
      blogPosts,
      blogPostService,
      currentOrganizationService,
      currentProfileService,
    );
  });

  describe("can create blog post reaction", () => {
    it("should save changes to blog post", async () => {
      const blogPost = await blogPosts.save(new BlogPost());
      blogPost.reactions = [];

      const command = map(CreateBlogPostReactionCommand, {
        blogPostId: blogPost.id,
        reaction: "like",
      });

      await commandHandler.execute(command);

      expect(blogPost.reactions).toHaveLength(1);

      const createdReaction = blogPost.reactions[0];
      expect(createdReaction.blogPostId).toBe(blogPost.id);
      expect(createdReaction.reaction).toBe("like");
    });
  });
});
