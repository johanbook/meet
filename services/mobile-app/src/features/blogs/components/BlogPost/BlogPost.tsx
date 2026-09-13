import { useState } from "react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { Role, useAuthorization } from "src/core/authorization";
import { useTheme } from "src/core/theme";
import { timeSince } from "src/utils";
import { ProfileAvatar } from "src/components/shared/ProfileAvatar/ProfileAvatar";
import {
  BlogPostDetails,
  BlogPostCommentDetails,
} from "src/api";

import { BlogPostCommentForm } from "../BlogPostCommentForm/BlogPostCommentForm";
import { BlogPostCommentLikeButton } from "../BlogPostCommentLikeButton/BlogPostCommentLikeButton";
import { BlogPostLikeButton } from "../BlogPostLikeButton/BlogPostLikeButton";
import { BlogPostMenu } from "../BlogPostMenu/BlogPostMenu";

interface BlogPostProps {
  alwaysShowComments?: boolean;
  post: BlogPostDetails;
}

function reactionCaption(reactions: { names: string[] }): string {
  if (reactions.names.length === 0) {
    return "";
  }

  const firstReactions = [...reactions.names];
  const last = firstReactions.pop() ?? "";

  if (firstReactions.length === 0) {
    return `${last} likes this`;
  }

  return `${firstReactions.join(", ")} and ${last} like this`;
}

function CommentRow({
  comment,
}: {
  comment: BlogPostCommentDetails;
}) {
  const router = useRouter();
  const theme = useTheme();
  const caption = reactionCaption(comment.reactions);

  return (
    <View style={{ paddingHorizontal: 8, paddingVertical: 8 }}>
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace(`/profile/${comment.profile.id}`)}
        >
          <ProfileAvatar
            name={comment.profile.name}
            size={28}
            src={comment.profile.imageUrl}
          />
        </Pressable>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={{ color: theme.palette.text.primary, fontSize: 14, fontWeight: "600" }}>
            {comment.profile.name}
          </Text>
          <Text style={{ color: theme.palette.text.secondary, fontSize: 12 }}>
            {timeSince(comment.createdAt)}
          </Text>
        </View>
        <BlogPostCommentLikeButton
          blogPostCommentId={comment.id}
          reactionId={comment.reactions.currentProfileReactionId}
        />
      </View>
      <Text
        style={{
          color: theme.palette.text.primary,
          fontSize: 14,
          marginTop: 4,
        }}
      >
        {comment.content}
      </Text>
      {caption ? (
        <Text style={{ color: theme.palette.text.secondary, fontSize: 12 }}>
          {caption}
        </Text>
      ) : null}
    </View>
  );
}

export function BlogPost({
  alwaysShowComments = false,
  post,
}: BlogPostProps) {
  const router = useRouter();
  const theme = useTheme();
  const authorization = useAuthorization();
  const [showComments, setShowComments] = useState(alwaysShowComments);

  const commentCount = post.comments.length;
  const reactionsCaption = reactionCaption(post.reactions);

  const canManage =
    post.ownedByCurrentUser ||
    authorization.role === Role.Admin;

  return (
    <View
      style={{
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomWidth: 1,
        padding: 16,
      }}
    >
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace(`/profile/${post.profile.id}`)}
        >
          <ProfileAvatar
            name={post.profile.name}
            size={40}
            src={post.profile.imageUrl}
          />
        </Pressable>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={{ color: theme.palette.text.primary, fontSize: 15, fontWeight: "600" }}>
            {post.profile.name}
          </Text>
          <Text style={{ color: theme.palette.text.secondary, fontSize: 12 }}>
            published {timeSince(post.createdAt)}
          </Text>
        </View>
        {canManage ? <BlogPostMenu id={post.id} /> : null}
      </View>
      <Text style={{ color: theme.palette.text.primary, fontSize: 16, marginTop: 8 }}>
        {post.content}
      </Text>
      {post.photos.map((photo) => (
        <View
          key={photo.id}
          style={{
            backgroundColor: theme.darkmode ? "#303030" : "#f5f5f5",
            marginTop: 8,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Image
            accessibilityLabel={photo.description || "Blog post image"}
            source={{ uri: photo.url }}
            style={{ aspectRatio: 1, width: "100%" }}
          />
        </View>
      ))}
      <View
        style={{ alignItems: "center", flexDirection: "row", marginTop: 8 }}
      >
        <BlogPostLikeButton
          blogPostId={post.id}
          reactionId={post.reactions.currentProfileReactionId}
        />
        <Pressable
          accessibilityLabel="comment"
          accessibilityRole="button"
          onPress={() => setShowComments(true)}
          style={{ alignItems: "center", height: 40, justifyContent: "center", width: 40 }}
        >
          <Text
            style={{ color: theme.palette.text.primary, fontSize: 20 }}
          >
            {"\u270e"}
          </Text>
        </Pressable>
      </View>
      {reactionsCaption ? (
        <Text style={{ color: theme.palette.text.secondary, fontSize: 13 }}>
          {reactionsCaption}
        </Text>
      ) : null}
      {commentCount > 0 && !alwaysShowComments ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => setShowComments(!showComments)}
          style={{ paddingVertical: 6 }}
        >
          <Text style={{ color: theme.palette.primary, fontSize: 13 }}>
            {showComments
              ? `Hide ${commentCount} comments`
              : `Show ${commentCount} comments`}
          </Text>
        </Pressable>
      ) : null}
      {showComments ? (
        <View>
          {post.comments.map((comment) => (
            <CommentRow comment={comment} key={comment.id} />
          ))}
          <BlogPostCommentForm blogPostId={post.id} />
        </View>
      ) : null}
    </View>
  );
}