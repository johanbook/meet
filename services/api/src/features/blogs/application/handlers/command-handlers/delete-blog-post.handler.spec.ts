import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { beforeEach, describe, expect, it, vi } from "src/test";
import { createMockRepository } from "src/test/mocks/repository.mock";

import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { DeleteBlogPostCommand } from "../../contracts/commands/delete-blog-post.command";
import { DeleteBlogPostHandler } from "./delete-blog-post.handler";

describe(DeleteBlogPostHandler.name, () => {
  let blogPosts: Repository<BlogPost>;
  let commandHandler: DeleteBlogPostHandler;

  const newContent = "my-new-content";

  beforeEach(() => {
    blogPosts = createMockRepository<BlogPost>();

    commandHandler = new DeleteBlogPostHandler(
      { authorizeOwnerOrAdmin: vi.fn() } as any,
      blogPosts,
      {
        removePhoto: vi.fn(),
      } as any,
    );
  });

  describe("can update blog post", () => {
    it("should throw if blog post not found", async () => {
      const command = map(DeleteBlogPostCommand, {
        content: newContent,
        id: "my-id",
      });

      await expect(commandHandler.execute(command)).rejects.toHaveProperty(
        "message",
        "Blog post not found",
      );
    });

    it("should save changes to blog post", async () => {
      const initalPost = new BlogPost();
      initalPost.photos = [];

      const { id } = await blogPosts.save(initalPost);

      const command = map(DeleteBlogPostCommand, {
        content: newContent,
        id,
      });

      await commandHandler.execute(command);

      const storedBlogPosts = await blogPosts.find();

      expect(storedBlogPosts.length).toBe(0);
    });
  });
});
