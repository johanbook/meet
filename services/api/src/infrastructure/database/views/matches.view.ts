import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  materialized: false,
  expression: `
   SELECT s1."profileId",
      s1."shownProfileId",
      profile.name,
    last_message.message as "lastMessage",
    last_message.created as "lastMessageSent",
    avatar."objectId" as "photoObjectId"
     FROM swipe s1
       JOIN swipe s2 ON s1."profileId" = s2."shownProfileId" AND s1."shownProfileId" = s2."profileId"
       LEFT JOIN profile ON s1."shownProfileId" = profile.id
     LEFT JOIN (
       SELECT "objectId", "profileId"
       FROM profile_photo
       LIMIT 1
     ) AS avatar ON s1."shownProfileId" = avatar."profileId"
     LEFT JOIN (
       SELECT "senderId", "receiverId", message, created
       FROM chat_message
       ORDER BY id DESC
       LIMIT 1
     ) AS last_message ON 
      (s1."profileId" = last_message."senderId" AND s1."shownProfileId" = last_message."receiverId") OR
      (s1."profileId" = last_message."receiverId" AND s1."shownProfileId" = last_message."senderId")
    WHERE s1.liked = true AND s2.liked = true;
  `,
})
export class Match {
  @ViewColumn()
  lastMessage?: string;

  @ViewColumn()
  lastMessageSent?: Date;

  @ViewColumn()
  name!: string;

  @ViewColumn()
  photoObjectId?: string;

  @ViewColumn()
  profileId!: number;

  @ViewColumn()
  shownProfileId!: number;
}
