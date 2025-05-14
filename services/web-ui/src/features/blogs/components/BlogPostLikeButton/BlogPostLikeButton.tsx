import { ReactElement } from "react";

import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAnimate } from "framer-motion";

import {
  CreateBlogPostReactionCommand,
  DeleteBlogPostReactionRequest,
} from "src/api";
import { blogsApi } from "src/apis";
import {
  CacheKeysConstants,
  useMutation,
  useQueryClient,
} from "src/core/query";

interface BlogPostLikeButtonProps {
  blogPostId: string;
  reactionId?: string;
}

export function BlogPostLikeButton({
  blogPostId,
  reactionId,
}: BlogPostLikeButtonProps): ReactElement {
  const [scope, animate] = useAnimate();
  const createMutation = useMutation({
    mutationFn: (
      createBlogPostReactionCommand: CreateBlogPostReactionCommand,
    ) => blogsApi.createBlogPostReaction({ createBlogPostReactionCommand }),
  });

  const deleteMutation = useMutation({
    mutationFn: (
      deleteBlogPostReactionCommand: DeleteBlogPostReactionRequest,
    ) => blogsApi.deleteBlogPostReaction(deleteBlogPostReactionCommand),
  });

  const queryClient = useQueryClient();

  async function handleToggleReaction(): Promise<void> {
    if (reactionId) {
      await deleteMutation.mutateAsync(
        { reactionId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [CacheKeysConstants.BlogPosts],
            });
          },
        },
      );
      return;
    }

    animate(scope.current, { scale: [1, 1.4, 1] }, { duration: 0.4 });

    await createMutation.mutateAsync(
      { blogPostId, reaction: ":heart:" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [CacheKeysConstants.BlogPosts],
          });
        },
      },
    );
  }

  const isLoading = createMutation.isPending || deleteMutation.isPaused;

  return (
    <IconButton
      aria-label="like"
      color={reactionId ? "primary" : "default"}
      disabled={isLoading}
      onClick={handleToggleReaction}
      ref={scope}
    >
      {reactionId ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
}
