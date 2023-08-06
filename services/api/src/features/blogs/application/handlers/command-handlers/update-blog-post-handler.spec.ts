import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { createMockRepository } from "src/test/mocks/repository.mock";

import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { UpdateBlogPostCommand } from "../../contracts/commands/update-blog-post.command";
import { UpdateBlogPostHandler } from "./update-blog-post-handler";

describe(UpdateBlogPostHandler.name, () => {
  let blogPosts: Repository<BlogPost>;
  let commandHandler: UpdateBlogPostHandler;

  beforeEach(() => {
    blogPosts = createMockRepository<BlogPost>();

    commandHandler = new UpdateBlogPostHandler(blogPosts);
  });

  describe("can update blog post", () => {
    it("should throw if settings not found", async () => {
      const command = map(UpdateBlogPostCommand, {
        content: "my-new-content",
        id: "my-id",
      });

      await expect(commandHandler.execute(command)).rejects.toHaveProperty(
        "message",
        "Blog post not found",
      );
    });

    it("should save changes to profile", async () => {
      const findOneFn = blogPosts.findOne as unknown as jest.Mock;
      findOneFn.mockImplementation(() => ({ content: "" }));

      const command = map(UpdateBlogPostCommand, {
        content: "my-new-content",
        id: "my-id",
      });

      await commandHandler.execute(command);

      expect(blogPosts.save).toHaveBeenCalledWith({
        content: "my-new-content",
      });
    });
  });
});
