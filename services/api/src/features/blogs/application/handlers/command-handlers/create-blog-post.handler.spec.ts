import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { createMockRepository } from "src/test/mocks/repository.mock";

import { BlogPostService } from "../../../domain/services/blog-post.service";
import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { CreateBlogPostCommand } from "../../contracts/commands/create-blog-post.command";
import { CreateBlogPostHandler } from "./create-blog-post.handler";

describe(CreateBlogPostHandler.name, () => {
  let blogPosts: Repository<BlogPost>;
  let blogPostService: BlogPostService;
  let commandHandler: CreateBlogPostHandler;

  beforeEach(() => {
    blogPosts = createMockRepository<BlogPost>();

    const currentOrganizationService = {
      fetchCurrentOrganizationId: jest.fn(() => "my-organization-id"),
    } as any;

    const currentProfileService = {
      fetchCurrentProfileId: jest.fn(() => "my-profile-id"),
    } as any;

    const photoService = {} as any;

    blogPostService = new BlogPostService(blogPosts);

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
