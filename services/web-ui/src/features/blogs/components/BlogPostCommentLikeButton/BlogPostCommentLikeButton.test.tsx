import { describe, expect, it, render, screen, vi } from "src/test";
import { ReactQueryTestProvider } from "src/test";

import { BlogPostCommentLikeButton } from "./BlogPostCommentLikeButton";

vi.mock("src/apis", () => ({
  blogsApi: {
    createBlogPostCommentReaction: vi.fn(),
    deleteBlogPostCommentReaction: vi.fn(),
  },
}));

vi.mock("framer-motion", () => ({
  useAnimate: () => [{ current: undefined }, vi.fn()],
}));

describe("BlogPostCommentLikeButton", () => {
  const mockCommentId = "test-comment-id";
  const mockReactionId = "test-reaction-id";

  it("renders unlike button when no reaction exists", () => {
    render(
      <ReactQueryTestProvider>
        <BlogPostCommentLikeButton blogPostCommentId={mockCommentId} />
      </ReactQueryTestProvider>,
    );

    const button = screen.getByRole("button", { name: /like comment/i });
    expect(button).toBeInTheDocument();
  });

  it("renders like button when reaction exists", () => {
    render(
      <ReactQueryTestProvider>
        <BlogPostCommentLikeButton
          blogPostCommentId={mockCommentId}
          reactionId={mockReactionId}
        />
      </ReactQueryTestProvider>,
    );

    const button = screen.getByRole("button", { name: /like comment/i });
    expect(button).toBeInTheDocument();
  });
});
