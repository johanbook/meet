import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { beforeEach, describe, expect, it } from "src/test";
import { createMockRepository } from "src/test/mocks/repository.mock";

import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { UpdateBlogPostCommand } from "../../contracts/commands/update-blog-post.command";
import { UpdateBlogPostHandler } from "./update-blog-post-handler";

describe(UpdateBlogPostHandler.name, () => {
  let blogPosts: Repository<BlogPost>;
  let commandHandler: UpdateBlogPostHandler;

  const newContent = "my-new-content";

  beforeEach(() => {
    blogPosts = createMockRepository<BlogPost>();

    commandHandler = new UpdateBlogPostHandler(blogPosts);
  });

  describe("can update blog post", () => {
    it("should throw if blog post not found", async () => {
      const command = map(UpdateBlogPostCommand, {
        content: newContent,
        id: "my-id",
      });

      await expect(commandHandler.execute(command)).rejects.toHaveProperty(
        "message",
        "Blog post not found",
      );
    });

    it("should save changes to blog post", async () => {
      const initialPost = new BlogPost();
      const { id } = await blogPosts.save(initialPost);

      const command = map(UpdateBlogPostCommand, {
        content: newContent,
        id,
      });

      await commandHandler.execute(command);

      const storedBlogPosts = await blogPosts.find();

      expect(storedBlogPosts.length).toBe(1);
      expect(storedBlogPosts[0]).toHaveProperty("content", newContent);
    });
  });
});
