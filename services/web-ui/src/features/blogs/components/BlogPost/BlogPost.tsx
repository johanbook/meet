import { ReactElement, useState } from "react";
import { Link } from "react-router";

import { ModeCommentOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";

import { BlogPostDetails } from "src/api";
import { Role, useAuthorization } from "src/core/authorization";
import { useTranslation } from "src/core/i18n";
import { timeSince } from "src/utils/time";

import { BlogPostCommentForm } from "../BlogPostCommentForm/BlogPostComment.form";
import { BlogPostLikeButton } from "../BlogPostLikeButton/BlogPostLikeButton";
import { BlogPostMenu } from "../BlogPostMenu";
import { BlogPostPhotos } from "../BlogPostPhotos/BlogPostPhotos";

interface BlogPostProps {
  alwaysShowComments?: boolean;
  post: BlogPostDetails;
}

export function BlogPost(
  { alwaysShowComments = false, post }: BlogPostProps
): ReactElement {
  const [showComments, setShowComments] = useState(alwaysShowComments);
  const { t } = useTranslation("blog");

  const authorization = useAuthorization();

  const firstReactions = [...post.reactions.names];
  const lastReaction = firstReactions.pop();

  return (
    <Box key={post.id} sx={{ py: 2, borderTop: 1, borderColor: "divider" }}>
      <Box sx={{ alignItems: "center", display: "flex", pl: 2 }}>
        <Link to={`/profile/${post.profile.id}`}>
          <Avatar imgProps={{ loading: "lazy" }} src={post.profile.imageUrl} />
        </Link>

        <Box sx={{ flexGrow: 1, paddingLeft: 1 }}>
          <Typography>
            <b>
              <Link
                to={`/profile/${post.profile.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {post.profile.name}
              </Link>
            </b>{" "}
            {t("published")}
          </Typography>
          <Typography variant="subtitle2">
            {timeSince(post.createdAt)}
          </Typography>
        </Box>

        {(post.ownedByCurrentUser || authorization.role === Role.Admin) && (
          <BlogPostMenu id={post.id} />
        )}
      </Box>

      <Box sx={{ px: 2, pt: 2 }}>
        <Typography sx={{ overflowWrap: "anywhere", whiteSpace: "pre-wrap" }}>
          {post.content}
        </Typography>
      </Box>

      <BlogPostPhotos photos={post.photos} />

      <Box sx={{ px: 1, pt: 1 }}>
        <BlogPostLikeButton
          blogPostId={post.id}
          reactionId={post.reactions.currentProfileReactionId}
        />

        <IconButton aria-label="comment" onClick={() => setShowComments(true)}>
          <ModeCommentOutlined />
        </IconButton>
      </Box>

      {post.reactions.count > 0 && (
        <Box sx={{ px: 2, pt: 1 }}>
          <Typography variant="subtitle2">
            {t("reactions.count", {
              count: post.reactions.count,
              first: firstReactions.join(", "),
              last: lastReaction,
            })}
          </Typography>
        </Box>
      )}

      {post.comments.length > 0 && !alwaysShowComments && (
        <Box sx={{ px: 1 }}>
          <Button onClick={() => setShowComments(!showComments)}>
            {t(
              showComments ? "actions.hide-comments" : "actions.view-comments",
              { count: post.comments.length }
            )}
          </Button>
        </Box>
      )}

      <Collapse in={showComments}>
        <List>
          {post.comments.map((comment) => (
            <ListItem key={comment.id} style={{ alignItems: "start" }}>
              <Avatar src={comment.profile.imageUrl} />

              <Box sx={{ pl: 1 }}>
                <Box sx={{ alignItems: "center", display: "flex" }}>
                  <Typography>
                    <b>{comment.profile.name}</b>
                  </Typography>
                  <Typography sx={{ paddingLeft: 1 / 2 }} variant="subtitle2">
                    {timeSince(comment.createdAt)}
                  </Typography>
                </Box>

                <Typography
                  sx={{ overflowWrap: "anywhere", whiteSpace: "pre-wrap" }}
                >
                  {comment.content}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>

        <BlogPostCommentForm blogPostId={post.id} />
      </Collapse>
    </Box>
  );
}
