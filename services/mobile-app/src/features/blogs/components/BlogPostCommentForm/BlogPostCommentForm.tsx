import { useMutation } from "@tanstack/react-query";
import { Pressable, Text, View } from "react-native";

import { blogsApi } from "src/apis";
import { CreateBlogPostCommentCommand } from "src/api";
import { useForm, required } from "src/core/forms";
import { CacheKeyEnum, useQueryClient } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { useTheme } from "src/core/theme";
import { TextField } from "src/components/ui";

interface BlogPostCommentFormProps {
  blogPostId: string;
}

export function BlogPostCommentForm({ blogPostId }: BlogPostCommentFormProps) {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const theme = useTheme();

  const form = useForm<CreateBlogPostCommentCommand>(
    { blogPostId, content: "" },
    {
      blogPostId: required<CreateBlogPostCommentCommand>(),
      content: required<CreateBlogPostCommentCommand>(),
    },
  );

  const mutation = useMutation({
    mutationFn: (command: CreateBlogPostCommentCommand) =>
      blogsApi.createBlogPostComment({ createBlogPostCommentCommand: command }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CacheKeyEnum.BlogPosts],
      });
      form.reset();
    },
    onError: () => {
      snackbar.error("Something went wrong when trying to post this comment");
    },
  });

  function handleSubmit(): void {
    const { data, isValid } = form.validate();

    if (!isValid) {
      return;
    }

    mutation.mutate(data);
  }

  return (
    <View style={{ alignItems: "center", flexDirection: "row" }}>
      <View style={{ flex: 1 }}>
        <TextField
          multiline
          minRows={2}
          onValueChange={(value) => form.setValue({ content: value })}
          placeholder="Leave a comment"
          value={form.state.content.value}
        />
      </View>
      <Pressable
        accessibilityLabel="send comment"
        accessibilityRole="button"
        disabled={!form.state.content.value || mutation.isPending}
        onPress={handleSubmit}
        style={({ pressed }) => ({
          alignItems: "center",
          borderRadius: 20,
          height: 40,
          justifyContent: "center",
          opacity: pressed ? 0.6 : 1,
          width: 40,
        })}
      >
        <Text
          style={{
            color: form.state.content.value
              ? theme.palette.primary
              : theme.palette.text.secondary,
            fontSize: 20,
          }}
        >
          {"\u27a4"}
        </Text>
      </Pressable>
    </View>
  );
}
