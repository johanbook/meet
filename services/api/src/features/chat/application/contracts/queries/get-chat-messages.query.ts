import { IsUUID } from "class-validator";

import { BaseQuery } from "src/core/query";

export class GetChatMessagesQuery extends BaseQuery {
  @IsUUID()
  public readonly conversationId!: string;
}
