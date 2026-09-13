import { useMutation } from "@tanstack/react-query";

import { blogsApi } from "src/apis";
import { IconButton } from "src/components/ui";
import { CacheKeyEnum, useQueryClient } from "src/core/query";

interface BlogPostCommentLikeButtonProps {
  blogPostCommentId: string;
  reactionId?: string;
}

export function BlogPostCommentLikeButton({
  blogPostCommentId,
  reactionId,
}: BlogPostCommentLikeButtonProps) {
  const queryClient = useQueryClient();

  function invalidate(): void {
    queryClient.invalidateQueries({
      queryKey: [CacheKeyEnum.BlogPosts],
    });
  }

  const createMutation = useMutation({
    mutationFn: () =>
      blogsApi.createBlogPostCommentReaction({
        createBlogPostCommentReactionCommand: {
          blogPostCommentId,
          reaction: ":heart:",
        },
      }),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: () =>
      blogsApi.deleteBlogPostCommentReaction({
        reactionId: reactionId ?? "",
      }),
    onSuccess: invalidate,
  });

  function handlePress(): void {
    if (reactionId) {
      deleteMutation.mutate();
    } else {
      createMutation.mutate();
    }
  }

  return (
    <IconButton
      accessibilityLabel="like comment"
      icon={reactionId ? "heart" : "heartBorder"}
      iconColor={reactionId ? "primary" : "default"}
      onPress={handlePress}
      size="small"
    />
  );
}