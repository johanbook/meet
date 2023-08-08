import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { BlogPost } from "../../infrastructure/entities/blog-post.entity";

@Injectable()
export class BlogPostService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPosts: Repository<BlogPost>,
  ) {}

  async saveBlogPost(blogPost: BlogPost): Promise<void> {
    await this.blogPosts.save(blogPost);
  }
}
