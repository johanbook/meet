import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { INotification, NotificationService } from "src/core/notifications";

import { BlogPost } from "../../../infrastructure/entities/blog-post.entity";
import { SendBlogPostSummaryCommand } from "../../contracts/commands/send-blog-post-summary.command";

interface ISummaryLine {
  organizationId: number;
  profileId: number;
  count: string;
}

@CommandHandler(SendBlogPostSummaryCommand)
export class SendBlogPostSummaryCommandHandler
  implements ICommandHandler<SendBlogPostSummaryCommand, void>
{
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPosts: Repository<BlogPost>,
    private readonly notifcationService: NotificationService,
  ) {}

  async execute() {
    const summaries = await this.getSummaries();

    for (const summary of summaries) {
      await this.sendSummary(summary);
    }
  }

  private async sendSummary(summary: ISummaryLine): Promise<void> {
    const notification: INotification = {
      description: "hi",
      message: "Your summary",
      resourcePath: "/",
      type: "h",
    };

    await this.notifcationService.notifyProfiles(
      [summary.profileId],
      notification,
    );
  }

  private async getSummaries(): Promise<ISummaryLine[]> {
    const queryBuilder = this.blogPosts.createQueryBuilder();

    return await queryBuilder
      .select([
        'BlogPost.organizationId AS "organizationId"',
        'BlogPost.profileId AS "profileId"',
        "COUNT(*) AS count",
      ])
      .groupBy("BlogPost.organizationId")
      .addGroupBy("BlogPost.profileId")
      .getRawMany();
  }
}
