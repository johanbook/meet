import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";

import { BlogPostComment } from "../../infrastructure/entities/blog-post-comment.entity";
import { BlogPostReaction } from "../../infrastructure/entities/blog-post-reaction.entity";
import { BlogPost } from "../../infrastructure/entities/blog-post.entity";
import { BlogPostCommentCreatedEvent } from "../events/blog-post-comment-created.event";
import { BlogPostCreatedEvent } from "../events/blog-post-created.event";
import { BlogPostReactionCreatedEvent } from "../events/blog-post-reaction-created.event";

@Injectable()
export class BlogPostService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPosts: Repository<BlogPost>,
    private readonly eventBus: EventBus,
  ) {}

  async createBlogPost(blogPost: BlogPost): Promise<void> {
    const newPost = await this.blogPosts.save(blogPost);

    const event = map(BlogPostCreatedEvent, {
      content: newPost.content,
      id: newPost.id,
      organizationId: newPost.organizationId,
      profileId: newPost.profileId,
    });

    this.eventBus.publish(event);
  }

  async updateBlogPost(blogPost: BlogPost): Promise<void> {
    await this.blogPosts.save(blogPost);
  }

  async addCommentToBlogPost(
    blogPostComment: BlogPostComment,
    blogPost: BlogPost,
  ): Promise<void> {
    blogPost.comments.push(blogPostComment);

    await this.blogPosts.save(blogPost);

    const event = map(BlogPostCommentCreatedEvent, {
      blogPostId: blogPost.id,
      content: blogPostComment.content,
      id: blogPostComment.id,
      organizationId: blogPost.organizationId,
      profileId: blogPostComment.profileId,
    });

    this.eventBus.publish(event);
  }

  async addReactionToBlogPost(
    blogPostReaction: BlogPostReaction,
    blogPost: BlogPost,
  ): Promise<void> {
    blogPost.reactions.push(blogPostReaction);

    await this.blogPosts.save(blogPost);

    const event = map(BlogPostReactionCreatedEvent, {
      blogPostId: blogPost.id,
      organizationId: blogPost.organizationId,
      profileId: blogPostReaction.profileId,
      reactionId: blogPostReaction.id,
    });

    this.eventBus.publish(event);
  }
}
