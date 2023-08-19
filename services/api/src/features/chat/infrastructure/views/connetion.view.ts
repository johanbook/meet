import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  expression: `
    SELECT 
      "organizationId", 
      "profileId", 
	    "profilePhotoId",
      name, 
      last_message.message AS "lastMessage",
      last_message.created AS "lastMessageSent"
    FROM public.organization_membership
    LEFT JOIN profile as profile on "profileId"=profile.id
    LEFT JOIN (
         SELECT "senderId", "receiverId", message, created
         FROM chat_message cm
         WHERE cm.created = (
           SELECT MAX(created)
           FROM chat_message
           WHERE (cm."senderId" = "senderId" AND cm."receiverId" = "receiverId")
              OR (cm."senderId" = "receiverId" AND cm."receiverId" = "senderId")
           )
       ) AS last_message ON "profileId" = last_message."senderId" OR "profileId" = last_message."receiverId" 
      ;
  `,
  materialized: false,
})
export class Connection {
  @ViewColumn()
  lastMessage?: string;

  @ViewColumn()
  lastMessageSent?: Date;

  @ViewColumn()
  name!: string;

  @ViewColumn()
  organizationId!: number;

  @ViewColumn()
  profileId!: number;

  @ViewColumn()
  profilePhotoId?: string;
}
