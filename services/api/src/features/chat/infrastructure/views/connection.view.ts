import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  expression: `
    SELECT X.ID,
      X.CREATED,
      X."organizationId",
      X."profileId" AS "currentProfileId",
      Y."profileId" AS "profileId",
      PROFILE."name",
      PROFILE_PHOTO."objectId" as "profilePhotoObjectId",
      LAST_MESSAGE.MESSAGE AS "lastMessage",
      LAST_MESSAGE.CREATED AS "lastMessageSent"
    FROM PUBLIC.ORGANIZATION_MEMBERSHIP AS X
    INNER JOIN PUBLIC.ORGANIZATION_MEMBERSHIP Y ON (X."organizationId" = Y."organizationId")
    AND (X."profileId" != Y."profileId")
    LEFT JOIN PROFILE AS PROFILE ON Y."profileId" = PROFILE.ID
    LEFT JOIN PROFILE_PHOTO AS PROFILE_PHOTO ON PROFILE."profilePhotoId" = PROFILE_PHOTO.ID
    LEFT JOIN
      (SELECT "senderId",
          "receiverId",
          MESSAGE,
          CREATED
        FROM CHAT_MESSAGE CM
        WHERE CM.CREATED =
            (SELECT MAX(CREATED)
              FROM CHAT_MESSAGE
              WHERE (CM."senderId" = "senderId"
                            AND CM."receiverId" = "receiverId")
                OR (CM."senderId" = "receiverId"
                        AND CM."receiverId" = "senderId") ) ) AS LAST_MESSAGE ON (X."profileId" = LAST_MESSAGE."senderId"
                        AND Y."profileId" = LAST_MESSAGE."receiverId")
    OR (X."profileId" = LAST_MESSAGE."receiverId"
            AND Y."profileId" = LAST_MESSAGE."senderId") ;
  `,
  materialized: false,
})
export class Connection {
  @ViewColumn()
  currentProfileId!: number;

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
  profilePhotoObjectId?: string;
}
