import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { Pressable, ScrollView, Text, View } from "react-native";

import { blogsApi } from "src/apis";
import { Screen } from "src/components/nav/Screen";
import { Button, TextField, Typography } from "src/components/ui";
import { useForm, required } from "src/core/forms";
import { CacheKeyEnum } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { useTheme } from "src/core/theme";
import { PhotoFile, pickImages } from "src/utils/photo";

interface CreateBlogPostFormValues {
  content: string;
  photos: PhotoFile[];
}

export default function CreateBlogPostPage() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const theme = useTheme();

  const form = useForm<CreateBlogPostFormValues>(
    { content: "", photos: [] },
    {
      content: required<CreateBlogPostFormValues>(),
      photos: () => false,
    },
  );

  const mutation = useMutation({
    mutationFn: (values: CreateBlogPostFormValues) =>
      blogsApi.createBlogPost({
        content: values.content,
        // RN FormData accepts { uri, name, type } parts; the generated client
        // types them as DOM Blob.
        photos: values.photos as unknown as Blob[],
        descriptions: [],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CacheKeyEnum.BlogPosts],
      });
      form.reset();
      snackbar.success("Your moment was shared!");
      router.replace("/");
    },
    onError: () => {
      snackbar.error("Something went wrong when trying to share your moment");
    },
  });

  async function handleAddPhotos(): Promise<void> {
    const picked = await pickImages({ multiple: true });

    if (picked.length === 0) {
      return;
    }

    form.setValue({ photos: [...form.state.photos.value, ...picked] });
  }

  function removePhoto(photo: PhotoFile): void {
    form.setValue({
      photos: form.state.photos.value.filter(
        (candidate) => candidate !== photo,
      ),
    });
  }

  function handleSubmit(): void {
    const { data, isValid } = form.validate();

    if (!isValid) {
      return;
    }

    mutation.mutate(data);
  }

  return (
    <Screen navBackTo="/" title="Share a moment">
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <Typography color="textSecondary" variant="h6">
            Description
          </Typography>
          <TextField
            disabled={mutation.isPending}
            minRows={3}
            multiline
            onValueChange={(value) => form.setValue({ content: value })}
            placeholder="Perhaps say something about your day"
            value={form.state.content.value}
          />
          <Typography color="textSecondary" variant="h6">
            Upload Photos
          </Typography>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {form.state.photos.value.map((photo) => (
              <View key={photo.uri} style={{ margin: 4, position: "relative" }}>
                <Image
                  accessibilityLabel="Uploaded photo preview"
                  source={{ uri: photo.uri }}
                  style={{ borderRadius: 4, height: 100, width: 100 }}
                />
                <Pressable
                  accessibilityLabel="Remove photo"
                  accessibilityRole="button"
                  onPress={() => removePhoto(photo)}
                  style={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: 12,
                    height: 24,
                    position: "absolute",
                    right: -8,
                    top: -8,
                    width: 24,
                  }}
                >
                  <Text
                    style={{
                      color: theme.palette.text.primary,
                      fontSize: 14,
                    }}
                  >
                    {"\u2715"}
                  </Text>
                </Pressable>
              </View>
            ))}
            <Pressable
              accessibilityLabel="Add photos"
              accessibilityRole="button"
              onPress={() => handleAddPhotos()}
              style={({ pressed }) => ({
                alignItems: "center",
                borderColor: theme.palette.divider,
                borderRadius: 4,
                borderWidth: 1,
                height: 100,
                justifyContent: "center",
                margin: 4,
                opacity: pressed ? 0.6 : 1,
                width: 100,
              })}
            >
              <Text style={{ color: theme.palette.primary, fontSize: 28 }}>
                {"+"}
              </Text>
            </Pressable>
          </View>
          <Button
            color="primary"
            disabled={
              mutation.isPending || form.state.content.value.length === 0
            }
            loading={mutation.isPending}
            onPress={handleSubmit}
          >
            Share moment
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
}
