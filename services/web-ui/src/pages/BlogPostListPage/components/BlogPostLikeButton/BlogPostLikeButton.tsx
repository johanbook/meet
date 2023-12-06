import { ReactElement } from "react";

import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";

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
  const createMutation = useMutation({
    mutationFn: (
      createBlogPostReactionCommand: CreateBlogPostReactionCommand
    ) => blogsApi.createBlogPostReaction({ createBlogPostReactionCommand }),
  });

  const deleteMutation = useMutation({
    mutationFn: (
      deleteBlogPostReactionCommand: DeleteBlogPostReactionRequest
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
        }
      );
      return;
    }

    await createMutation.mutateAsync(
      { blogPostId, reaction: ":like" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [CacheKeysConstants.BlogPosts],
          });
        },
      }
    );
  }

  const isLoading = createMutation.isPending || deleteMutation.isPaused;

  return (
    <IconButton
      aria-label="like"
      color={reactionId ? "primary" : "default"}
      disabled={isLoading}
      onClick={handleToggleReaction}
    >
      {reactionId ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
}
