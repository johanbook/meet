import {
  ReactQueryTestProvider,
  describe,
  expect,
  it,
  render,
  screen,
} from "src/test";

import { BlogPostCommentLikeButton } from "./BlogPostCommentLikeButton";

describe("<BlogPostCommentLikeButton />", () => {
  it("renders", () => {
    render(
      <ReactQueryTestProvider>
        <BlogPostCommentLikeButton blogPostCommentId="test-id" />
      </ReactQueryTestProvider>,
    );
    const button = screen.getByRole("button", { name: /like comment/i });
    expect(button).toBeInTheDocument();
  });
});
