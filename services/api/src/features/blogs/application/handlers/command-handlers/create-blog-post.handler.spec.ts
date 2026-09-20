import { EventBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { beforeEach, describe, expect, it, vi } from "src/test";
import { createEventBusMock, createMockRepository } from "src/test/mocks";

import { BlogPostService } from "../../../domain/services/blog-post.service";
import { BlogPostComment } from "../../../infrastructure/entities/blog-post-comment.entity";
import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { CreateBlogPostCommand } from "../../contracts/commands/create-blog-post.command";
import { CreateBlogPostHandler } from "./create-blog-post.handler";

describe(CreateBlogPostHandler.name, () => {
  let blogPosts: Repository<BlogPost>;
  let blogPostService: BlogPostService;
  let commandHandler: CreateBlogPostHandler;
  let eventBus: EventBus;
  let photoService: any;

  beforeEach(() => {
    blogPosts = createMockRepository<BlogPost>();
    const blogPostComments = createMockRepository<BlogPostComment>();
    eventBus = createEventBusMock();

    const currentOrganizationService = {
      fetchCurrentOrganizationId: vi.fn(() => "my-organization-id"),
    } as any;

    const currentProfileService = {
      fetchCurrentProfileId: vi.fn(() => "my-profile-id"),
    } as any;

    photoService = {
      resize: vi.fn(),
      uploadPhoto: vi.fn(),
    } as any;

    blogPostService = new BlogPostService(
      blogPosts,
      blogPostComments,
      eventBus,
    );

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

  describe("can create blog post with photos", () => {
    it("should save photos with an order matching addition order", async () => {
      photoService.resize.mockResolvedValue(Buffer.from("resized-photo"));
      photoService.uploadPhoto.mockImplementation(() => ({}));

      const command = map(CreateBlogPostCommand, {
        content: "my-post",
        photos: [
          Buffer.from("photo-1"),
          Buffer.from("photo-2"),
          Buffer.from("photo-3"),
        ],
      });

      await commandHandler.execute(command);

      expect(blogPosts.save).toHaveBeenCalledWith({
        content: "my-post",
        organizationId: "my-organization-id",
        profileId: "my-profile-id",
        photos: [
          { profileId: "my-profile-id", order: 0 },
          { profileId: "my-profile-id", order: 1 },
          { profileId: "my-profile-id", order: 2 },
        ],
      });
    });
  });
});
