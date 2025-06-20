import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { BlogPostCommentReaction } from "src/features/blogs/infrastructure/entities/blog-post-comment-reaction.entity";
import { beforeEach, describe, expect, it, vi } from "src/test";
import { createMockRepository } from "src/test/mocks/repository.mock";

import { DeleteBlogPostCommentReactionCommand } from "../../contracts/commands/delete-blog-post-comment-reaction.command";
import { DeleteBlogPostCommentReactionHandler } from "./delete-blog-post-comment-reaction.handler";

describe(DeleteBlogPostCommentReactionHandler.name, () => {
  let blogPostCommentReactions: Repository<BlogPostCommentReaction>;
  let commandHandler: DeleteBlogPostCommentReactionHandler;

  beforeEach(() => {
    blogPostCommentReactions = createMockRepository<BlogPostCommentReaction>();

    commandHandler = new DeleteBlogPostCommentReactionHandler(
      { authorizeOwnerOrAdmin: vi.fn() } as any,
      blogPostCommentReactions,
    );
  });

  describe("can delete blog post comment reaction", () => {
    it("should throw if blog post comment reaction not found", async () => {
      const command = map(DeleteBlogPostCommentReactionCommand, {
        reactionId: "my-id",
      });

      await expect(commandHandler.execute(command)).rejects.toHaveProperty(
        "message",
        "Blog post comment reaction not found",
      );
    });

    it("should remove blog post comment reaction", async () => {
      const { id } = await blogPostCommentReactions.save(
        new BlogPostCommentReaction(),
      );

      const command = map(DeleteBlogPostCommentReactionCommand, {
        reactionId: id,
      });

      await commandHandler.execute(command);

      const storedReactions = await blogPostCommentReactions.find();

      expect(storedReactions.length).toBe(0);
    });
  });
});
