import { ReactElement } from "react";

import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAnimate } from "framer-motion";

import {
  CreateBlogPostCommentReactionCommand,
  DeleteBlogPostCommentReactionRequest,
} from "src/api";
import { blogsApi } from "src/apis";
import {
  CacheKeysConstants,
  useMutation,
  useQueryClient,
} from "src/core/query";

interface BlogPostCommentLikeButtonProps {
  blogPostCommentId: string;
  reactionId?: string;
}

export function BlogPostCommentLikeButton({
  blogPostCommentId,
  reactionId,
}: BlogPostCommentLikeButtonProps): ReactElement {
  const [scope, animate] = useAnimate();
  const createMutation = useMutation({
    mutationFn: (
      createBlogPostCommentReactionCommand: CreateBlogPostCommentReactionCommand,
    ) =>
      blogsApi.createBlogPostCommentReaction({
        createBlogPostCommentReactionCommand,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (
      deleteBlogPostCommentReactionCommand: DeleteBlogPostCommentReactionRequest,
    ) =>
      blogsApi.deleteBlogPostCommentReaction(
        deleteBlogPostCommentReactionCommand,
      ),
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
      { blogPostCommentId, reaction: ":heart:" },
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
      aria-label="like comment"
      color={reactionId ? "primary" : "default"}
      disabled={isLoading}
      onClick={handleToggleReaction}
      ref={scope}
      size="small"
    >
      {reactionId ? (
        <Favorite fontSize="small" />
      ) : (
        <FavoriteBorder fontSize="small" />
      )}
    </IconButton>
  );
}
