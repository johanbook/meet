import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";

import { BlogPost } from "../../infrastructure/entities/blog-post.entity";
import { BlogPostCreatedEvent } from "../events/blog-post-created.event";

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
      id: newPost.id,
      organizationId: newPost.organizationId,
      profileId: newPost.profileId,
    });

    this.eventBus.publish(event);
  }

  async updateBlogPost(blogPost: BlogPost): Promise<void> {
    await this.blogPosts.save(blogPost);
  }
}
