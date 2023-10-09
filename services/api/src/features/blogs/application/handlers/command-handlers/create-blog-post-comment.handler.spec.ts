import { EventBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { CurrentOrganizationService } from "src/features/organizations";
import { createCurrentOrganizationMock } from "src/features/organizations/test/mocks/current-organization.service.mock";
import { createEventBusMock, createMockRepository } from "src/test/mocks";

import { BlogPostService } from "../../../domain/services/blog-post.service";
import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { CreateBlogPostCommentCommand } from "../../contracts/commands/create-blog-post-comment.command";
import { CreateBlogPostCommentHandler } from "./create-blog-post-comment.handler";

describe(CreateBlogPostCommentHandler.name, () => {
  let blogPosts: Repository<BlogPost>;
  let blogPostService: BlogPostService;
  let currentOrganizationService: CurrentOrganizationService;

  let commandHandler: CreateBlogPostCommentHandler;
  let eventBus: EventBus;

  beforeEach(() => {
    blogPosts = createMockRepository<BlogPost>();
    eventBus = createEventBusMock();

    currentOrganizationService = createCurrentOrganizationMock();

    const currentProfileService = {
      fetchCurrentProfileId: jest.fn(() => "my-profile-id"),
    } as any;

    blogPostService = new BlogPostService(blogPosts, eventBus);

    commandHandler = new CreateBlogPostCommentHandler(
      blogPosts,
      blogPostService,
      currentOrganizationService,
      currentProfileService,
    );
  });

  describe("can create blog post", () => {
    it("should save changes to blog post", async () => {
      const blogPost = await blogPosts.save(new BlogPost());
      blogPost.comments = [];

      const command = map(CreateBlogPostCommentCommand, {
        blogPostId: blogPost.id,
        content: "my-post",
      });

      await commandHandler.execute(command);

      expect(blogPosts.save).toHaveBeenCalledWith({});
    });
  });
});
