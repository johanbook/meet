import { EventBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { beforeEach, describe, expect, it, vi } from "src/test";
import { createEventBusMock, createMockRepository } from "src/test/mocks";

import { BlogPostService } from "../../../domain/services/blog-post.service";
import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { CreateBlogPostCommand } from "../../contracts/commands/create-blog-post.command";
import { CreateBlogPostHandler } from "./create-blog-post.handler";

describe(CreateBlogPostHandler.name, () => {
  let blogPosts: Repository<BlogPost>;
  let blogPostService: BlogPostService;
  let commandHandler: CreateBlogPostHandler;
  let eventBus: EventBus;

  beforeEach(() => {
    blogPosts = createMockRepository<BlogPost>();
    eventBus = createEventBusMock();

    const currentOrganizationService = {
      fetchCurrentOrganizationId: vi.fn(() => "my-organization-id"),
    } as any;

    const currentProfileService = {
      fetchCurrentProfileId: vi.fn(() => "my-profile-id"),
    } as any;

    const photoService = {} as any;

    blogPostService = new BlogPostService(blogPosts, eventBus);

    commandHandler = new CreateBlogPostHandler(
      blogPostService,
      currentOrganizationService,
      currentProfileService,
      photoService,
    );
  });

  describe("can create blog post", () => {
    it("should save changes to blog post", async () => {
      const command = map(CreateBlogPostCommand, { content: "my-post" });

      await commandHandler.execute(command);

      expect(blogPosts.save).toHaveBeenCalledWith({
        content: "my-post",
        organizationId: "my-organization-id",
        profileId: "my-profile-id",
      });
    });
  });
});
