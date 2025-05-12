import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { BlogPostComment } from "src/features/blogs/infrastructure/entities/blog-post-comment.entity";
import { beforeEach, describe, expect, it, vi } from "src/test";
import { createMockRepository } from "src/test/mocks/repository.mock";

import { DeleteBlogPostCommentCommand } from "../../contracts/commands/delete-blog-post-comment.command";
import { DeleteBlogPostCommand } from "../../contracts/commands/delete-blog-post.command";
import { DeleteBlogPostCommentHandler } from "./delete-blog-post-comment.handler";

describe(DeleteBlogPostCommentHandler.name, () => {
  let blogPostComments: Repository<BlogPostComment>;
  let commandHandler: DeleteBlogPostCommentHandler;

  const newContent = "my-new-content";

  beforeEach(() => {
    blogPostComments = createMockRepository<BlogPostComment>();

    commandHandler = new DeleteBlogPostCommentHandler(
      { authorizeOwnerOrAdmin: vi.fn() } as any,
      blogPostComments,
    );
  });

  describe("can update blog post", () => {
    it("should throw if blog post not found", async () => {
      const command = map(DeleteBlogPostCommentCommand, {
        content: newContent,
        id: "my-id",
      });

      await expect(commandHandler.execute(command)).rejects.toHaveProperty(
        "message",
        "Blog post comment not found",
      );
    });

    it("should save changes to blog post", async () => {
      const { id } = await blogPostComments.save(new BlogPostComment());

      const command = map(DeleteBlogPostCommand, {
        content: newContent,
        id,
      });

      await commandHandler.execute(command);

      const storedBlogPosts = await blogPostComments.find();

      expect(storedBlogPosts.length).toBe(0);
    });
  });
});
