import { useMutation } from "@tanstack/react-query";

import { blogsApi } from "src/apis";
import { IconButton } from "src/components/ui";
import { CacheKeyEnum, useQueryClient } from "src/core/query";

interface BlogPostLikeButtonProps {
  blogPostId: string;
  reactionId?: string;
}

export function BlogPostLikeButton({
  blogPostId,
  reactionId,
}: BlogPostLikeButtonProps) {
  const queryClient = useQueryClient();

  function invalidate(): void {
    queryClient.invalidateQueries({
      queryKey: [CacheKeyEnum.BlogPosts],
    });
  }

  const createMutation = useMutation({
    mutationFn: () =>
      blogsApi.createBlogPostReaction({
        createBlogPostReactionCommand: {
          blogPostId,
          reaction: ":heart:",
        },
      }),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: () =>
      blogsApi.deleteBlogPostReaction({ reactionId: reactionId ?? "" }),
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
      accessibilityLabel="like"
      icon={reactionId ? "heart" : "heartBorder"}
      iconColor={reactionId ? "primary" : "default"}
      onPress={handlePress}
    />
  );
}