import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { SendBlogPostSummaryCommand } from "../../contracts/commands/send-blog-post-summary.command";

@CommandHandler(SendBlogPostSummaryCommand)
export class SendBlogPostSummaryCommandHandler
  implements ICommandHandler<SendBlogPostSummaryCommand, void>
{
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPosts: Repository<BlogPost>,
  ) {}

  async execute() {
    const queryBuilder = this.blogPosts.createQueryBuilder();

    queryBuilder.groupBy("organizationId").addGroupBy("profileId").printSql();
  }
}
