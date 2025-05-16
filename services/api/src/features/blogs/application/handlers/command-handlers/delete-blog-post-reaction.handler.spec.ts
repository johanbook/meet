import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { BlogPostReaction } from "src/features/blogs/infrastructure/entities/blog-post-reaction.entity";
import { beforeEach, describe, expect, it, vi } from "src/test";
import { createMockRepository } from "src/test/mocks/repository.mock";

import { DeleteBlogPostReactionCommand } from "../../contracts/commands/delete-blog-post-reaction.command";
import { DeleteBlogPostReactionHandler } from "./delete-blog-post-reaction.handler";

describe(DeleteBlogPostReactionHandler.name, () => {
  let blogPostReactions: Repository<BlogPostReaction>;
  let commandHandler: DeleteBlogPostReactionHandler;

  beforeEach(() => {
    blogPostReactions = createMockRepository<BlogPostReaction>();

    commandHandler = new DeleteBlogPostReactionHandler(
      { authorizeOwnerOrAdmin: vi.fn() } as any,
      blogPostReactions,
    );
  });

  describe("can update blog post", () => {
    it("should throw if blog post not found", async () => {
      const command = map(DeleteBlogPostReactionCommand, {
        reactionId: "my-id",
      });

      await expect(commandHandler.execute(command)).rejects.toHaveProperty(
        "message",
        "Blog post reaction not found",
      );
    });

    it("should save changes to blog post", async () => {
      const { id } = await blogPostReactions.save(new BlogPostReaction());

      const command = map(DeleteBlogPostReactionCommand, {
        reactionId: id,
      });

      await commandHandler.execute(command);

      const storedBlogPosts = await blogPostReactions.find();

      expect(storedBlogPosts.length).toBe(0);
    });
  });
});
