import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pressable, Text } from "react-native";

import { blogsApi } from "src/apis";
import { CacheKeyEnum } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { useTheme } from "src/core/theme";
import { useConfirmDialog } from "src/components/ui";

interface BlogPostMenuProps {
  id: string;
}

export function BlogPostMenu({ id }: BlogPostMenuProps) {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const theme = useTheme();
  const { confirmWithDialog } = useConfirmDialog();

  const deleteMutation = useMutation({
    mutationFn: () => blogsApi.deletelogPost({ deleteBlogPostCommand: { id } }),
    onSuccess: () => {
      snackbar.success("The moment was successfully deleted");
      queryClient.invalidateQueries({
        queryKey: [CacheKeyEnum.BlogPosts],
      });
    },
    onError: () => {
      snackbar.error("Failed to delete the moment");
    },
  });

  function handleDelete(): void {
    confirmWithDialog({
      description:
        "This will permanently delete this moment. It will no longer be visible to anyone.",
      onConfirm: (onSuccess) => {
        deleteMutation.mutate(undefined, { onSuccess });
      },
      title: "Delete this moment?",
    });
  }

  return (
    <Pressable
      accessibilityLabel="more actions"
      accessibilityRole="button"
      disabled={deleteMutation.isPending}
      onPress={handleDelete}
      style={({ pressed }) => ({
        alignItems: "center",
        height: 40,
        justifyContent: "center",
        opacity: pressed ? 0.6 : 1,
        width: 40,
      })}
    >
      <Text style={{ color: theme.palette.text.primary, fontSize: 20 }}>
        {"\u22ef"}
      </Text>
    </Pressable>
  );
}
