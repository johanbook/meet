import { IsArray } from "class-validator";

export class GetUserInfoListByIdQuery {
  @IsArray()
  public readonly userIds!: string[];
}
